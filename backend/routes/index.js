import express from 'express';
const router = express.Router();

router.get('/', function (req, res) {
  res.json({ message: 'Hello from me!' });
});

export default router;
