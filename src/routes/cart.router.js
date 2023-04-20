import { Router } from 'express';

const router = Router();


router.get('/', (req, res) => {
    res.send({ carts })
});

router.post('/', (req, res) => {
    const cart = req.body;
    res.send({ status: 'success'})
});


export default router;