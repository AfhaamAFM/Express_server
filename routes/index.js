import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
cb(null,'uploads')
  },
  filename:(req,file,cb)=>{

cb(null,file.originalname)

  }
})

const upload = multer({storage:storage})


/* GET home page. */
router.get('/',upload.single('image'), function(req, res, next) {

  console.log(req.files);

  res.send("hi")

  // console.log(req.file);
});

export default router;
