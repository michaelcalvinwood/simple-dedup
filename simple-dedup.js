const fs = require('fs');
const path = require('path');

const prefixChars = ['0', '-'];
const directory_1 = '/Volumes/LocalBackup/er/imf';
const directory_2 = '/Volumes/LocalBackup/er/imfrev';

function *walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

const removePrefixChars = fileName => {
    if (!fileName) return '';

    testChar = fileName[0];
    while (prefixChars.find(pc => pc === testChar)) {
        fileName = fileName.substring(1);
        testChar = fileName[0];
    }

    return fileName;
}

const baseLength = fileName => {
    const loc = fileName.lastIndexOf('.');
    if (loc === -1) return 0;

    return loc;
}

let count = 0;
const processedFiles = new Set();

for (const filePath of walkSync(directory_2)) {
    let fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    fileName = removePrefixChars(fileName);
    const length = baseLength(fileName);

    if (length > 3) processedFiles.add(fileName);

    ++count;
    if (count > 5) break;
}

console.log(processedFiles);
