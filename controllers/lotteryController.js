const lottoryController = require('../models/tableLotteryController')
const lotterySix = require('../models/tableLotterySix')
const lottoryThreeF = require('../models/tableLotteryThreeF')
const lottoryThreeB = require('../models/tableLotteryThreeB')
const lotteryTwo = require('../models/tableLotteryTwo')
const user = require('../models/tableUser')


exports.test = async(req,res)=>{
    let roundID = req.body.round_id.toUpperCase();
    try {
        var test = await lotterySix.findAll({
            where:{
                round_id:roundID
            }
        });
        for (let i = 0; i < test.length; i++) {
            console.log(i +' '+ test[i].ID);
            
        }
        res.json({
            message:test
        })
    } catch (error) {
        res.json({
            message:'err',
            error:error
        })
    }
}

exports.openLotteryByRoundID = async(req,res) =>{
    let roundID = req.body.round_id.toUpperCase();
    try {
        let data = await lottoryController.findOne({
            where:{
                round_id:roundID
            }
        });
        if (data) {
            if (data.ticket_status == 0) {
                res.json({
                    message:`Lottery round ${roundID} already open.`
                })
            }
            else{
                res.json({
                    message:`Lottery round ${roundID} already close.`
                })
            }
        }else{
            let datastage = await lottoryController.findOne({
                where:{
                    ticket_status:0
                }
            });
            if (datastage) {
                res.json({
                    message:`The current lottery has not closed`
                })
            }else{
                await lottoryController.create({round_id:roundID})
                res.json({
                    message:`Open lottery ${roundID} success`
                })
            }
        }
        
    } catch (error) {
        res.json({
            message:'missing',
            error:error
        })
    }
}

exports.checkLotteryOpen = async(req,res) =>{
    try {
        let datastage = await lottoryController.findOne({
            where:{
                ticket_status:0
            }
        });
        if (datastage) {
            res.json({
                message:`The lottery round ${datastage.round_id} is opening`
            })
        }else{
            res.json({
                message:`The lottery is closed`
            })
        }
    } catch (error) {
        res.json({
            message:'missing',
            error:error
        })
    }
  
}

