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
    const argText = args[1];

    files.filter(file => path.basename(file).toLowerCase().indexOf(fileId.toLowerCase()) !== -1);

    files.map(file => {
        return  {
            file,
            contents: wrapTitle(file, baseDir) + fs.readFileSync(file).toString()
        };
    }).forEach(fileMetadata => {
        const { file, contents } = fileMetadata;
        const basefile = path.basename(file);
        const lines = contents.split("\n");
        let hasMatches = false;
        for(let indexLine = 0; indexLine < lines.length; indexLine++) {
            let line = lines[indexLine].trim();
            const initialPosition = line.toLowerCase().indexOf(argText.toLowerCase());
            if(initialPosition !== -1) {
                if(!hasMatches) {
                    console.log("[docsearch] found at doc «" + basefile + "»:");
                    hasMatches = true;
                }
                const firstStr = line.substr(0, initialPosition);
                const middStr = line.substr(initialPosition, argText.length);
                const lastStr = line.substr(initialPosition + argText.length);
                console.log(`  [line ${indexLine}] ${firstStr}\u001b[33;1m${middStr}\u001b[0m${lastStr}`);
            }
        }
    });
} catch (error) {
    handleError("docsearch", error.name, error.message);
}