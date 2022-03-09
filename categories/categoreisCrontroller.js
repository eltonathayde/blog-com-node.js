const express = require('express');
const req = require('express/lib/request');
// para criar rotas sem app.get
const router = express.Router();

router.get('/categories',(req,res)=>{
    res.send("ROTA DE CATEGORIAS")
});


router.get("/admin/categories/new",(req,res)=>{
    res.send("ROTA PRA CRIAR UM NOVA CATEGORIA")
});

module.exports = router; 