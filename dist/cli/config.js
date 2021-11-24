"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const log_1 = require("../log");
const log = (0, log_1.makeLogger)("config", { displayFunctionName: false });
const cosmiconfig_1 = require("cosmiconfig");
const configLoader = (0, cosmiconfig_1.cosmiconfigSync)("kubernate").search();
const config = {
    root: !!(configLoader === null || configLoader === void 0 ? void 0 : configLoader.filepath) ? path.dirname((_a = configLoader === null || configLoader === void 0 ? void 0 : configLoader.filepath) !== null && _a !== void 0 ? _a : "") : "not_found",
    filePath: configLoader === null || configLoader === void 0 ? void 0 : configLoader.filepath,
    ...((_b = configLoader === null || configLoader === void 0 ? void 0 : configLoader.config) !== null && _b !== void 0 ? _b : {}),
};
exports.default = config;
//# sourceMappingURL=config.js.map