exports.buyLottery = async(req,res) =>{

    //let ownerUsername = req.body.owner_username;
    let token = req.body.token
    let pickType = req.body.pick_type;
    let pickNumber = req.body.pick_number;
    let betAmount = req.body.bet_amount;
    //console.log(req.body);

    try {
        var lottoController = await lottoryController.findOne({
            where:{
                round_status:0
            }
        });
        var countUserAllRound = lottoController.count_user_all_round
        var countMoneyProfit = lottoController.count_money_profit
        countUserAllRound = countUserAllRound + 1
        countMoneyProfit = countMoneyProfit + betAmount

        var roundID = lottoController.round_id;
        var datauser = await user.findOne({
            where:{
                secretKey:token
            }
        });
        var ownerUsername = datauser.user_username
    } catch (error) {
        res.json({
            message:`The lottery is closed`,
            error:error
        })
    }
    try {
        
    } catch (error) {
        
    }
    //เช็คหวย ยังเปิดอยู่หรือป่าว
    if (lottoController) {
        //เช็คมี user 
        if (datauser) {
            var wallet = datauser.user_wallet - betAmount
            //ซื้อหวย 6 ตัว
            if (pickType == 'six') {
                if (datauser.user_wallet >= betAmount) {
                    try {
                        await datauser.update({
                            user_wallet:wallet
                        });
                        await lotterySix.create({
                            owner_username : ownerUsername,
                            pick_number : pickNumber,
                            bet_amount : betAmount,
                            round_id : roundID
                        });
                        await lottoController.update({
                            count_user_all_round:countUserAllRound,
                            count_money_profit:countMoneyProfit
                        });
                        res.json({
                            message:`Buy six lottery number round ${roundID} success`
                        })
                    } catch (error) {
                        res.json({
                            message:'Error from six number',
                            error:error
                        })
                    }
    
                    
                }else{
                    res.json({
                        message:'Insufficient balance in the wallet!'
                    })
                }
            }
            //ซื้อหวย 3 ตัวบน
            else if (pickType == 'three_f') {
                if (datauser.user_wallet >= betAmount) {
                    var wallet = datauser.user_wallet - betAmount
                    try {
                        await datauser.update({
                            user_wallet:wallet
                        });
                        await lottoryThreeF.create({
                            owner_username : ownerUsername,
                            pick_number : pickNumber,
                            bet_amount : betAmount,
                            round_id : roundID
                        });
                        await lottoController.update({
                            count_user_all_round:countUserAllRound,
                            count_money_profit:countMoneyProfit
                        });
                        res.json({
                            message:`Buy three_f lottery number round ${roundID} success`
                        })
                    } catch (error) {
                        res.json({
                            message:'Error from three_f number',
                            error:error
                        })
                    }
                    
                }else{
                    res.json({
                        message:'Insufficient balance in the wallet!'
                    })
                }
                
            }
            //ซื้อหวย 3 ตัวล่าง
            else if (pickType == 'three_b') {
                if (datauser.user_wallet >= betAmount) {
                    var wallet = datauser.user_wallet - betAmount
                    try {
                        await datauser.update({
                            user_wallet:wallet
                        });
                        await lottoryThreeB.create({
                            owner_username : ownerUsername,
                            pick_number : pickNumber,
                            bet_amount : betAmount,
                            round_id : roundID
                        });
                        await lottoController.update({
                            count_user_all_round:countUserAllRound,
                            count_money_profit:countMoneyProfit
                        });
                        res.json({
                            message:`Buy three_b lottery number round ${roundID} success`
                        })
                    } catch (error) {
                        res.json({
                            message:'Error from three_b number',
                            error:error
                        })
                    }
                    
                }else{
                    res.json({
                        message:'Insufficient balance in the wallet!'
                    })
                }
                
            }
            //ซื้อหวย 2 ตัว
            else if (pickType == 'two') {
                if (datauser.user_wallet >= betAmount) {
                    var wallet = datauser.user_wallet - betAmount
                    try {
                        await datauser.update({
                            user_wallet:wallet
                        });
                        await lotteryTwo.create({
                            owner_username : ownerUsername,
                            pick_number : pickNumber,
                            bet_amount : betAmount,
                            round_id : roundID
                        });
                        await lottoController.update({
                            count_user_all_round:countUserAllRound,
                            count_money_profit:countMoneyProfit
                        });
                        res.json({
                            message:`Buy two lottery number round ${roundID} success`
                        })
                    } catch (error) {
                        res.json({
                            message:'Error from two number',
                            error:error
                        })
                    }
                    
                }else{
                    res.json({
                        message:'Insufficient balance in the wallet!'
                    })
                }
                
            }
            else{
                res.json({
                    message:'Please select type lottory number'
                })
            }
        } 
        else {
            res.status(404).json({
                message:`Not found user ${ownerUsername}`
            })
        } 
    }

}

exports.checkLottery = async(req,res) =>{
    let name = req.body.owner_username;
    try {
        var datauser = await user.findOne({
            where:{
                user_username:name
            }
        });
    } catch (error) {
        res.json({
            message:`missing find ${name}`,
            error:error
        })
    }
    if (datauser) {
        try {
            var lottoControll = await lottoryController.findOne({
                order: [["round_id", "DESC"]]
            });
            var roundID = lottoControll.round_id

            var lottoSix = await lotterySix.findAll({
                where:{
                    owner_username:name,
                    round_id:roundID
                }
            });
            var lottoThreeF = await lottoryThreeF.findAll({
                where:{
                    owner_username:name,
                    round_id:roundID
                }
            });
            var lottoThreeB = await lottoryThreeB.findAll({
                where:{
                    owner_username:name,
                    round_id:roundID
                }
            });
            var lottoTwo = await lotteryTwo.findAll({
                where:{
                    owner_username:name,
                    round_id:roundID
                }
            });

            res.json({
                lottorySixNumber:lottoSix,
                lottoryThreeFnumber:lottoThreeF,
                lottoryThreeBnumber:lottoThreeB,
                lottoryTwoNumber:lottoTwo,
                message:'success'
            })
       } catch (error) {
        res.json({
            message:`missing check lottory`,
            error:error
        })
       }
    }
    else{
        res.status(404).json({
            message:`Not found user ${name}`
        })
    }
  
}

