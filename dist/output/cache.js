"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesBundle = void 0;
const yaml_1 = require("yaml");
class ResourcesBundle {
    constructor() {
        this.resourceCache = [];
    }
    get resources() {
        return this.resourceCache;
    }
    addResource(resource) {
        this.resourceCache.push(resource);
    }
    reset() {
        this.resourceCache = [];
    }
    renderAsYaml(transformers = []) {
        let resources = this.resourceCache;
        return transformers
            .reduce((resources, transformer) => resources.map((resource) => transformer(resource)), resources)
            .map((x) => (0, yaml_1.stringify)(x));
    }
}
exports.ResourcesBundle = ResourcesBundle;
const cache = new ResourcesBundle();
exports.default = cache;
//# sourceMappingURL=cache.js.map