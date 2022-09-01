// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'test'
// });


// module.exports = connection

const Sequelize = require('sequelize')
const mysql2 = require('mysql2')
const db = {}
// const sequelize = new Sequelize('n8th', 'root', '', {
//const sequelize = new Sequelize('main_', 'root', '',{
const sequelize = new Sequelize('test','root', '',{
  // host: '35.197.155.9',
  logging: false,
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: mysql2,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: "+07:00", //for writing to database
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db