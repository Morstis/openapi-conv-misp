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
const fs = __importStar(require("fs"));
function generateEndpoint(input, parent = "attribute") {
    var _a, _b, _c, _d, _e, _f;
    const endpoint = {};
    for (const key in input) {
        const attribute = input[key];
        const path = `/${parent}/${key}`;
        const pathParam = ((_a = attribute.params) !== null && _a !== void 0 ? _a : []).length > 0 ? `/{${attribute.params[0]}}` : "";
        endpoint[`${path}${pathParam}`] = {
            post: {
                summary: `${key} ${parent.charAt(0).toUpperCase() + parent.slice(1)}`,
                description: (_b = attribute.description) !== null && _b !== void 0 ? _b : "",
                operationId: key + parent.charAt(0).toUpperCase() + parent.slice(1),
                tags: [parent],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                                required: (_c = attribute.mandatory) !== null && _c !== void 0 ? _c : [],
                            },
                        },
                    },
                },
                responses: {},
            },
            parameters: ((_d = attribute.params) !== null && _d !== void 0 ? _d : []).length > 0
                ? [
                    {
                        in: "path",
                        name: attribute.params[0],
                        description: "",
                        schema: {
                            type: "string",
                        },
                        required: true,
                    },
                ]
                : [],
        };
        for (const param of [
            ...((_e = attribute.optional) !== null && _e !== void 0 ? _e : []),
            ...((_f = attribute.mandatory) !== null && _f !== void 0 ? _f : []),
        ]) {
            endpoint[`${path}${pathParam}`].post.requestBody.content["application/json"].schema.properties[param] = {
                type: "string",
            };
        }
    }
    return endpoint;
}
const input = JSON.parse(fs.readFileSync("./post.json", "utf-8"));
let output = {};
for (const key in input) {
    output = Object.assign(Object.assign({}, output), generateEndpoint(input[key], key.toLocaleLowerCase()));
}
// Example usage with the provided input
const openAPIPath = JSON.stringify(output, null, 2);
const outputPath = "../output/openapiPOST.json";
fs.writeFileSync(outputPath, openAPIPath);