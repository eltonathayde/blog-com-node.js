const express = require('express');
const req = require('express/lib/request');
// para criar rotas sem app.get
const router = express.Router();
// carregando model de categoria 
const Category = require("./Category");
// importando a biblioteca slugify, para transforma uma string em slug
const slugify = require('slugify');
const { redirect } = require('express/lib/response');

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
            res.redirect("/admin/categories"); 
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
    });
});

// criando uma rota para deletar categorias 
router.post("/categories/delete",(req,res)=>{
    var id = req.body.id;
    // verificando se o id e difente de  nulo 
    if(id != undefined){

        if(!isNaN(id)){

            Category.destroy({
                    where: {
                        id:id
                    }
            }).then(()=>{
                res.redirect("/admin/categories");
            });


        }else{ // se o id não for um numero é redirecionado para pagina de listagem de   categorias
            res.redirect("/admin/categories");
        }

    }else{ // se o ider for nulo, e redirecionado para pagina  de listagem de categorias 
        res.redirect("/admin/categories");
    }
});
// rota de edição de categorias
 router.get("/admin/categories/edit/:id",(req,res)=>{

    var id= req.params.id;
      //  metedo especifico para pesquisar uma categoria pelo id dela 

    // Verificando se o id não é um numero 
    if(isNaN(id)){
        res.redirect("/admin/categorties"); 
    }


    Category.findByPk(id).then(categoria =>{
        if(categoria != undefined){

            res.render("admin/categories/edit",{categoria:categoria});

        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro=>{
        res.redirect("/admin/categories");
    })
 });
//  criando rota para editar dados da categoria 
 router.post("categories/upate",(req,res)=>{
     var id = req.body.id;
     var title= req.body.title;

    //  atualizando dados com sequelize
    Category.update({title:title,slug:slugify(title)},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/admin/categories");  
    })

 });
module.exports = router; 