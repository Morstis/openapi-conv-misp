import { readFileSync, writeFileSync } from "fs";
import { merge } from "lodash";

const post = JSON.parse(readFileSync("../output/openapiPOST.json", "utf-8"));
const get = JSON.parse(readFileSync("../output/openapiGET.json", "utf-8"));

const res = merge(post, get);

writeFileSync("../output/merged.json", JSON.stringify(res, null, 2));
