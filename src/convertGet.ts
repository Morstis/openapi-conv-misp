import { generateSpec } from "har-to-openapi";
import * as fs from "fs";

const input = JSON.parse(fs.readFileSync("./mispGET.har", "utf-8"));
generateSpec(input, {
  relaxedMethods: false,
  guessAuthenticationHeaders: true,
  dropPathsWithoutSuccessfulResponse: true,
  filterStandardHeaders: true,
  addServersToPaths: true,
}).then(({ spec }) => {
  const outputPath = "../output/openapiGET.json";
  fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2));
});
