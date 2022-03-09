const express=require('express');
const req = require('express/lib/request');
const router = express.Router();


router.get('/articles',(req,res)=>{
     res.send('ROTA DE ARTIGOS')
});

router.get('/admin/articles/new',(req,res)=>{
    res.send('ROTA PRA CRIAR NOVOS ARTIGOS')
});
 

module.exports= router;