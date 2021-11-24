import { ResourcesBundle } from "./cache";
import { OutputTransformer } from "./transformer";
export * from "./transformer";
export interface OutputOptions {
    transformers?: OutputTransformer[];
    source?: ResourcesBundle;
}
declare const output: {
    bundle(options?: OutputOptions | undefined): string;
    bundleToDisk(path: string, options?: OutputOptions | undefined): Promise<string>;
    resetBundle(): void;
    makeEmptyBundle(): ResourcesBundle;
};
export default output;
//# sourceMappingURL=index.d.ts.map