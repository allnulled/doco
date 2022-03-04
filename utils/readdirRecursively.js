const readdirRecursively = function(dir) {
    if(typeof dir !== "string") {
        throw new Error("Required «dir» to be a string");
    }
    const fs = require("fs");
    const path = require("path");
    let files = [];
    let subnodes = fs.readdirSync(dir).map(f => path.resolve(dir, f));
    for (let indexSubnode = 0; indexSubnode < subnodes.length; indexSubnode++) {
        const subnode = subnodes[indexSubnode];
        if (fs.lstatSync(subnode).isDirectory() && !subnode.endsWith("/node_modules")) {
            files = files.concat(readdirRecursively(subnode));
        } else if(fs.lstatSync(subnode).isFile()) {
            files.push(subnode);
        }
    }
    return files;
};

module.exports = readdirRecursively;