import { readFileSync, write, writeFileSync } from "fs";
import { map, mapValues, omit, pick, pickBy } from "lodash";

const get = JSON.parse(readFileSync("../output/openapiGET.raw.json", "utf-8"));

const allRoutes = JSON.parse(readFileSync("../dist/allRoutes.json", "utf-8"));

const validRoots = Object.keys(allRoutes);

let paths = pickBy(get.paths, (_, key) => {
  return validRoots.some((route) => key.includes(route));
});

paths = mapValues(paths, (value, key) => {
  return omit(
    { ...value, get: { ...value.get, tags: [key.split("/")[1]] } },
    "options"
  );
});

const res = {
  ...get,
  paths: paths,
};

writeFileSync(
  "../output/openapiGET.json",
  JSON.stringify(res, null, 2).replace(/"required": \[\],/g, "")
);
