require("dotenv").config()
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = require("./s3")

const bucket = process.env.AWS_BUCKET_NAME


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket,
        metadata: function (req, file, cb) {
            console.log(file)
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload