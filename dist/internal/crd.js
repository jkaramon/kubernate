"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCrd = void 0;
function isCrd(obj) {
    return obj.apiVersion.indexOf("apiextensions.k8s.io") == 0 && obj.kind == "CustomResourceDefinition";
}
exports.isCrd = isCrd;
//# sourceMappingURL=crd.js.map