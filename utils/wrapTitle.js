module.exports = function(txt, basePath) {
    return `##\n## ${txt.replace(basePath, "")}\n##\n\n`;
}