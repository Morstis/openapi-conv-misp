import * as fs from "fs";
interface AttributeDefinition {
  description?: string;
  mandatory?: string[];
  optional?: string[];
  params?: string[];
}

interface EndpointDefinition {
  [key: string]: {
    post: {
      summary: string;
      description: string;
      operationId: string;
      tags: string[];
      parameters: any[];
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: string;
              properties: {
                [key: string]: {
                  type: string;
                };
              };
              required: string[];
            };
          };
        };
      };
      responses: any;
    };
    parameters: any[];
  };
}

function generateEndpoint(
  input: {
    [key: string]: AttributeDefinition;
  },
  parent = "attribute"
): EndpointDefinition {
  const endpoint: EndpointDefinition = {};

  for (const key in input) {
    const attribute = input[key];

    const path = `/${parent}/${key}`;
    const pathParam =
      (attribute.params ?? []).length > 0 ? `/{${attribute.params![0]}}` : "";

    endpoint[`${path}${pathParam}`] = {
      post: {
        summary: `${key} ${parent.charAt(0).toUpperCase() + parent.slice(1)}`,
        description: attribute.description ?? "",
        operationId: key + parent.charAt(0).toUpperCase() + parent.slice(1),
        tags: [parent],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
                required: attribute.mandatory ?? [],
              },
            },
          },
        },
        responses: {},
      },
      parameters:
        (attribute.params ?? []).length > 0
          ? [
              {
                in: "path",
                name: attribute.params![0],
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
      ...(attribute.optional ?? []),
      ...(attribute.mandatory ?? []),
    ]) {
      endpoint[`${path}${pathParam}`].post.requestBody.content[
        "application/json"
      ].schema.properties[param] = {
        type: "string",
      };
    }
  }

  return endpoint;
}

const input = JSON.parse(fs.readFileSync("./post.json", "utf-8"));

let output: any = {};
for (const key in input) {
  output = {
    ...output,
    ...generateEndpoint(input[key], key.toLocaleLowerCase()),
  };
}

const apiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Post Api of MISP",
    version: "1.0.0",
    description: "Autogenerated",
  },
  paths: output,
};

// Example usage with the provided input
const openAPI = JSON.stringify(apiSpec, null, 2);
const outputPath = "../output/openapiPOST.json";
fs.writeFileSync(outputPath, openAPI);
