// conexão com sequelize
const Sequelize = require("sequelize");
// conexão com banco de dados
const connection = require('../database/database');
// importando o model que eu quero me relacionar
const Category = require('../categories/Category');

// crinado tabela com bando de dados relacionada ao model ]
const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull:false
    },slug:{
        type:Sequelize.STRING,
        allowNull:false
    },body:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});
// criando relacionamento 1/N
Category.hasMany(Article);
// relacionamento 1 /1 
Article.belongsTo(Category);    

// criando o relacionamento no banco de dados





 module.exports = Article;