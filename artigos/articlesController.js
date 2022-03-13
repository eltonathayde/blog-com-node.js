const express=require('express');
const req = require('express/lib/request');
const router = express.Router();
const Category= require("../categories/Category");
const Article = require("./Articles");
const slugify = require("slugify")


router.get("/admin/articles",(req,res)=>{
    Article.findAll({
        // incluindo o model category na busca
        include:[{model:Category}]
    }).then(articles=>{
        res.render("admin/articles/index",{articles:articles})
    });
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
    // criando rotas para deletar arquivos
    router.post("/articles/delete",(req,res)=>{
        var id = req.body.id;
        // verificando se o id e difente de  nulo 
        if(id != undefined){
    
            if(!isNaN(id)){
    
                Article.destroy({
                        where: {
                            id:id
                        }
                }).then(()=>{
                    res.redirect("/admin/articles");
                });
    
    
            }else{ // se o id não for um numero é redirecionado para pagina de listagem de   categorias
                res.redirect("/admin/articles");
            }
    
        }else{ // se o ider for nulo, e redirecionado para pagina  de listagem de categorias 
            res.redirect("/admin/articles");
        }
    });

module.exports= router;