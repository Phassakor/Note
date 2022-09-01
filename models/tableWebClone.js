const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'webclone',
    {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        mobilephone: {
            type: Sequelize.STRING
        },
        date_of_birth: {
            type: Sequelize.STRING
        },
        bank: {
            type: Sequelize.STRING
        },
        bank_account_number: {
            type: Sequelize.STRING
        },
        code_name_team: {
            type: Sequelize.STRING
        },
        line_OA: {
            type: Sequelize.STRING
        },
        reward_All: {
            type: Sequelize.DOUBLE
        },
        reward_today: {
            type: Sequelize.DOUBLE
        },
        profit_all: {
            type: Sequelize.DOUBLE
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