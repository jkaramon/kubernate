"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const namespace = (name, options) => {
    var _a;
    const resource = index_1.default.core.v1.Namespace({ metadata: { name } }, options);
    return (_a = resource.metadata) === null || _a === void 0 ? void 0 : _a.name;
};
exports.default = namespace;
//# sourceMappingURL=namespace.js.map