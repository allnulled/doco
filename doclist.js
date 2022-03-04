#! /usr/bin/env node

const fs = require("fs");
const args = process.argv.slice(2);
const path = require("path");
const readdirRecursively = require(__dirname + "/utils/readdirRecursively.js");
const handleError = require(__dirname + "/utils/handleError.js");

const files = readdirRecursively(__dirname + "/data");

try {
    for(let index = 0; index < files.length; index++) {
        const file = files[index];
        console.log(`[doclist] doc: ${path.basename(file)}`);
    }
} catch (error) {
    handleError("doclist", error.name, error.message);
}