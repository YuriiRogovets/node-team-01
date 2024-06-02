import path from "node:path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("tmp"));
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    const uniqueSuffix = id + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

export const upload = multer({ storage: storage });
