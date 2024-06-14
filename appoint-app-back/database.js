const Sequelize= require('sequelize');

const sequelize= new Sequelize('appointments_db', 'root', 'Helloworld1*',{
    dialect:'mysql',
    host:'localhost'
});


module.exports= sequelize;