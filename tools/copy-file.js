const fs = require('fs');

var cmdArgs = process.argv.slice(2);

const from = cmdArgs[0];
const to = cmdArgs[1];

console.log(`Copying file from ${from} to ${to}`);
fs.copyFile(from, to, (err) => {
    if (err) throw err;
    console.log('File copied');
});
