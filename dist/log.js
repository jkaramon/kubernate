"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLogger = void 0;
const tslog_1 = require("tslog");
const log = new tslog_1.Logger({
    displayInstanceName: false,
}).getChildLogger({
    name: "kubernate",
    dateTimePattern: "hour:minute:second.millisecond",
    displayFilePath: "hidden",
    displayLoggerName: true,
    minLevel: ((_b = (_a = process.env.LOG_LEVEL) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : "info"),
});
const makeLogger = (name, options) => {
    return log.getChildLogger({ name, ...(options !== null && options !== void 0 ? options : {}) });
};
exports.makeLogger = makeLogger;
exports.default = log;
//# sourceMappingURL=log.js.map