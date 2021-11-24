"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMethodMap = exports.DefinitionsApiTypeFormatter = exports.DefinitionsApiCallFormatter = exports.CRDApiTypeFormatter = exports.CRDApiCallFormatter = exports.renderIndentation = void 0;
function renderIndentation(indentation) {
    return Array(indentation).fill("  ").join("");
}
exports.renderIndentation = renderIndentation;
const CRDApiCallFormatter = (base, method, map, aliases) => `crdApiCallMethod<defs["${map[method]}"]>("${map[method]}", "${aliases[map[method]]}")`;
exports.CRDApiCallFormatter = CRDApiCallFormatter;
const CRDApiTypeFormatter = (base, method, map, aliases) => `CRDApiCallMethod<defs["${map[method]}"]>`;
exports.CRDApiTypeFormatter = CRDApiTypeFormatter;
const DefinitionsApiCallFormatter = (base, method, map, aliases) => `apiCallMethod<defs["${map[method]}"]>("${map[method]}")`;
exports.DefinitionsApiCallFormatter = DefinitionsApiCallFormatter;
const DefinitionsApiTypeFormatter = (base, method, map, aliases) => `ApiCallMethod<defs["${map[method]}"]>`;
exports.DefinitionsApiTypeFormatter = DefinitionsApiTypeFormatter;
function renderMethodMap(base, formatter, map, aliases, indents = 0) {
    const indentation = renderIndentation(indents + 1);
    let text = `${renderIndentation(indents)}"${base}": {\n`;
    const methods = Object.keys(map);
    for (let method of methods) {
        if (typeof map[method] == "string") {
            text += `${indentation}"${method}": ${formatter(base, method, map, aliases)},\n`;
        }
        else {
            text += `${renderMethodMap(method, formatter, map[method], aliases, indents + 1)}\n`;
        }
    }
    text += `${renderIndentation(indents)}},`;
    return text;
}
exports.renderMethodMap = renderMethodMap;
//# sourceMappingURL=method-map.js.map