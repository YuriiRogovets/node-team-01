import path from "path";
import * as fs from "node:fs/promises";

const targetPath = path.resolve("downloads")

async function dirHandler(dirPath) {
    const filesList = await fs.readdir(dirPath)
    
    const promisesList = filesList.map(async (fileName) => { 
        try {
            // console.log( " fileInfo -Start", fileName);
            const itemPath = path.join(dirPath, fileName);
            const isDir = (await fs.stat(itemPath)).isDirectory()
            // console.log( " fileInfo -End", fileName);
          
            return {
                isDir,
                itemPath
            }

        } catch (error) {
            console.log(" fileInfo -Error:", error.message);
        }
    })

   const result = await Promise.allSettled(promisesList) ;
    
    result.forEach(({ value }) => {
        const { isDir, itemPath } = value;
        if (isDir) {
           dirHandler(itemPath)
        
        } else {
            fileHandler(itemPath);

       }
   })
}

function fileHandler(filePath) {
 console.log( "Handle file:", filePath);
}

dirHandler(targetPath);

