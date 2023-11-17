import { generateSpec } from "har-to-openapi";
import * as fs from "fs";

const input = JSON.parse(fs.readFileSync("./mispGET.har", "utf-8"));
generateSpec(input, {
  relaxedMethods: true,
  guessAuthenticationHeaders: true,
  dropPathsWithoutSuccessfulResponse: false,
  filterStandardHeaders: false,
}).then(({ spec }) => {
  const outputPath = "../output/openapiGET.raw.json";
  fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2));
});
