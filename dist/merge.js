"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lodash_1 = require("lodash");
const post = JSON.parse((0, fs_1.readFileSync)("../output/openapiPOST.json", "utf-8"));
const get = JSON.parse((0, fs_1.readFileSync)("../output/openapiGET.json", "utf-8"));
const res = (0, lodash_1.merge)(post, get);
(0, fs_1.writeFileSync)("../output/merged.json", JSON.stringify(res, null, 2));
