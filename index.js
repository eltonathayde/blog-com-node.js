//  carrengando o modulo do express
const express = require("express");
//  criando instacia do express
const app = express();
// importando body-parse
const bodyParser = require("body-parser");
// carregando a conexão 
const connection = require("./database/database")
// carregando o arquivo de categories
const categoreisController =require("./categories/categoreisCrontroller")
// carregando o arquivo  de artigos
const articlesController = require("./artigos/articlesController")

// configurar a view engine, para exibição de html
app.set("view engine","ejs");

// arquivos staic
app.use(express.static('public'));

// body-parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// Database connection
try {
    connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


// usando os controllers
  app.use("/",categoreisController);
  app.use("/",articlesController)


//  criando rota principal, sempre req/res
app.get("/",(req,res)=> {
    res.render("index"); //para renderizar as views precisa ser res.render e o nome da view
});

// porta que vai iniciar o projeto  efunçãod e call back
app.listen(8080,()=>{
    console.log("o servido esta rodando")
})