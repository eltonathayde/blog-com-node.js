const express=require('express');
const req = require('express/lib/request');
const router = express.Router();
const Category= require('../categories/Category');
const Article = require('./Articles');
const slugify = require('slugify')


router.get("/articles",(req,res)=>{
     res.send('ROTA DE ARTIGOS')
});

router.get("/admin/articles/new",(req,res)=>{
    Category.findAll().then(categories=>{
        res.render("admin/articles/new",{categories:categories}) 
    })
   
});

router.post("/articles/save")
    

module.exports= router;