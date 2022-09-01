const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'controller_lottery_ticket',
    {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        result_number_six: {
            type: Sequelize.STRING
        },
        result_number_3front: {
            type: Sequelize.STRING
        },
        result_number_3back: {
            type: Sequelize.STRING
        },
        result_number_2back: {
            type: Sequelize.STRING
        },
        pickOdds_number_3front: {
            type: Sequelize.DOUBLE
        },
        pickOdds_number_3back: {
            type: Sequelize.DOUBLE
        },
        pickOdds_number_2back: {
            type: Sequelize.DOUBLE
        },
        count_user_all_round: {
            type: Sequelize.DOUBLE
        },
        count_user_win: {
            type: Sequelize.DOUBLE
        },
        count_user_win_tot: {
            type: Sequelize.DOUBLE
        },
        count_user_lose: {
            type: Sequelize.DOUBLE
        },
        count_pay_money: {
            type: Sequelize.DOUBLE
        },
        count_money_profit: {
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