exports.sendResultLottery = async(req,res)=>{
    let roundID = req.body.round_id.toUpperCase();
    let resultLotterySix = req.body.result_number_six;
    let resultLottery3f = req.body.result_number_3front;
    let resultLottery3b = req.body.result_number_3back;
    let resultLottery2b = req.body.result_number_2back;
    let pickOdds3f = req.body.pickOdds_number_3front;
    let pickOdds3b = req.body.pickOdds_number_3back;
    let pickOdds2b = req.body.pickOdds_number_2back;
    let stage = 1;
    
    try {
        var lottoControll = await lottoryController.findOne({
            where:{
                round_id:roundID
            }
        });
        var lottoSix = await lotterySix.findAll({
            where:{
                round_id:roundID
            }
        });
        var lottoThreeF = await lottoryThreeF.findAll({
            where:{
                round_id:roundID
            }
        });
        var lottoThreeB = await lottoryThreeB.findAll({
            where:{
                round_id:roundID
            }
        });
        var lottoTwo = await lotteryTwo.findAll({
            where:{
                round_id:roundID
            }
        });
    } catch (error) {
        res.json({
            message:`missing find err`,
            error:error
        })
    }

    if (lottoControll) {
        if (lottoControll.round_status == 0) {
            try {
                await lottoControll.update({
                    round_status:stage,
                    result_number_six:resultLotterySix,
                    result_number_3front:resultLottery3f,
                    result_number_3back:resultLottery3b,
                    result_number_2back:resultLottery2b,
                    pickOdds_number_3front:pickOdds3f,
                    pickOdds_number_3back:pickOdds3b,
                    pickOdds_number_2back:pickOdds2b
                });
                if (lottoSix) {
                    for (let i = 0; i < lottoSix.length; i++) {
                        await lottoSix[i].update({
                            round_status:stage,
                            result_number:resultLotterySix
                        });
                    }
                } else {}
                if (lottoThreeF) {
                    for (let i = 0; i < lottoThreeF.length; i++) {
                        await lottoThreeF[i].update({
                            round_status:stage,
                            result_number:resultLottery3f,
                            pick_odds:pickOdds3f
                        });
                    }
                } else {}
                if (lottoThreeB) {
                    for (let i = 0; i < lottoThreeB.length; i++) {
                        await lottoThreeB[i].update({
                            round_status:stage,
                            result_number:resultLottery3b,
                            pick_odds:pickOdds3b
                        });
                    }
                } else {}
                if (lottoTwo) {
                    for (let i = 0; i < lottoTwo.length; i++) {
                        await lottoTwo[i].update({
                            round_status:stage,
                            result_number:resultLottery2b,
                            pick_odds:pickOdds2b
                        });
                    }
                } else {}
                res.json({
                    message:`Lottery round ${roundID} Result Is Out `
                })
            } catch (error) {
                res.json({
                    message:'update error Result Is Out',
                    error:error
                })
            }
        }else{
            res.json({
                message:`The lottery round ${roundID} is closed`
            })
        }
       
    } else {
        res.status(404).json({
            message:`Not found lottery round ${roundID} `
        })
    }


}

