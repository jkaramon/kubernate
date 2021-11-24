"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategicPatchResource = exports.patchResource = exports.isResourceOfType = void 0;
const deepmerge_1 = __importDefault(require("deepmerge"));
function isResourceOfType(input, type) {
    const [api, version, kind] = type.split(".");
    const apiVersion = api == "core" ? version : `${api}/${version}`;
    return input.apiVersion === apiVersion && input.kind === kind;
}
exports.isResourceOfType = isResourceOfType;
function patchResource(input, patch) {
    return (0, deepmerge_1.default)(input, patch, {
        arrayMerge: (target, source) => source,
    });
}
exports.patchResource = patchResource;
function strategicPatchResource(input, patch) {
    return (0, deepmerge_1.default)(input, patch);
}
exports.strategicPatchResource = strategicPatchResource;
//# sourceMappingURL=index.js.map