#! /usr/bin/env node

const fs = require("fs");
const args = process.argv.slice(2);
const path = require("path");
const readdirRecursively = require(__dirname + "/utils/readdirRecursively.js");
const wrapTitle = require(__dirname + "/utils/wrapTitle.js");
const baseDir = __dirname + "/data";
const handleError = require(__dirname + "/utils/handleError.js");

try {
    const files = readdirRecursively(baseDir);
    const fileId = args[0];

    files.filter(file => path.basename(file).toLowerCase().indexOf(fileId.toLowerCase()) !== -1);

    files.map(file => wrapTitle(file, baseDir) + fs.readFileSync(file).toString()).forEach(file => {
        console.log(file);
    });
} catch (error) {
    handleError("docopen", error.name, error.message);
}