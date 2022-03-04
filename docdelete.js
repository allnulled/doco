#! /usr/bin/env node

const fs = require("fs");
const args = process.argv.slice(2);
const path = require("path");
const handleError = require(__dirname + "/utils/handleError.js");

let hasMultipleFlag = false;

try {
    DeletingDocs:
    for(let index = 0; index < args.length; index++) {
        let arg = args[index];
        if(arg === "--multiple") {
            hasMultipleFlag = true;
            continue DeletingDocs;
        }
        const argName = path.basename(arg);
        const argDir = path.dirname(path.resolve(__dirname + "/data", arg));
        const matchedFiles = fs.readdirSync(argDir).filter(argFile => argFile.toLowerCase().indexOf(argName.toLowerCase()) !== -1).map(argFile => path.resolve(argDir, argFile));
        if(matchedFiles.length > 1) {
            if(!hasMultipleFlag) {
                handleError("docdelete", "Error deleting doc «" + arg + "»", "Multiple docs matched. To delete multiple docs at once, use the flag «--multiple» before the doc id.");
            }
        }
        for(let index2 = 0; index2 < matchedFiles.length; index2++) {
            let matchedFile = matchedFiles[index2];
            fs.unlinkSync(matchedFile);
            console.log("[docdelete] successfully deleted doc: " + matchedFile);
        }
    }
} catch (error) {
    handleError("docdelete", error.name, error.message);
}