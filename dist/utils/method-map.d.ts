export declare type Method = string | MethodMap;
export declare type MethodMap = {
    [key: string]: Method;
};
export declare type AliasMap = {
    [key: string]: string;
};
export declare function renderIndentation(indentation: number): string;
export declare type MethodFormatter = (base: string, method: string, map: MethodMap, aliases?: AliasMap) => string;
export declare const CRDApiCallFormatter: MethodFormatter;
export declare const CRDApiTypeFormatter: MethodFormatter;
export declare const DefinitionsApiCallFormatter: MethodFormatter;
export declare const DefinitionsApiTypeFormatter: MethodFormatter;
export declare function renderMethodMap(base: string, formatter: MethodFormatter, map: MethodMap, aliases?: AliasMap, indents?: number): string;
//# sourceMappingURL=method-map.d.ts.map