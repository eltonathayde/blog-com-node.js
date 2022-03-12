const express=require('express');
const req = require('express/lib/request');
const router = express.Router();
const Category= require("../categories/Category");
const Article = require("./Articles");
const slugify = require("slugify")


router.get("/admin/articles",(req,res)=>{
     res.send('ROTA DE ARTIGOS')
});

router.get("/admin/articles/new",(req,res)=>{
    Category.findAll().then(categories=>{
        res.render("admin/articles/new",{categories:categories}) 
    });
   
});

router.post("/articles/save",(req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var categoria = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body:body,
        categoryId:categoria    
    }).then(()=>{
        res.redirect("/admin/articles");
    });
});
    

module.exports= router;