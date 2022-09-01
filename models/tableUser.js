const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'user',
    {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_username: {
            type: Sequelize.STRING
        },
        user_password: {
            type: Sequelize.STRING
        },
        user_phone: {
            type: Sequelize.STRING
        },
        user_email: {
            type: Sequelize.STRING
        },
        user_wallet: {
            type: Sequelize.DOUBLE
        },
        user_firstname: {
            type: Sequelize.STRING
        },
        user_lastname: {
            type: Sequelize.STRING
        },
        user_account_number: {
            type: Sequelize.STRING
        },
        user_bank: {
            type: Sequelize.STRING
        },
        user_status: {
            type: Sequelize.STRING
        },
        update_status: {
            type: Sequelize.STRING
        },
        secretKey: {
            type: Sequelize.STRING
        },
        update_timestamp: {
            type: Sequelize.DATE
        },
        created_timestamp: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)