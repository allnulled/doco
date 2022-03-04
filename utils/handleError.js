module.exports = function(command, id, message = "Error on doc operation:") {
    console.error(`[${command}] ${message} ${JSON.stringify({
        name: id,
        message,
        stack: "..." || error.stack
    }, null, 4)}`);
    process.exit(0);
}