exports.closeBillLotteryByRoundeID = async(req,res)=>{
    let roundID = req.body.round_id.toUpperCase();
    let stage = 1

    try {
        var lottoControll = await lottoryController.findOne({
            where:{
                round_id:roundID
            }
        });
        var lottoSix = await lotterySix.findAll({
            where:{
                round_id:roundID
            }
        });
        var lottoThreeF = await lottoryThreeF.findAll({
            where:{
                round_id:roundID
            }
        });
        var lottoThreeB = await lottoryThreeB.findAll({
            where:{
                round_id:roundID
            }
        });
        var lottoTwo = await lotteryTwo.findAll({
            where:{
                round_id:roundID
            }
        });
    } catch (error) {
        res.json({
            message:`missing find err`,
            error:error
        })
    }
  
    async function closeBillSixNumber() {
        var countUserWin = 0
        var countUserLoss = 0
        var finalReward = 0
        var sixdigit_six = 6000000
        if (lottoSix) {
            for (let i = 0; i < lottoSix.length; i++) {
                if (lottoSix[i].pick_number == lottoSix[i].result_number) {
                    var reward = sixdigit_six * lottoSix[i].pick_odds
                    countUserWin ++
                    finalReward = finalReward + reward
                }
                else{
                    var reward = 0;
                    countUserLoss ++
                    finalReward = finalReward + reward
                }
                try {
                    await lottoSix[i].update({
                    ticket_status:stage,
                    winning_amount:reward
                });
                } catch (error) {
                    res.json({
                        message:'err update six',
                        error:error
                    })
                }
            }
            try {
                var countWin = lottoControll.count_user_win
                var countLose = lottoControll.count_user_lose
                var countPayMoney = lottoControll.count_pay_money
                countWin = countWin + countUserWin
                countLose = countLose + countUserLoss
                countPayMoney = countPayMoney + finalReward

                await lottoControll.update({
                    count_user_win:countWin,
                    count_user_lose:countLose,
                    count_pay_money:countPayMoney
                });
            } catch (error) {
                res.json({
                    message:'err update six controll',
                    error:error
                })
            }
        } else {}

    }

    async function closeBliiThreeFNumber() {
        var countUserWin = 0
        var countUserWinTot = 0
        var countUserLoss = 0
        var finalReward = 0
        var pickNumber = 0
        var resultNumber = 0

        if (lottoThreeF) {
            for (let i = 0; i < lottoThreeF.length; i++) {
                if (lottoThreeF[i].pick_number == lottoThreeF[i].result_number) {
                    var reward = lottoThreeF[i].bet_amount * lottoThreeF[i].pick_odds
                    countUserWin ++
                    countUserWinTot++
                    var tot = (lottoThreeF[i].pick_odds / 2) * lottoThreeF[i].bet_amount
                    finalReward = finalReward + reward + tot
                }
                else{
                    var reward = 0;
                    pickNumber = lottoThreeF[i].pick_number
                    resultNumber = lottoThreeF[i].result_number
                    const areAnagram = (data1, data2) => data1.toLowerCase().split('').sort().join('') === data2.toLowerCase().split('').sort().join('');
                    if (areAnagram(pickNumber,resultNumber) == true) {
                        countUserWinTot++
                        var tot = (lottoThreeF[i].pick_odds / 2) * lottoThreeF[i].bet_amount
                        finalReward = finalReward + reward + tot
                    }
                    else{
                        var tot = 0
                        finalReward = finalReward + reward
                        countUserLoss ++
                    } 
                }
                try {
                    await lottoThreeF[i].update({
                    ticket_status:stage,
                    winning_amount:reward,
                    winning_tot_amount:tot
                });
                } catch (error) {
                    res.json({
                        message:'err update threeF',
                        error:error
                    })
                }
            }
            try {
                var countWin = lottoControll.count_user_win
                var countLose = lottoControll.count_user_lose
                var countPayMoney = lottoControll.count_pay_money
                var countWinTot = lottoControll.count_user_win_tot
                countWin = countWin + countUserWin
                countWinTot = countWinTot + countUserWinTot
                countLose = countLose + countUserLoss
                countPayMoney = countPayMoney + finalReward

                await lottoControll.update({
                    count_user_win:countWin,
                    count_user_win_tot:countWinTot,
                    count_user_lose:countLose,
                    count_pay_money:countPayMoney
                });
            } catch (error) {
                res.json({
                    message:'err update threeF controll',
                    error:error
                })
            }
            
        } else {}
    }
    
    async function closeBliiThreeBNumber(){
        var countUserWin = 0
        var countUserWinTot = 0
        var countUserLoss = 0
        var finalReward = 0
        var pickNumber = 0
        var resultNumber = 0

        if (lottoThreeB) {
            for (let i = 0; i < lottoThreeB.length; i++) {
                if (lottoThreeB[i].pick_number == lottoThreeB[i].result_number) {
                    var reward = lottoThreeB[i].bet_amount * lottoThreeB[i].pick_odds
                    countUserWin ++
                    countUserWinTot++
                    var tot = (lottoThreeB[i].pick_odds / 2) * lottoThreeB[i].bet_amount
                    finalReward = finalReward + reward + tot
                }
                else{
                    var reward = 0;
                    pickNumber = lottoThreeB[i].pick_number
                    resultNumber = lottoThreeB[i].result_number
                    const areAnagram = (data1, data2) => data1.toLowerCase().split('').sort().join('') === data2.toLowerCase().split('').sort().join('');
                    if (areAnagram(pickNumber,resultNumber) == true) {
                        countUserWinTot++
                        var tot = (lottoThreeB[i].pick_odds / 2) * lottoThreeB[i].bet_amount
                        finalReward = finalReward + reward + tot
                    }
                    else{
                        var tot = 0
                        finalReward = finalReward + reward
                        countUserLoss ++
                    } 
                }
                try {
                    await lottoThreeB[i].update({
                    ticket_status:stage,
                    winning_amount:reward,
                    winning_tot_amount:tot
                });
                } catch (error) {
                    res.json({
                        message:'err update threeB',
                        error:error
                    })
                }
            }
            try {
                var countWin = lottoControll.count_user_win
                var countLose = lottoControll.count_user_lose
                var countPayMoney = lottoControll.count_pay_money
                var countWinTot = lottoControll.count_user_win_tot
                countWin = countWin + countUserWin
                countWinTot = countWinTot + countUserWinTot
                countLose = countLose + countUserLoss
                countPayMoney = countPayMoney + finalReward

                await lottoControll.update({
                    count_user_win:countWin,
                    count_user_win_tot:countWinTot,
                    count_user_lose:countLose,
                    count_pay_money:countPayMoney
                });
            } catch (error) {
                res.json({
                    message:'err update threeB controll',
                    error:error
                })
            }
            
        } else {}
    }

    async function closeBliiTwoNumber(){
        var countUserWin = 0
        var countUserLoss = 0
        var finalReward = 0
    
        if (lottoTwo) {
            for (let i = 0; i < lottoTwo.length; i++) {
                if (lottoTwo[i].pick_number == lottoTwo[i].result_number) {
                    var reward = lottoTwo[i].bet_amount * lottoTwo[i].pick_odds
                    countUserWin ++
                    finalReward = finalReward + reward
                }
                else{
                    var reward = 0;
                    countUserLoss ++
                    finalReward = finalReward + reward
                }
                try {
                    await lottoTwo[i].update({
                    ticket_status:stage,
                    winning_amount:reward
                });
                } catch (error) {
                    res.json({
                        message:'err update two',
                        error:error
                    })
                }
            }
            try {
                var countWin = lottoControll.count_user_win
                var countLose = lottoControll.count_user_lose
                var countPayMoney = lottoControll.count_pay_money
                countWin = countWin + countUserWin
                countLose = countLose + countUserLoss
                countPayMoney = countPayMoney + finalReward

                await lottoControll.update({
                    count_user_win:countWin,
                    count_user_lose:countLose,
                    count_pay_money:countPayMoney
                });
            } catch (error) {
                res.json({
                    message:'err update two controll',
                    error:error
                })
            }
        } else {}

    }
  

    if (lottoControll) {
        if (lottoControll.round_status == 1) {
            if (lottoControll.ticket_status == 0) {
                await closeBillSixNumber()
                await closeBliiThreeFNumber()
                await closeBliiThreeBNumber()
                await closeBliiTwoNumber()
                await lottoControll.update({
                    ticket_status:'1'
                });
                res.json({
                    message:`Close bill lottery round ${roundID} successfully`,
                    roundID:roundID,
                    lottory:lottoControll
                })
            } else {
                res.json({
                    message:`The lottery round ${roundID} has been closed`
                })
            }
        } else {
            res.json({
                message:`Can't close bill ${roundID} because Lottery results are not out yet`
            })
        }
       
    } else {
        res.status(404).json({
            message:`Not found lottery round ${roundID}`
        })
    }

}

