const express = require('express');
const req = require('express/lib/request');
// para criar rotas sem app.get
const router = express.Router();
// carregando model de categoria 
const Category = require("./Category");
// importando a biblioteca slugify, para transforma uma string em slug
const slugify = require('slugify')

// rota para adiconar uma nova categoria, acesso so com painel de adm
router.get("/admin/categories/new",(req,res)=>{
    res.render("admin/categories/new")
});
// rota para salvar um nova categoria, metodo recomendao pra formulario é o metodo post
router.post("/categories/save",(req,res)=>{
    // recebendo dados do campo titulo e salvando no banco de dados 
    var title = req.body.title; 
    if(title != undefined){
        // salvando no banco de dados 
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/"); 
        })

    }else{
        res.redirect("/admin/categoies/new");
    }
});
// criando nova rota para listagem de dados da tabela
router.get("/admin/categories",(req,res)=>{
    // importando o module que renderiza essa tela 
    Category.findAll().then(categories=>{
        res.render("admin/categories/index",{categories:categories});
    })


   
});

module.exports = router; 