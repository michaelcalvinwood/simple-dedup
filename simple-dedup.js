const fs = require('fs');
const path = require('path');

const directory_1 = '/Users/michaelwood/Desktop/github/playground/simple-dedup';

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

for (const filePath of walkSync(directory_1)) {
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
  console.log(fileName);
}