exports.checkLotteryResultByRound = async(req,res) =>{
    let roundID = req.body.round_id.toUpperCase();
    let SelectType = req.body.select_type;

    var winSix = []
    var loseSix = []
    var countWinSix = 0
    var countLoseSix = 0

    var winThreeF = []
    var loseThreeF = []
    var countWinThreeF = 0
    var countLoseThreeF = 0
    var winTotThreeF = []
    var countWinThreeFTot = 0

    var winThreeB = []
    var loseThreeB = []
    var countWinThreeB = 0
    var countLoseThreeB = 0
    var winTotThreeB = []
    var countWinThreeBTot = 0

    var winTwo = []
    var loseTwo = []
    var countWinTwo = 0
    var countLoseTWo = 0

    try {
        var lottoControll = await lottoryController.findOne({
            where:{
                round_id:roundID
            }
        });
        var lottoSix = await lotterySix.findAll({
            where:{
                round_id:roundID
            }
        });
        var lottoThreeF = await lottoryThreeF.findAll({
            where:{
                round_id:roundID
            }
        });
        var lottoThreeB = await lottoryThreeB.findAll({
            where:{
                round_id:roundID
            }
        });
        var lottoTwo = await lotteryTwo.findAll({
            where:{
                round_id:roundID
            }
        });
    } catch (error) {
        res.json({
            message:'err find controller',
            error:error
        })
    }

    if (lottoControll) {
        if (lottoControll.ticket_status == 1) {
            if (SelectType == 'all') {
                res.json({
                    roundID:roundID,
                    lottorySummary:lottoControll,
                    lottorySix:lottoSix,
                    lottoryThreeFront:lottoThreeF,
                    lottoryThreeBack:lottoThreeB,
                    lottoryTwo:lottoTwo
                })
            }
            else if(SelectType == 'summary'){
                res.json({
                    roundID:roundID,
                    lottorySummary:lottoControll
                })
            }
            else if(SelectType == 'six'){
                for (let i = 0; i < lottoSix.length; i++) {
                    if (lottoSix[i].winning_amount > 0) {
                        winSix.push(lottoSix[i])
                        countWinSix ++ 
                    }else{
                        loseSix.push(lottoSix[i])
                        countLoseSix ++
                    }
                }
                res.json({
                    roundID:roundID,
                    allUser:lottoSix.length,
                    win:countWinSix,
                    lose:countLoseSix,
                    userWin:winSix,
                    userLose:loseSix
                })
            }
            else if(SelectType == 'three_f'){
                for (let i = 0; i < lottoThreeF.length; i++) {
                    if (lottoThreeF[i].winning_amount > 0) {
                        winThreeF.push(lottoThreeF[i])
                        countWinThreeF ++ 
                    }
                    if(lottoThreeF[i].winning_tot_amount > 0){
                        winTotThreeF.push(lottoThreeF[i])
                        countWinThreeFTot ++
                    }else{
                        loseThreeF.push(lottoThreeF[i])
                        countLoseThreeF ++
                    }
                }
                res.json({
                    roundID:roundID,
                    allUser:lottoThreeF.length,
                    win:countWinThreeF,
                    winTot:countWinThreeFTot,
                    lose:countLoseThreeF,
                    userWin:winThreeF,
                    userWinTot:winTotThreeF,
                    userLose:loseThreeF
                })
            }
            else if(SelectType == 'three_b'){
                for (let i = 0; i < lottoThreeB.length; i++) {
                    if (lottoThreeB[i].winning_amount > 0) {
                        winThreeB.push(lottoThreeB[i])
                        countWinThreeB ++ 
                    }
                    if(lottoThreeB[i].winning_tot_amount > 0){
                        winTotThreeB.push(lottoThreeB[i])
                        countWinThreeBTot ++
                    }else{
                        loseThreeB.push(lottoThreeB[i])
                        countLoseThreeB ++
                    }
                }
                res.json({
                    roundID:roundID,
                    allUser:lottoThreeB.length,
                    win:countWinThreeB,
                    winTot:countWinThreeBTot,
                    lose:countLoseThreeB,
                    userWin:winThreeB,
                    userWinTot:winTotThreeB,
                    userLose:loseThreeB
                })
            }
            else if(SelectType == 'two'){
                for (let i = 0; i < lottoTwo.length; i++) {
                    if (lottoTwo[i].winning_amount > 0) {
                        winTwo.push(lottoTwo[i])
                        countWinTwo ++ 
                    }else{
                        loseTwo.push(lottoTwo[i])
                        countLoseTWo ++
                    }
                }
                res.json({
                    roundID:roundID,
                    allUser:lottoTwo.length,
                    win:countWinTwo,
                    lose:countLoseTWo,
                    userWin:winTwo,
                    userLose:loseTwo
                })
            }
            else{
                res.json({
                    message:'Please select type'
                })
            }
            
        }else{
            res.json({
                message:`The lottery round ${roundID} process is not finished`
            })
        }
    }else{
        res.status(404).json({
            message:`Not found lottery round ${roundID} `
        })
    }

}

