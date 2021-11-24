import type Yargs from "yargs";
export declare const initCommand: (yargs: typeof Yargs) => Yargs.Argv<{
    name: string | undefined;
} & {
    path: string | undefined;
} & {
    template: string;
} & {
    "package-manager": string;
}>;
//# sourceMappingURL=init.d.ts.map