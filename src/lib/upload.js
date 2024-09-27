const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../images"),
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("imagen");