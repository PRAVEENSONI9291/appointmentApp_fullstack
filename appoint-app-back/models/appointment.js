const Sequelize= require('sequelize');

const sequelize= require('../database');

const Appointment= sequelize.define('appointments',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allwNull: false,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type:Sequelize.STRING,
        allowNull: false
    }
});

module.exports= Appointment;