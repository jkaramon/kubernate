export interface ConfigOutputs {
    schemas: string;
    code: string;
}
export interface Config {
    targetVersion: "v1";
    scripts?: {
        [name: string]: string;
    };
    crds?: {
        output: string;
        list: {
            groupPrefix: string;
            name: string;
            path: string;
        }[];
    };
    resources?: {
        entryTypeName?: string;
        include?: string;
        exclude?: string[];
        output: ConfigOutputs;
        entry: string;
        contributors?: string[];
    };
}
declare const config: Config & {
    filePath: string;
    root: string;
};
export default config;
//# sourceMappingURL=config.d.ts.map