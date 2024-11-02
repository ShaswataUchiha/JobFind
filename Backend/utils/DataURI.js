import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file || !file.buffer || !file.originalname) {
    throw new Error("Invalid file data. Ensure file is uploaded correctly.");
  }

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUri;
