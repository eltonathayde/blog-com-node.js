// arquivos ralacionados a banco de dados ficam nessa pasta database

// importando o sequelize
const Sequelize = require("sequelize");
//  criando objeto de connection
const connection = new Sequelize('blogelton','root','1436J7ton@',{
    host:'localhost',
    dialect:'mysql',
    timezone: "-03:00", 
    
    // para tiar a msg Executing (default): SELECT 1+1 AS result do terminal
    logging: false

});

module.exports = connection

