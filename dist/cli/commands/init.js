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
exports.initCommand = void 0;
const log_1 = require("../../log");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const glob_1 = __importDefault(require("glob"));
const handlebars_1 = __importDefault(require("handlebars"));
const shelljs_1 = require("shelljs");
const log = (0, log_1.makeLogger)("init", {
    displayFunctionName: false,
});
const initCommand = (yargs) => {
    return yargs.command("init <name>", "start a new project with kubernate", (args) => args
        .positional("name", { required: true, type: "string", description: "the name of the project" })
        .option("path", {
        type: "string",
        description: "the path to the project (defaults to the $CWd/name)",
        alias: "p",
        required: false,
    })
        .option("template", {
        alias: "t",
        description: "the name of the source template",
        type: "string",
        choices: ["basic", "with-resources", "blank"],
        default: "basic",
        required: true,
    })
        .option("package-manager", {
        alias: "m",
        default: "npm",
        description: "the package manager to use",
        choices: ["npm", "yarn"],
    }), async (args) => {
        var _a, _b, _c, _d;
        const projectName = args.name;
        const projectPath = path.join(process.cwd(), (_a = args.path) !== null && _a !== void 0 ? _a : projectName);
        const porjectTemplate = (_b = args.template) !== null && _b !== void 0 ? _b : "basic";
        const projectPackageManager = (_c = args["package-manager"]) !== null && _c !== void 0 ? _c : "npm";
        log.info(`creating kubernate project ${projectName} at ${projectPath}`);
        if (fs.existsSync(projectPath)) {
            if (!fs.statSync(projectPath).isDirectory()) {
                log.error(`${projectPath} exists and is not a directory`);
                process.exit(1);
            }
            const contents = fs.readdirSync(projectPath);
            if (contents.length > 0) {
                log.error(`directory ${projectPath} already exists and is not empty`);
                process.exit(1);
            }
        }
        else {
            log.debug(`creating directory ${projectPath}`);
            fs.mkdirSync(projectPath, { recursive: true });
        }
        const templateDirectory = path.join(__dirname, "../../", "assets", "init-templates", porjectTemplate);
        if (!fs.existsSync(templateDirectory)) {
            log.error(`template ${porjectTemplate} does not exist`);
            process.exit(1);
        }
        const templateFiles = glob_1.default.sync("**/*", { cwd: templateDirectory, dot: true, nodir: true });
        for (let file of templateFiles) {
            let fileName = file.replace(".hbs", "");
            if (fileName.includes("{{")) {
                fileName = handlebars_1.default.compile(file.replace(".hbs", ""))({
                    projectName,
                    projectPath,
                    porjectTemplate,
                    projectPackageManager,
                });
            }
            const content = file.endsWith(".hbs")
                ? handlebars_1.default.compile(fs.readFileSync(path.join(templateDirectory, file), "utf8"))({
                    projectName,
                    projectPath,
                    porjectTemplate,
                    projectPackageManager,
                })
                : fs.readFileSync(path.join(templateDirectory, file), "utf8");
            const directory = path.dirname(path.join(projectPath, fileName));
            if (!fs.existsSync(directory)) {
                log.debug(`creating directory ${directory}`);
                fs.mkdirSync(directory, { recursive: true });
            }
            if (!file.endsWith(".empty")) {
                log.debug(`writing file ${file} as ${fileName}`);
                fs.writeFileSync(path.join(projectPath, fileName), content);
            }
        }
        (0, shelljs_1.cd)(projectPath);
        log.info(`$ ${projectPackageManager} install`);
        (0, shelljs_1.exec)(`${projectPackageManager} install`);
        log.info(`project ${projectName} created at ${projectPath}`);
        log.info(`now run 'cd ${(_d = args.path) !== null && _d !== void 0 ? _d : projectName}'`);
    });
};
exports.initCommand = initCommand;
//# sourceMappingURL=init.js.map