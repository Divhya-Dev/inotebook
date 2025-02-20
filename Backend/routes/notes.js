import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        name: 'senku',
        auth: 'member'
    };
    res.send(obj);
})

export default router;