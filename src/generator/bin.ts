import {Project} from "ts-morph";
import openapiToTs from "openapi-typescript";
import {join as pathJoin} from "path";
import {writeFileSync} from "fs";
import {DefinitionsApiCallFormatter, DefinitionsApiTypeFormatter, MethodMap, renderMethodMap} from "../utils/method-map";
import axios from "axios";
type DefinitionsAliasMap = {[key: string]: string};

function exit() {
    process.exit(1);
}

function renderDefinitionsAliasMap(map: DefinitionsAliasMap) {
    let text = "";
    const definitions = Object.keys(map);
    for (let definition of definitions) {
        text += `\t"${definition}": ${map[definition]},\n`;
    }
    return text;
}

async function main() {
    const KUBE_VERSION = process.argv.pop();
    console.log("Running generator for Kubernetes version " + KUBE_VERSION);

    const response = await axios.get(
        `https://raw.githubusercontent.com/kubernetes/kubernetes/v${KUBE_VERSION}/api/openapi-spec/swagger.json`
    );
    const output = openapiToTs(response.data);

    writeFileSync(pathJoin(__dirname, "../__generated__/_schema.ts"), output);

    const project = new Project();
    const source = project.addSourceFileAtPath(pathJoin(__dirname, "../__generated__/_schema.ts"));

    const definitionsInterface = source.getInterface("definitions");
    const pathsInterface = source.getInterface("paths");

    if (!definitionsInterface || !pathsInterface) {
        return exit();
    }

    const paths = pathsInterface.getProperties().map((x) => JSON.parse(x.getName()));

    let methodsMap: MethodMap = {};
    let definitionsAliasMap: DefinitionsAliasMap = {};
    const coreApis = new Set<string>();

    for (let definitionProperty of definitionsInterface.getProperties()) {
        const name = JSON.parse(definitionProperty.getName());

        if (!name.includes("io.k8s.api.")) {
            continue;
        }

        definitionsAliasMap[name.replace("io.k8s.api.", "")] = `defs["${name}"]`;

        const methodComponents = name.replace("io.k8s.api.", "").split(".");
        const methodName = methodComponents[methodComponents.length - 1];

        const coreApiName = methodComponents[0];
        if (paths.indexOf(`/apis/${coreApiName}/`) >= 0) {
            coreApis.add(coreApiName);
        }

        let parts = methodsMap as MethodMap;
        for (let component of methodComponents) {
            if (!parts[component]) {
                if (component == methodName) {
                    parts[component] = name;
                } else {
                    parts[component] = {};
                }
            }

            if (typeof parts[component] == "object") {
                parts = parts[component] as MethodMap;
            }
        }
    }

    writeFileSync(
        pathJoin(__dirname, "../__generated__/definitions.ts"),
        `
import type {definitions as defs} from "./_schema";
import {apiCallMethod, ApiCallMethod} from "../internal/api";

export const coreApis = ${JSON.stringify(Array.from(coreApis))};

export type DefinitionsAliasMap = {
${renderDefinitionsAliasMap(definitionsAliasMap)}
};

export type DefinitionsMap = {
${renderMethodMap("api", DefinitionsApiTypeFormatter, methodsMap, undefined, 1)}
};

export const definitions: DefinitionsMap = {
${renderMethodMap("api", DefinitionsApiCallFormatter, methodsMap, undefined, 1)}
};
`
    );
}

main().catch(console.error);
