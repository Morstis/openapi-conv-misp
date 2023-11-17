"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
const har_to_openapi_1 = require("har-to-openapi");
const fs = __importStar(require("fs"));
const input = JSON.parse(fs.readFileSync("./mispGET.har", "utf-8"));
(0, har_to_openapi_1.generateSpec)(input, {
    relaxedMethods: false,
    guessAuthenticationHeaders: true,
    dropPathsWithoutSuccessfulResponse: true,
    filterStandardHeaders: true,
    addServersToPaths: true,
}).then(({ spec }) => {
    const outputPath = "../output/openapiGET.raw.json";
    fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2));
});
