"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lodash_1 = require("lodash");
const get = JSON.parse((0, fs_1.readFileSync)("../output/openapiGET.raw.json", "utf-8"));
const allRoutes = JSON.parse((0, fs_1.readFileSync)("../dist/allRoutes.json", "utf-8"));
const validRoots = Object.keys(allRoutes);
let paths = (0, lodash_1.pickBy)(get.paths, (_, key) => {
    return validRoots.some((route) => key.includes(route));
});
paths = (0, lodash_1.mapValues)(paths, (value, key) => {
    return (0, lodash_1.omit)(Object.assign(Object.assign({}, value), { get: Object.assign(Object.assign({}, value.get), { tags: [key.split("/")[1]] }) }), "options");
});
const res = Object.assign(Object.assign({}, get), { paths: paths });
(0, fs_1.writeFileSync)("../output/openapiGET.json", JSON.stringify(res, null, 2).replace(/"required": \[\],/g, ""));
