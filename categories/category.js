// importando sequelize
const Sequelize = require("sequelize");
const connection = require("../database/database");

// criando tabela no banco de dados relacionada ao model
const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull:false
    },slug:{
        type:Sequelize.STRING,
        allowNull:false
    }
});




 module.exports = Category;