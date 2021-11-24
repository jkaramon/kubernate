"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResourcesBrowser = exports.crdApiCallMethod = exports.apiCallMethod = void 0;
const log_1 = require("../log");
const cache_1 = __importDefault(require("../output/cache"));
const glob_1 = require("glob");
const minimatch_1 = __importDefault(require("minimatch"));
const yaml_1 = require("yaml");
const fs = __importStar(require("fs"));
const config_1 = __importDefault(require("../cli/config"));
const definitions_1 = require("../__generated__/definitions");
const apiCallMethod = (apiName) => {
    const logger = (0, log_1.makeLogger)(apiName.replace("io.k8s.api.", ""));
    return function init(input, options) {
        var _a, _b, _c;
        const metadata = (_a = input.metadata) !== null && _a !== void 0 ? _a : {};
        const namespace = metadata.namespace;
        const name = metadata.name;
        logger.debug(namespace, name);
        logger.silly(input);
        const components = apiName.replace("io.k8s.api.", "").split(".");
        const kind = components[components.length - 1];
        const version = components[components.length - 2];
        let api = components.slice(0, components.length - 2).join(".");
        if (definitions_1.coreApis.indexOf(api) == -1 && api !== "core") {
            api = `${api}.k8s.io`;
        }
        const resource = { apiVersion: (api == "core" ? version : `${api}/${version}`).toLowerCase(), kind, ...input };
        if (!(options === null || options === void 0 ? void 0 : options.skipBundle)) {
            if ((options === null || options === void 0 ? void 0 : options.skipBundle) == false) {
                ((_b = options === null || options === void 0 ? void 0 : options.bundle) !== null && _b !== void 0 ? _b : cache_1.default).addResource(resource);
            }
            else if (!apiName.toLowerCase().includes("template")) {
                ((_c = options === null || options === void 0 ? void 0 : options.bundle) !== null && _c !== void 0 ? _c : cache_1.default).addResource(resource);
            }
        }
        return resource;
    }.bind({});
};
exports.apiCallMethod = apiCallMethod;
const crdApiCallMethod = (alias, apiName) => {
    const logger = (0, log_1.makeLogger)(alias);
    return function init(input, options) {
        var _a, _b;
        const metadata = (_a = input.metadata) !== null && _a !== void 0 ? _a : {};
        const namespace = metadata.namespace;
        const name = metadata.name;
        logger.debug(namespace, name);
        logger.silly(input);
        const [apiVersion, kind] = apiName.split("#");
        const resource = { apiVersion, kind, ...input };
        if (!(options === null || options === void 0 ? void 0 : options.skipBundle)) {
            ((_b = options === null || options === void 0 ? void 0 : options.bundle) !== null && _b !== void 0 ? _b : cache_1.default).addResource(resource);
        }
        return resource;
    }.bind({});
};
exports.crdApiCallMethod = crdApiCallMethod;
const makeResourcesBrowser = (rootPath) => {
    let resourceCache = {};
    let resources = undefined;
    return ((resourceType, filter = "**") => {
        var _a, _b, _c, _d;
        if (!resources) {
            resources = [];
            const resourcePaths = glob_1.glob.sync(`${rootPath}/${(_b = (_a = config_1.default.resources) === null || _a === void 0 ? void 0 : _a.include) !== null && _b !== void 0 ? _b : "**/*.yaml"}`, {
                ignore: ((_d = (_c = config_1.default.resources) === null || _c === void 0 ? void 0 : _c.exclude) !== null && _d !== void 0 ? _d : []).map((x) => `${rootPath}/${x}`),
                nodir: true,
            });
            for (let resourcePath of resourcePaths) {
                const yaml = (0, yaml_1.parseAllDocuments)(fs.readFileSync(resourcePath, "utf8"));
                for (let resource of yaml) {
                    resources.push({ content: resource.toJSON(), path: resourcePath });
                }
            }
        }
        if (!resourceCache[resourceType]) {
            resourceCache[resourceType] = resources
                .filter((resource) => `${resource.content.apiVersion}/${resource.content.kind}` == resourceType)
                .map((x) => ({ ...x.content, fileInfo: { path: x.path } }));
        }
        return resourceCache[resourceType].filter((x) => { var _a, _b, _c, _d; return (0, minimatch_1.default)(`${(_b = (_a = x.metadata) === null || _a === void 0 ? void 0 : _a.namespace) !== null && _b !== void 0 ? _b : "default"}/${(_d = (_c = x.metadata) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : "default"}`, filter); });
    });
};
exports.makeResourcesBrowser = makeResourcesBrowser;
//# sourceMappingURL=api.js.map