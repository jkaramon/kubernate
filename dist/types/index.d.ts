import { PartialDeep } from "type-fest";
import { DefinitionsAliasMap } from "../__generated__/definitions";
import { ApiCallOptions } from "../internal/api";
export declare type Definition<T extends keyof DefinitionsAliasMap> = DefinitionsAliasMap[T];
export declare function isResourceOfType<T extends keyof DefinitionsAliasMap>(input: any, type: T): input is DefinitionsAliasMap[T];
export declare function patchResource<T>(input: T, patch: PartialDeep<T>): T;
export declare function strategicPatchResource<T>(input: T, patch: PartialDeep<T>): T;
export declare type ResourceMetaAnnotations = {
    [key: string]: any;
};
export declare type ResourceMetadata<TAnnotations = ResourceMetaAnnotations> = {
    namespace?: string;
    name: string;
    annotations?: TAnnotations;
};
export declare type Resource<Version extends string, Kind extends string, Spec, Metadata = ResourceMetadata> = {
    apiVersion: Version;
    kind: Kind;
    metadata: Metadata;
    spec: Spec;
};
export declare type ResourceCallOptions = ApiCallOptions;
//# sourceMappingURL=index.d.ts.map