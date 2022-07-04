import multer from "multer"
import fs from 'fs/promises'
import AWS from '../config/AWS_config.js'

import dotenv from 'dotenv'

dotenv.config()


const s3 = new AWS.S3()

const bucket_name = "jobeebucket"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },

    filename: (req, file, cb) => {

        cb(null, file.originalname)

    },

})
const upload = multer({ storage: storage })

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description This is controller for uploading file to S3 using multer
 */
export const uploadFile = (async (req, res, next) => {
    try {

        const uploadFile = upload.single('upload')

        uploadFile(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.

                console.log('====================================');
                console.log("Multer upload error");
                console.log(err);
                return res.send("A Multer error occurred when uploading.")
            } else if (err) {
                console.log("An unknown error occurred when uploading.");
                console.log(err);
                return res.send("An unknown error occurred when uploading.")

                // An unknown error occurred when uploading.
            }
            // Everything went fine. 


            if (!req.file) {
                return res.status(400).json({ message: "No Image" })
            }


            const { originalname, path } = req.file

            const fileData = await fs.readFile(path)


            s3.putObject({
                Bucket: bucket_name,
                // ACL: 'public-read',
                Key: "uploads/" + originalname,
                Body: fileData,

            }, (s3Data, err) => {

                console.log(s3Data);
                fs.unlink(path)
                res.status(200).json({ error: "file uploaded" })

                if (err) {
                    console.log('============S3 Upload Error========================');
                    console.log(err);
                    res.status(400).json({ error: "file uploaded error S3" })

                    console.log('====================================');
                }



            })




            next()

        })


    } catch (err) {
        if (err instanceof multer.MulterError) {


            // A Multer error occurred when uploading.
        } else if (err) {
            console.log('====================================');
            console.log("Multer upload error W");
            res.send("fails")
            console.log('====================================');

            console.log(err);
            // An unknown error occurred when uploading.
        }
        console.log(`Error from fileUpload \n ${err}`);
    }

})
