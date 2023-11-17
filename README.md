# Auto generate misp openapi get and post definitions

First: `npm i`
Convert the predefined files with `npm start`

## convert post.json to output/openapiPOST.json

uses src/convertPost.ts and dist/post.json that is converted from https://github.com/MISP/MISP/blob/2.4/app/Controller/Component/RestResponseComponent.php#L28

If you want you can try to add types

## convert mispGET.har to output/openapiGET.json

uses src/convertGet.ts and dist/mistGET.har

### generate the .har file

- Update the auth key in src/fetchGet.ts
- run tsc / npm run build

- open the index.html open the dev tools=>xml=>export .har
  => https://help.okta.com/oag/en-us/content/topics/access-gateway/troubleshooting-with-har.htm

- save to mispGET.har

Uses: https://github.com/jonluca/har-to-openapi

Attention: First har entry must request to final server url I guess=>delete requests to localhost

index.html fetches dist/allRoutes.json with get request
