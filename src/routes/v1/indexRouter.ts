import express from 'express';

const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function (req, res) {
  res.status(200).json({ word: 'hi' });

  // console.log(req.file);
});

export { indexRouter };
