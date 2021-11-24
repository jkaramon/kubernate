"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = exports.log = exports.kube = void 0;
const definitions_1 = require("./__generated__/definitions");
const output_1 = __importDefault(require("./output"));
exports.output = output_1.default;
const log_1 = __importDefault(require("./log"));
exports.log = log_1.default;
const kube = definitions_1.definitions["api"];
exports.kube = kube;
exports.default = kube;
__exportStar(require("./types"), exports);
__exportStar(require("./log"), exports);
__exportStar(require("./output"), exports);
//# sourceMappingURL=index.js.map