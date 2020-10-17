const express = require('express')
const app = express()
const http = require('http');
const fs = require('fs')
const url = require('url');
//route 요청에 적당한 경로를 제공하는 것, 즉 적당한 응답을 해주는 과정
// method 1
app.get('/', (req, res) => res.send('Hello World!'))

// method 2
// app.get('/', function(req, res){
//     return res.send('Hello World!')
// });
app.listen(3000, ()=>console.log('Example app listening on port 3000'))