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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = void 0;
const path = __importStar(require("path"));
const log_1 = require("../../log");
const config_1 = __importDefault(require("../config"));
const log = (0, log_1.makeLogger)("run", {
    displayFunctionName: false,
});
const runCommand = (name) => (yargs) => {
    return yargs.command(name, `Runs the ${name} script from your project`, (args) => args, async (args) => {
        log.info("running", name);
        log.debug("loading", config_1.default.scripts[name]);
        require("ts-node/register/transpile-only");
        try {
            const script = require(path.join(config_1.default.root, config_1.default.scripts[name]));
            log.debug("loaded", config_1.default.scripts[name]);
            log.debug("started running", config_1.default.scripts[name]);
            script
                .default()
                .catch((ex) => {
                console.error(ex);
                log.debug("finished running", config_1.default.scripts[name]);
                process.exit(1);
            })
                .then(() => {
                log.debug("finished running", config_1.default.scripts[name]);
            });
        }
        catch (ex) {
            log.error("Failed to execute " + name, ex);
            process.exit(1);
        }
    });
};
exports.runCommand = runCommand;
//# sourceMappingURL=run.js.map