#! /usr/bin/env node

const fs = require("fs");
const args = process.argv.slice(2);
const path = require("path");
const handleError = require(__dirname + "/utils/handleError.js");

let hasOverrideFlag = false;

try {
    AddingDocs:
    for(let index = 0; index < args.length; index++) {
        let arg = args[index];
        if(arg === "--override") {
            hasOverrideFlag = true;
            continue AddingDocs;
        }
        const argPath = path.resolve(arg);
        const basename = path.basename(argPath);
        const destPath = path.resolve(__dirname + "/data", basename);
        if(fs.existsSync(destPath)) {
            if(!hasOverrideFlag) {
                handleError("docadd", "Error adding doc «" + basename + "»", "Destination file already exists. If you want to override the current doc, use the flag «--override» before the doc id.");
            }
        }
        if(!destPath.endsWith(".md")) {
            handleError("docadd", "Error adding doc «" + basename + "»", "File must end with «.md» extension.");
        }
        fs.copyFileSync(argPath, destPath);
        console.log(`[docadd] successfully added doc: ${basename}`);
    }
} catch (error) {
    handleError("docadd", error.name, error.message);
}