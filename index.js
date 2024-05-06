import path from "path";
import * as fs from "node:fs/promises";

const targetPath = path.resolve("downloads");

const dirDict = {
  img: [".jpg", ".svg", ".png", ".webp"],
  doc: [".txt", ".pdf", ".xsl"],
  arch: [".zip", ".rar"],
  media: [".mp4", ".mp3", ".avi"],
};

const dirStorage = {};

async function dirHandler(dirPath) {
  const filesList = await fs.readdir(dirPath);

  const promisesList = filesList.map(async (fileName) => {
    try {
      // console.log( " fileInfo -Start", fileName);
      const itemPath = path.join(dirPath, fileName);
      const isDir = (await fs.stat(itemPath)).isDirectory();
      // console.log( " fileInfo -End", fileName);

      return {
        isDir,
        itemPath,
      };
    } catch (error) {
      console.log(" fileInfo -Error:", error.message);
    }
  });

  const result = await Promise.allSettled(promisesList);

  await Promise.allSettled(
    result.map(async ({ value }) => {
      const { isDir, itemPath } = value;
      if (isDir) {
        await dirHandler(itemPath);
      } else {
        await fileHandler(itemPath);
      }
    })
  );
}

async function fileHandler(filePath) {
  //   console.log("Handle file:", filePath);
  //   console.log(path.parse(filePath));
  const { ext, base } = path.parse(filePath);
  for (let dirName in dirDict) {
    if (dirDict[dirName].includes(ext)) {
      //   console.log("Move to dir:", dirName, "file:", filePath);
      console.log("filePath:", filePath);
      console.log("pathJoin:", path.join(targetPath, dirName, base));
      await moveFile(filePath, dirName, base);
      return;
    }
  }
  //   console.log("Move to dir:", "Other", "file:", filePath);
  await moveFile(filePath, "other", base);
}
async function moveFile(filePath, dirName, fileName) {
  const finallyPath = path.join(targetPath, dirName);
  // console.log("finallyPath: Start ", finallyPath);
  if (!dirStorage[dirName]) {
     dirStorage[dirName] = true;
    await fs.mkdir(finallyPath);
   
  }
  // console.log("finallyPath: End ", finallyPath);
  await fs.rename(filePath, path.join(finallyPath, fileName));
}
dirHandler(targetPath);
