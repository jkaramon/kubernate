import { OutputResource, OutputTransformer } from "./transformer";
export declare class ResourcesBundle {
    private resourceCache;
    get resources(): OutputResource[];
    addResource(resource: OutputResource): void;
    reset(): void;
    renderAsYaml(transformers?: OutputTransformer[]): string[];
}
declare const cache: ResourcesBundle;
export default cache;
//# sourceMappingURL=cache.d.ts.map