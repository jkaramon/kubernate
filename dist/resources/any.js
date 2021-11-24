"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResourceOfType = void 0;
const api_1 = require("../internal/api");
const makeResourceOfType = (apiVersion, kind) => {
    return (0, api_1.apiCallMethod)(apiVersion.replace("/", ".") + "." + kind);
};
exports.makeResourceOfType = makeResourceOfType;
//# sourceMappingURL=any.js.map