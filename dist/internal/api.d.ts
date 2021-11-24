import { ResourcesBundle } from "../output/cache";
export declare type ApiCallOptions = {
    bundle?: ResourcesBundle;
    skipBundle?: boolean;
};
export declare type ApiCallMethod<T> = (input: Omit<T, "apiVersion" | "kind" | "status">, options?: ApiCallOptions) => Omit<T, "status">;
export declare type CRDApiCallMethod<T> = (input: T, options?: ApiCallOptions) => T;
export declare const apiCallMethod: <T>(apiName: string) => ApiCallMethod<T>;
export declare const crdApiCallMethod: <T>(alias: string, apiName: string) => CRDApiCallMethod<T>;
export declare type ResourceBrowserInfo = {
    fileInfo: {
        path: string;
    };
};
export declare const makeResourcesBrowser: <T>(rootPath: string) => <TResources extends keyof T>(resource: TResources, filter?: string | undefined) => (T[TResources] & ResourceBrowserInfo)[];
//# sourceMappingURL=api.d.ts.map