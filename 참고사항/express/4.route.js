
const express = require('express');
const router = express.Router();
 
router.get('/abc', (req, res) => {
    res.send('GET /abc');
});
router.post('/abc', (req, res) => {
    res.send('POST /abc');
});

//이렇게 쓸 수 있음.

// 주소를 먼저 쓰고, 그다음 .get이나 .post로 묶는 방식이다.
router.route('/abc')
    .get((req,res) => {
        res.send('GET /abc');
    })
    .post((req, res) => {
        res.send('POST /abc');
    });