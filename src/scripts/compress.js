import { readdirSync, createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

var dirs = ["../public/sitemap"];

dirs.forEach((dir) => {
  readdirSync(dir).forEach((file) => {
    if (file.endsWith(".xml")) {
      // gzip
      const fileContents = createReadStream(dir + "/" + file);
      const writeStream = createWriteStream(dir + "/" + file + ".gz");
      const zip = createGzip();

      fileContents
        .pipe(zip)
        .on("error", (err) => console.error(err))
        .pipe(writeStream)
        .on("error", (err) => console.error(err));
    }
  });
});
