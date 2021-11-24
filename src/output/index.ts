import cache, {ResourcesBundle} from "./cache";
import {writeFile} from "fs";
import * as fs from "fs";
import {dirname} from "path";
import {OutputTransformer} from "./transformer";
import {log} from "..";

export * from "./transformer";

const getOutputAsFile = (bundle: ResourcesBundle, transformers: OutputTransformer[] = []) => {
    const yamls = bundle.renderAsYaml(transformers);
    return yamls.join("---\n");
};

export interface OutputOptions {
    transformers?: OutputTransformer[];
    source?: ResourcesBundle;
}

const output = {
    bundle(options?: OutputOptions) {
        return getOutputAsFile(options?.source ?? cache, options?.transformers ?? []);
    },
    async bundleToDisk(path: string, options?: OutputOptions) {
        const bundle = getOutputAsFile(options?.source ?? cache, options?.transformers ?? []);

        if (!fs.existsSync(dirname(path))) {
            log.debug(`creating directory ${dirname(path)}`);
            fs.mkdirSync(dirname(path), {recursive: true});
        }

        await new Promise<void>((resolve, reject) => {
            writeFile(path, bundle, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        return bundle;
    },
    resetBundle() {
        cache.reset();
    },
    makeEmptyBundle() {
        return new ResourcesBundle();
    },
};

export default output;
