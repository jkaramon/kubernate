#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const config_1 = __importDefault(require("./config"));
const generate_1 = require("./commands/generate");
const run_1 = require("./commands/run");
const init_1 = require("./commands/init");
const commands = config_1.default.root == "not_found" ? [init_1.initCommand] : [generate_1.generateCommand, ...Object.keys((_a = config_1.default.scripts) !== null && _a !== void 0 ? _a : {}).map((name) => (0, run_1.runCommand)(name))];
const args = commands.reduce((arg, command) => command(arg), yargs_1.default);
args.help().completion().strict().demandCommand().showHelpOnFail(true).argv;
//# sourceMappingURL=bin.js.map