exports.sendCookie = async(req,res) =>{
    //cookie
    // res.cookie('gg','osas')
    // res.cookie('login',true,{maxAge:3000})
    // res.json({
    //     message:'create cookie sucess'
    // })

    //session
    req.session.gg = 'osas'
    req.session.login = true
    req.session.cookie.maxAge = 10000
    res.json({
        message:'create session sucess'
    })

}
exports.testCookie = async(req,res) =>{
    //cookie
    // if (req.cookies.login) {
    //     res.json({
    //         message:'this cookie',
    //         cookie:req.cookies.gg
    //     })
    // } else {
    //     res.clearCookie('gg')
    //     res.json({
    //         message:'time out',
    //         cookie:req.cookies.gg
    //     })      
    // }
   
    //session
    if (req.session.login) {
        res.json({
            sessionID:req.sessionID,
            session:req.session,
            status:'login'
        })
    } else {
        res.json({
            sessionID:req.sessionID,
            session:req.session,
            status:'time out'
        })

    }
}

exports.destroySession = (req,res) =>{
    req.session.destroy((err) =>{
        res.json({
            message:'log out',
            sessionID:req.sessionID,
            session:req.session,
            status:'expries'
        })
    })
}

/*
exports.test = async (req,res) =>{
    try {
        let test = await lottorythreeB.findAll({
       
        });
        await test[0].update({
            round_id:'777'
        });
        res.json({
            data:test,
            message:'success',
        })
    
    } catch (error) {
        res.json({
            message:'error',
            error:error
        })
    }

     try{
        let newData = {
            owner_username : req.body.owner_username,
            bet_amount : req.body.bet_amount,
            pick_number : req.body.pick_number,
            round_id : req.body.round_id,
        };
        await lottorythreeB.create(newData);
        res.json({
            dataUpdate: newData,
            message: "create data success",
        });
    }
    catch (err) {
        let newData = {
            owner_username : req.body.owner_username,
            bet_amount : req.body.bet_amount,
            pick_number : req.body.pick_number,
            round_id : req.body.round_id,
        };
        res.json({
            errData: newData,
            err: "err|" + err,
            status: false,
            message: "missing data success",
        });
    }
}*/