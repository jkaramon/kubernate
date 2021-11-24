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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = __importStar(require("./cache"));
const fs_1 = require("fs");
const fs = __importStar(require("fs"));
const path_1 = require("path");
const __1 = require("..");
__exportStar(require("./transformer"), exports);
const getOutputAsFile = (bundle, transformers = []) => {
    const yamls = bundle.renderAsYaml(transformers);
    return yamls.join("---\n");
};
const output = {
    bundle(options) {
        var _a, _b;
        return getOutputAsFile((_a = options === null || options === void 0 ? void 0 : options.source) !== null && _a !== void 0 ? _a : cache_1.default, (_b = options === null || options === void 0 ? void 0 : options.transformers) !== null && _b !== void 0 ? _b : []);
    },
    async bundleToDisk(path, options) {
        var _a, _b;
        const bundle = getOutputAsFile((_a = options === null || options === void 0 ? void 0 : options.source) !== null && _a !== void 0 ? _a : cache_1.default, (_b = options === null || options === void 0 ? void 0 : options.transformers) !== null && _b !== void 0 ? _b : []);
        if (!fs.existsSync((0, path_1.dirname)(path))) {
            __1.log.debug(`creating directory ${(0, path_1.dirname)(path)}`);
            fs.mkdirSync((0, path_1.dirname)(path), { recursive: true });
        }
        await new Promise((resolve, reject) => {
            (0, fs_1.writeFile)(path, bundle, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
        return bundle;
    },
    resetBundle() {
        cache_1.default.reset();
    },
    makeEmptyBundle() {
        return new cache_1.ResourcesBundle();
    },
};
exports.default = output;
//# sourceMappingURL=index.js.map