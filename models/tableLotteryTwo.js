const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'table_lottery_two_ticket',
    {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        owner_username: {
            type: Sequelize.STRING
        },
        bet_amount: {
            type: Sequelize.DOUBLE
        },
        pick_number: {
            type: Sequelize.STRING
        },
        pick_odds: {
            type: Sequelize.DOUBLE
        },
        result_number: {
            type: Sequelize.STRING
        },
        round_id: {
            type: Sequelize.STRING
        },
        round_status: {
            type: Sequelize.STRING
        },
        ticket_status: {
            type: Sequelize.STRING
        },
        winning_amount: {
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