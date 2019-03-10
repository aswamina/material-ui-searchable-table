const { gitDescribeSync } = require('git-describe');
const { version, releaseQuarter } = require('../package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

const gitInfo = gitDescribeSync({
    dirtyMark: false,
    dirtySemver: false,
    all: true
});

gitInfo.version = releaseQuarter + "-" + version;

const file = resolve(__dirname, '..', 'build', 'version.js');
console.log("FILE NAME =", file);
writeFileSync(file,
    `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
`, { encoding: 'utf-8' });

console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);
