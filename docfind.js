#! /usr/bin/env node

const fs = require("fs");
const args = process.argv.slice(2);
const path = require("path");
const readdirRecursively = require(__dirname + "/utils/readdirRecursively.js");
const handleError = require(__dirname + "/utils/handleError.js");

const files = readdirRecursively(__dirname + "/data");
const matchedDocs = {};

try {
    for(let index = 0; index < files.length; index++) {
        const file = files[index];
        const contents = fs.readFileSync(file).toString().toLowerCase();
        const hasMatches = (function() {
            let allMatches = 0;
            for(let indexArgs = 0; indexArgs < args.length; indexArgs++) {
                const arg = args[indexArgs].toLowerCase();
                if(file.toLowerCase().indexOf(arg) !== -1) {
                    allMatches += 1;
                }
                const matches = contents.split(arg).length - 1;
                if(matches) {
                    allMatches += matches;
                }
            }
            return allMatches;
        })();
        if(hasMatches) {
            matchedDocs[path.basename(file)] = hasMatches;
        }
    }

    console.log(matchedDocs);
} catch (error) {
    handleError("docfind", error.name, error.message);
}