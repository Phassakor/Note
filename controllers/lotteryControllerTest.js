//const db = require('../database/db');
const butLotterySix = require('../models/tableLotterySix')

/*
exports.getTableLottery = (req,res) =>{
    db.query("SELECT * FROM table_lottery", function (err, result, fields) {
       
       let message = "";
       if (result === undefined || result.length == 0) {
           message = 'User table is empty';
       }
       else{
           message = "Successfully retrieved all User";
       }
       return res.send({error:false,data:result,message:message});
    })
}

exports.buyLottery = (req,res) =>{
    let ownerUsername = req.body.owner_username;
    let betAmount = req.body.bet_amount;
    let pickNumber = req.body.pick_number;
    let roundID = req.body.round_id;
    let status = 1
    db.query("SELECT * FROM table_lottery WHERE round_id = '"+ roundID +"'  AND round_status = '"+ status +"' ", function(err, result, field){
        if (result.length > 0) {
            res.send({message:`Time to buy lottery tickets ${roundID} is over.`})
        }
        else{
            db.query(`SELECT user_username, user_wallet FROM persons WHERE user_username = '${ownerUsername}'`, function(err, result, field){
                if (result.length == 0) {
                    res.send({message:'Not found user or something wrong'});
                }
                else{
                    if (result[0].user_wallet >= betAmount) {
                        var wallet = result[0].user_wallet - betAmount
                        db.query("UPDATE persons SET user_wallet=? WHERE user_username = '"+ ownerUsername +"'",
                        [wallet],(error, results, fields) => {
                            if (error) throw error;
                        }) 
                        db.query(`INSERT INTO table_lottery (owner_username, bet_amount, pick_number,round_id) VALUES(?,?,?,?)`,
                        [ownerUsername,betAmount,pickNumber,roundID.toUpperCase()], (error, results, fields) => {
                            if(error){
                                res.status(400).send({message:` Buy lottery Failed Something Wrong`})
                            }
                            else{
                                res.send({message:"Buy lottery success"})
                            }
                        })
                    }
                    else{
                        res.send({message:'Insufficient balance in the wallet!'});
                    } 
                }
            }) 
        }
    })

    
}

exports.checkLottery = (req,res) =>{
    let name = req.body.owner_username;
    db.query("SELECT * FROM table_lottery WHERE owner_username = '"+ name +"'", function(error, results, fields) {
        if (results.length > 0) {
            res.send(results)
            // Object.keys(results).forEach(function(key) {
            //     var row = results[key];	
            //     if (row.result_number == null) {
            //         var result = 'waiting for results'
            //         var description = "waiting for processing"
            //     }
            //     else{
            //         var result = row.result_number
            //         if (row.ticket_status == '0') {
            //             var description = "waiting for processing"
            //         }
            //         else{
            //             if (row.winning_amount > 0) {
            //                 var description = "congratulations"
            //             }
            //             else{
            //                 var description = "good luck next time"
            //             }
            //         }
            //     }
            //     var dataUser = [
            //     {
            //         username: `${row.owner_username}`,
            //         roundID: `${row.round_id}`,
            //         pickNumber: `${row.pick_number}`,
            //         betAmount: `${row.bet_amount}`,
            //         pickOdds: `${row.pick_odds}`,
            //         resultNumber: `${result}`,
            //         reward: `${row.winning_amount}`,
            //         description: `${description}`,
            //     }
            
            // ]
            //     res.send({user:dataUser});
            // });
        } else {
            res.send({message:'Loading Failed Something Wrong '});
        }	
    });
   
}

exports.test = (req,res) =>{


    var str1=req.body.str1
    var str2=req.body.str2
    const areAnagram = (data1, data2) => data1.toLowerCase().split('').sort().join('') === data2.toLowerCase().split('').sort().join('');
    if (areAnagram(str1,str2) == true) {
        var text = " Two string is Anagram";
    }
    else{
        var text = " Two string is Not Anagram";
    }
    
    res.send(areAnagram(str1,str2)+'\n'+text); 
    // console.log(str1.toLowerCase() + ' tolowcasw');
    // console.log(str1.split('') + ' split');
    // console.log(str1.split('').sort() + ' split+sort');
    // console.log(str1.split('').sort().join('') + ' split+sort+join');
    
    var resultNumber = str1.split('')
    var numberFront = []
    var numberBack = []
    var numberBack2 = []
    for (let i = 0; i < resultNumber.length; i++) {
        if (i <= 2) {
            numberFront.push(resultNumber[i])
        }else{
            if (i > 3) {
                numberBack2.push(resultNumber[i])
            }
            numberBack.push(resultNumber[i])
        }
    }

    console.log(numberFront.join(''));
    console.log(numberBack.join(''));
    console.log(numberBack2.join(''));
    var a= '10'
    var b= '1'
    if (a>b) {
        console.log('yyyy');
    }
    else{
        console.log('nnnn');
    }
    
    
    
 
    let roundID = "THAI002";
    let status = 1
    db.query("SELECT * FROM tabel_lottery WHERE round_id = '"+ roundID +"'  AND ticket_status = '"+ status +"' ", function(err, result, field){
        res.send(result)
    })
    db.query("SELECT * FROM tabel_lottery WHERE round_id = ?  AND ticket_status = ? ",[roundID,status], function(err, result, field){
        res.send(result)
    })

    var a='123'
    var b=123
    var c='asdfg'
    var d='Asdfg'
    if (a===b) {
        res.send('yes')
    }
    else{
        res.send('no')
    }
    //https://sysadmin.psu.ac.th/2020/07/12/%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5-json/

}


exports.sendResultLottery = (req,res)=>{
    let roundID = req.body.round_id;
    let resultLottery = req.body.result_number;
    let pickOdds = req.body.pick_odds;
    let stage = 1;
    let status = 1
    db.query("SELECT * FROM table_lottery WHERE round_id = '"+ roundID +"'  AND round_status = '"+ status +"' ", function(err, result, field){
        if (result.length > 0) {
            res.send({message:`Lottery ${roundID} expired`})
        }
        else{
            db.query("UPDATE table_lottery SET pick_odds=?, result_number=?, round_status=? WHERE round_id = '"+ roundID +"'",
            [pickOdds,resultLottery,stage],(error, results, fields) => {
                if (error) throw error;
                let message = ""
                if(results.changedRows === 0){
                    message = "Update Failed Something Wrong or Not Found round_id";
                }
                else{
                    message = "Lottery Result Is Out";
                }
                return res.send({message:message,roundID:roundID});
            })
        }
    })

   
}

exports.closeBillLotteryByRoundeID = (req,res)=>{
    let roundID = req.body.round_id;
    let stage = 1;
    let status = 1
    var message = 'Closed Bill Lottery By RoundID Successfully';
    var countUserWin = 0
    var countUserLoss = 0
    var countUserAllRound = 0
    //เช็คว่า ผลหวยออกหรือยัง
    db.query("SELECT * FROM table_lottery WHERE round_id = '"+ roundID +"'  AND round_status = '"+ status +"' ", function(err, result, field){
        if (result.length > 0) {
            //เช็คว่า ปิดบิลไปแล้วหรือยัง
            db.query("SELECT * FROM table_lottery WHERE round_id = '"+ roundID +"'  AND ticket_status = '"+ status +"' ", function(err, result, field){
                if (result.length > 0) {
                    res.send({message:`Lottery ${roundID} expired`})
                }
                else{
                    db.query("SELECT * FROM table_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                        if (results.length > 0) {
                            for (let i = 0; i < results.length; i++) {
                                if (results[i].pick_number == results[i].result_number) {
                                    var reward = results[i].bet_amount * results[i].pick_odds
                                    countUserWin++
                                }
                                else{
                                    var reward = 0;
                                    countUserLoss++
                                }
                                countUserAllRound++
                                var id = results[i].ID
                                var round_id = results[i].round_id
                            
                                db.query("UPDATE table_lottery SET winning_amount=?,ticket_status=? WHERE ID = '"+ id +"'",
                                [reward,stage],(error, results, fields) => {
                                    if (error) throw error;
                                })
                            
                            }
                            res.send({message:message,roundID:round_id,countUserAllRound:countUserAllRound,
                                CountUserWin:countUserWin,CountUserLoss:countUserLoss})
                            //res.end() //มี return ไม่ต้องมี res.end() 
                        } else {
                            res.send({message:'Loading Failed Something Wrong or Not Found RoundID'});
                        }	
                    });    
                }
            })
        }
        else{
            res.send({message:`Can't close bill ${roundID} because Lottery results are not out yet.`})
        }
    })
}

exports.checkLotteryResultByRound = (req,res) =>{
    let roundID = req.body.round_id;
    let status = 1
    var userWin = []
    var userLoss = []
    var countUserWin = 0
    var countUserLoss = 0
    var countUserAllRound = 0
    db.query("SELECT * FROM table_lottery WHERE round_id = '"+ roundID +"'  AND ticket_status = '"+ status +"' ", function(err, result, field){
        if (result.length > 0) {
            db.query("SELECT * FROM table_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                for (let i = 0; i < results.length; i++) {
                    if (results[i].pick_number == results[i].result_number) {
                        userWin.push(results[i])
                        countUserWin++
                    }
                    else{
                        userLoss.push(results[i])
                        countUserLoss++
                    }
                    countUserAllRound++
                }
                res.send({roundID:roundID,countUserAllRound:countUserAllRound,
                    CountUserWin:countUserWin,CountUserLoss:countUserLoss,UserWin:userWin,UserLoss:userLoss})
            })  
        }
        else{
            res.send({message:`The lottery ${roundID} hasn't been released yet.`})
        }
    })

}
*/

// สถานะที่่บ็อก ที่ไม่ควรซ้ำ
// เวลา คิดบิล คิดไปกี่บิล บอกทุกอย่าง ของบิล ถูกกี่คนใครบ้าง
//การสั่งซื้อ มีเงินพอไหม
//DISTINCT
// arrayJson[{}] and Jsonjson{{}}
/*
Object.keys(result).forEach(function(key) {
	var row = result[key];	
})
a = [
       {aa:'aa'},
       {bb:'bb'}
   ]
b = {
       t:{
           c:'cc',
           d:'dd'
       },
       tt:{
           e:'ee',
           f:'ff'
       }
   }
   console.log(a);
   console.log(a[0]);
   console.log(a[1]);

   console.log(b);
   console.log(b.t);
   console.log(b.tt);
*/


exports.getTableLottery = (req,res) =>{
    //db.query("SELECT * FROM controller_lottery",  (err, result, fields) => {
    db.query("SELECT * FROM controller_lottery", function (err, result, fields) {
       
       let message = "";
       if (result === undefined || result.length == 0) {
           message = 'Lottery table is empty';
       }
       else{
           message = "Successfully retrieved all lottery";
       }
       return res.send({error:false,data:result,message:message});
    })
}


exports.openLotteryByRoundID = (req,res) =>{
    let roundID = req.body.round_id.toUpperCase();
    let stage = 0

    db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"' ", function(err, result, field){
        //เช็คว่ามี roundID หรือ roundID เปิดแล้วหรือยัง
        if (result.length > 0) {
            res.send({message:`Lottery round ${roundID} already open.`})
        }
        else{
            db.query("SELECT * FROM controller_lottery WHERE ticket_status = '"+ stage +"' ", function(err, result, field){
                //เช็คว่า lottery ปัจจุบัน ปิดหรือยัง 
                if (result.length > 0) {
                    res.send({message:`The current lottery has not closed.`})
                }
                else[
                    db.query(`INSERT INTO controller_lottery (round_id) VALUES(?)`,
                    [roundID], (error, results, fields) => {
                        if(error){
                            res.status(400).send({message:` Open lottery Failed Something Wrong`})
                        }
                        else{
                            res.send({message:`Open lottery ${roundID} success`})
                        }
                    })
                ]
            })
       
        }
    })
}

exports.checkLotteryOpen = (req,res) =>{
    let stage = 0
    db.query("SELECT * FROM controller_lottery WHERE round_status = '"+ stage +"' ", function(err, result, field){
        if (result.length > 0) {
            res.send({message:`The lottery round ${result[0].round_id} is opening`})
        }
        else{
            res.send({message:"The lottery is closed"})
        }
    })
}

exports.prepareBuyLottery = (req,res) =>{
    let stage = 0
    db.query("SELECT * FROM controller_lottery WHERE round_status = '"+ stage +"' ", function(err, result, field){
        if (result.length > 0) {
            //res.send(result[0].round_id)
            req.session.RoundID = result[0].round_id
            req.session.ownerUsername = req.body.owner_username;
            req.session.betAmount = req.body.bet_amount;
            req.session.pickNumber = req.body.pick_number;
            req.session.pickType = req.body.pick_type;
            res.redirect('/buyLottery')
        }
        else{
            res.send({message:"The lottery is closed"})
        }
    })
}
/*
exports.buyLottery = (req,res) =>{
    let ownerUsername = req.body.owner_username;
    let betAmount = req.body.bet_amount;
    let pickNumber = req.body.pick_number;
    let roundID = req.body.round_id.toUpperCase();
    let pickType = req.body.pick_type; //six three_f three_b two
    let status = 1
    //เช็คว่ามี roundID หรือป่าว
    db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"' ", function(err, result, field){
        if (result.length > 0) {
            //เช็คว่ามี roundID ปิดเวลาซื้อหรือยัง
            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"' AND round_status = '"+ status +"'  ", function(err, result, field){
                if (result.length > 0) {
                    res.send({message:`Time to buy lottery tickets ${roundID} is over.`})
                }
                else{   
                    //ซื้อ 6 เต็มตัว
                    if (pickType == 'six') {
                        db.query(`SELECT user_username, user_wallet FROM persons WHERE user_username = '${ownerUsername}'`, function(err, result, field){
                            if (result.length == 0) {
                                res.send({message:'Not found user or something wrong'});
                            }
                            else{
                                //เช็คว่ามี wallet พอหรือป่าว
                                if (result[0].user_wallet >= betAmount) {
                                    var wallet = result[0].user_wallet - betAmount
                                    db.query("UPDATE persons SET user_wallet=? WHERE user_username = '"+ ownerUsername +"'",
                                    [wallet],(error, results, fields) => {
                                        if (error) throw error;
                                    }) 
                                    db.query(`INSERT INTO table_lottery_six (owner_username, bet_amount, pick_number,round_id) VALUES(?,?,?,?)`,
                                    [ownerUsername,betAmount,pickNumber,roundID.toUpperCase()], (error, results, fields) => {
                                        if(error){
                                            res.status(400).send({message:` Buy six lottery number Failed Something Wrong`})
                                        }
                                        else{
                                            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                                                if (results.length > 0) {
                                                    var count_user_all_round = results[0].count_user_all_round
                                                    var count_money_profit = results[0].count_money_profit
                                                    count_user_all_round = count_user_all_round + 1
                                                    count_money_profit = count_money_profit + betAmount
                                                    db.query("UPDATE controller_lottery SET count_user_all_round=?,count_money_profit=? WHERE round_id = '"+ roundID +"'",
                                                    [count_user_all_round,count_money_profit],(error, results, fields) => {
                                                        if (error) throw error;
                                                    })
                                                    res.send({message:`Buy six lottery number round ${roundID} success`})        
                                                }
                                            })
                                        }
                                    })
                                }
                                else{
                                    res.send({message:'Insufficient balance in the wallet!'});
                                } 
                            }
                        }) 
                    }
                    //ซื้อ 3 ตัวบน
                    else if (pickType == 'three_f' ) {
                        db.query(`SELECT user_username, user_wallet FROM persons WHERE user_username = '${ownerUsername}'`, function(err, result, field){
                            if (result.length == 0) {
                                res.send({message:'Not found user or something wrong'});
                            }
                            else{
                                if (result[0].user_wallet >= betAmount) {
                                    var wallet = result[0].user_wallet - betAmount
                                    db.query("UPDATE persons SET user_wallet=? WHERE user_username = '"+ ownerUsername +"'",
                                    [wallet],(error, results, fields) => {
                                        if (error) throw error;
                                    }) 
                                    db.query(`INSERT INTO table_lottery_three_f (owner_username, bet_amount, pick_number,round_id) VALUES(?,?,?,?)`,
                                    [ownerUsername,betAmount,pickNumber,roundID.toUpperCase()], (error, results, fields) => {
                                        if(error){
                                            res.status(400).send({message:` Buy three front lottery number Failed Something Wrong`})
                                        }
                                        else{
                                            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                                                if (results.length > 0) {
                                                    var count_user_all_round = results[0].count_user_all_round
                                                    var count_money_profit = results[0].count_money_profit
                                                    count_user_all_round = count_user_all_round + 1
                                                    count_money_profit = count_money_profit + betAmount
                                                    db.query("UPDATE controller_lottery SET count_user_all_round=?,count_money_profit=? WHERE round_id = '"+ roundID +"'",
                                                    [count_user_all_round,count_money_profit],(error, results, fields) => {
                                                        if (error) throw error;
                                                    })
                                                    res.send({message:`Buy three front lottery number round ${roundID} success`})        
                                                }
                                            })
                                        }
                                    })
                                }
                                else{
                                    res.send({message:'Insufficient balance in the wallet!'});
                                } 
                            }
                        }) 
                    }
                    //ซื้อ 3 ตัวล่าง
                    else if (pickType == 'three_b') {
                        db.query(`SELECT user_username, user_wallet FROM persons WHERE user_username = '${ownerUsername}'`, function(err, result, field){
                            if (result.length == 0) {
                                res.send({message:'Not found user or something wrong'});
                            }
                            else{
                                if (result[0].user_wallet >= betAmount) {
                                    var wallet = result[0].user_wallet - betAmount
                                    db.query("UPDATE persons SET user_wallet=? WHERE user_username = '"+ ownerUsername +"'",
                                    [wallet],(error, results, fields) => {
                                        if (error) throw error;
                                    }) 
                                    db.query(`INSERT INTO table_lottery_three_b (owner_username, bet_amount, pick_number,round_id) VALUES(?,?,?,?)`,
                                    [ownerUsername,betAmount,pickNumber,roundID.toUpperCase()], (error, results, fields) => {
                                        if(error){
                                            res.status(400).send({message:` Buy three back lottery number Failed Something Wrong`})
                                        }
                                        else{
                                            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                                                if (results.length > 0) {
                                                    var count_user_all_round = results[0].count_user_all_round
                                                    var count_money_profit = results[0].count_money_profit
                                                    count_user_all_round = count_user_all_round + 1
                                                    count_money_profit = count_money_profit + betAmount
                                                    db.query("UPDATE controller_lottery SET count_user_all_round=?,count_money_profit=? WHERE round_id = '"+ roundID +"'",
                                                    [count_user_all_round,count_money_profit],(error, results, fields) => {
                                                        if (error) throw error;
                                                    })
                                                    res.send({message:`Buy three back lottery number round ${roundID} success`})        
                                                }
                                            })
                                        }
                                    })
                                }
                                else{
                                    res.send({message:'Insufficient balance in the wallet!'});
                                } 
                            }
                        }) 
                    }
                    //ซื้อ 2 ตัวล่าง
                    else if (pickType == 'two') {
                        db.query(`SELECT user_username, user_wallet FROM persons WHERE user_username = '${ownerUsername}'`, function(err, result, field){
                            if (result.length == 0) {
                                res.send({message:'Not found user or something wrong'});
                            }
                            else{
                                if (result[0].user_wallet >= betAmount) {
                                    var wallet = result[0].user_wallet - betAmount
                                    db.query("UPDATE persons SET user_wallet=? WHERE user_username = '"+ ownerUsername +"'",
                                    [wallet],(error, results, fields) => {
                                        if (error) throw error;
                                    }) 
                                    db.query(`INSERT INTO table_lottery_two (owner_username, bet_amount, pick_number,round_id) VALUES(?,?,?,?)`,
                                    [ownerUsername,betAmount,pickNumber,roundID.toUpperCase()], (error, results, fields) => {
                                        if(error){
                                            res.status(400).send({message:` Buy two back lottery number Failed Something Wrong`})
                                        }
                                        else{
                                            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                                                if (results.length > 0) {
                                                    var count_user_all_round = results[0].count_user_all_round
                                                    var count_money_profit = results[0].count_money_profit
                                                    count_user_all_round = count_user_all_round + 1
                                                    count_money_profit = count_money_profit + betAmount
                                                    db.query("UPDATE controller_lottery SET count_user_all_round=?,count_money_profit=? WHERE round_id = '"+ roundID +"'",
                                                    [count_user_all_round,count_money_profit],(error, results, fields) => {
                                                        if (error) throw error;
                                                    })
                                                    res.send({message:`Buy two back lottery number round ${roundID} success`})        
                                                }
                                            })
                                        }
                                    })
                                }
                                else{
                                    res.send({message:'Insufficient balance in the wallet!'});
                                } 
                            }
                        }) 
                    }
                    else{
                        res.send({message:'Please pick type lottery'})
                    }
                }
            })
        }
        else{
            res.send({message:`Not found lottery round ${roundID}`})
        }
    })
}
*/
exports.buyLottery = (req,res) =>{
    let ownerUsername = req.session.ownerUsername
    let betAmount = req.session.betAmount
    let pickNumber = req.session.pickNumber
    let roundID = req.session.RoundID
    let pickType = req.session.pickType
    
    if (pickType == 'six') {
        db.query(`SELECT user_username, user_wallet FROM persons WHERE user_username = '${ownerUsername}'`, function(err, result, field){
            if (result.length == 0) {
                res.send({message:'Not found user or something wrong'});
            }
            else{
                //เช็คว่ามี wallet พอหรือป่าว
                if (result[0].user_wallet >= betAmount) {
                    var wallet = result[0].user_wallet - betAmount
                    db.query("UPDATE persons SET user_wallet=? WHERE user_username = '"+ ownerUsername +"'",
                    [wallet],(error, results, fields) => {
                        if (error) throw error;
                    }) 
                    db.query(`INSERT INTO table_lottery_six (owner_username, bet_amount, pick_number,round_id) VALUES(?,?,?,?)`,
                    [ownerUsername,betAmount,pickNumber,roundID], (error, results, fields) => {
                        if(error){
                            res.status(400).send({message:` Buy six lottery number Failed Something Wrong`})
                        }
                        else{
                            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                                if (results.length > 0) {
                                    var count_user_all_round = results[0].count_user_all_round
                                    var count_money_profit = results[0].count_money_profit
                                    count_user_all_round = count_user_all_round + 1
                                    count_money_profit = count_money_profit + betAmount
                                    db.query("UPDATE controller_lottery SET count_user_all_round=?,count_money_profit=? WHERE round_id = '"+ roundID +"'",
                                    [count_user_all_round,count_money_profit],(error, results, fields) => {
                                        if (error) throw error;
                                    })
                                    res.send({message:`Buy six lottery number round ${roundID} success`})        
                                }
                            })
                        }
                    })
                }
                else{
                    res.send({message:'Insufficient balance in the wallet!'});
                } 
            }
        }) 
    }
    //ซื้อ 3 ตัวบน
    else if (pickType == 'three_f' ) {
        db.query(`SELECT user_username, user_wallet FROM persons WHERE user_username = '${ownerUsername}'`, function(err, result, field){
            if (result.length == 0) {
                res.send({message:'Not found user or something wrong'});
            }
            else{
                if (result[0].user_wallet >= betAmount) {
                    var wallet = result[0].user_wallet - betAmount
                    db.query("UPDATE persons SET user_wallet=? WHERE user_username = '"+ ownerUsername +"'",
                    [wallet],(error, results, fields) => {
                        if (error) throw error;
                    }) 
                    db.query(`INSERT INTO table_lottery_three_f (owner_username, bet_amount, pick_number,round_id) VALUES(?,?,?,?)`,
                    [ownerUsername,betAmount,pickNumber,roundID], (error, results, fields) => {
                        if(error){
                            res.status(400).send({message:` Buy three front lottery number Failed Something Wrong`})
                        }
                        else{
                            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                                if (results.length > 0) {
                                    var count_user_all_round = results[0].count_user_all_round
                                    var count_money_profit = results[0].count_money_profit
                                    count_user_all_round = count_user_all_round + 1
                                    count_money_profit = count_money_profit + betAmount
                                    db.query("UPDATE controller_lottery SET count_user_all_round=?,count_money_profit=? WHERE round_id = '"+ roundID +"'",
                                    [count_user_all_round,count_money_profit],(error, results, fields) => {
                                        if (error) throw error;
                                    })
                                    res.send({message:`Buy three front lottery number round ${roundID} success`})        
                                }
                            })
                        }
                    })
                }
                else{
                    res.send({message:'Insufficient balance in the wallet!'});
                } 
            }
        }) 
    }
    //ซื้อ 3 ตัวล่าง
    else if (pickType == 'three_b') {
        db.query(`SELECT user_username, user_wallet FROM persons WHERE user_username = '${ownerUsername}'`, function(err, result, field){
            if (result.length == 0) {
                res.send({message:'Not found user or something wrong'});
            }
            else{
                if (result[0].user_wallet >= betAmount) {
                    var wallet = result[0].user_wallet - betAmount
                    db.query("UPDATE persons SET user_wallet=? WHERE user_username = '"+ ownerUsername +"'",
                    [wallet],(error, results, fields) => {
                        if (error) throw error;
                    }) 
                    db.query(`INSERT INTO table_lottery_three_b (owner_username, bet_amount, pick_number,round_id) VALUES(?,?,?,?)`,
                    [ownerUsername,betAmount,pickNumber,roundID], (error, results, fields) => {
                        if(error){
                            res.status(400).send({message:` Buy three back lottery number Failed Something Wrong`})
                        }
                        else{
                            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                                if (results.length > 0) {
                                    var count_user_all_round = results[0].count_user_all_round
                                    var count_money_profit = results[0].count_money_profit
                                    count_user_all_round = count_user_all_round + 1
                                    count_money_profit = count_money_profit + betAmount
                                    db.query("UPDATE controller_lottery SET count_user_all_round=?,count_money_profit=? WHERE round_id = '"+ roundID +"'",
                                    [count_user_all_round,count_money_profit],(error, results, fields) => {
                                        if (error) throw error;
                                    })
                                    res.send({message:`Buy three back lottery number round ${roundID} success`})        
                                }
                            })
                        }
                    })
                }
                else{
                    res.send({message:'Insufficient balance in the wallet!'});
                } 
            }
        }) 
    }
    //ซื้อ 2 ตัวล่าง
    else if (pickType == 'two') {
        db.query(`SELECT user_username, user_wallet FROM persons WHERE user_username = '${ownerUsername}'`, function(err, result, field){
            if (result.length == 0) {
                res.send({message:'Not found user or something wrong'});
            }
            else{
                if (result[0].user_wallet >= betAmount) {
                    var wallet = result[0].user_wallet - betAmount
                    db.query("UPDATE persons SET user_wallet=? WHERE user_username = '"+ ownerUsername +"'",
                    [wallet],(error, results, fields) => {
                        if (error) throw error;
                    }) 
                    db.query(`INSERT INTO table_lottery_two (owner_username, bet_amount, pick_number,round_id) VALUES(?,?,?,?)`,
                    [ownerUsername,betAmount,pickNumber,roundID], (error, results, fields) => {
                        if(error){
                            res.status(400).send({message:` Buy two back lottery number Failed Something Wrong`})
                        }
                        else{
                            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                                if (results.length > 0) {
                                    var count_user_all_round = results[0].count_user_all_round
                                    var count_money_profit = results[0].count_money_profit
                                    count_user_all_round = count_user_all_round + 1
                                    count_money_profit = count_money_profit + betAmount
                                    db.query("UPDATE controller_lottery SET count_user_all_round=?,count_money_profit=? WHERE round_id = '"+ roundID +"'",
                                    [count_user_all_round,count_money_profit],(error, results, fields) => {
                                        if (error) throw error;
                                    })
                                    res.send({message:`Buy two back lottery number round ${roundID} success`})        
                                }
                            })
                        }
                    })
                }
                else{
                    res.send({message:'Insufficient balance in the wallet!'});
                } 
            }
        }) 
    }
    else{
        res.send({message:'Please pick type lottery'})
    }
}

exports.checkLottery = (req,res) =>{
    let name = req.body.owner_username;
    let roundID = req.body.round_id.toUpperCase();
    let pickType = req.body.pick_type; //six three_f three_b two
    //ซื้อ 6 เต็มตัว
    if (pickType == 'six') {
        db.query("SELECT * FROM table_lottery_six WHERE owner_username =? AND round_id=?",[name,roundID], function(error, results, fields) {
            if (results.length > 0) {
                res.send(results)
            }
            else{
                res.send({message:`You didn't buy the six lottery numbers round ${roundID}`})
            }
        })
    }
    //ซื้อ 3 ตัวบน
    else if (pickType == 'three_f' ) {
        db.query("SELECT * FROM table_lottery_three_f WHERE owner_username =? AND round_id=?",[name,roundID], function(error, results, fields) {
            if (results.length > 0) {
                res.send(results)
            }
            else{
                res.send({message:`You didn't buy the top three lottery round ${roundID}`})
            }
        })
    }
    //ซื้อ 3 ตัวล่าง
    else if (pickType == 'three_b') {
        db.query("SELECT * FROM table_lottery_three_b WHERE owner_username =? AND round_id=?",[name,roundID], function(error, results, fields) {
            if (results.length > 0) {
                res.send(results)
            }
            else{
                res.send({message:`You didn't buy the lower three lottery round ${roundID}`})
            }
        })
    }
    //ซื้อ 2 ตัวล่าง
    else if (pickType == 'two') {
        db.query("SELECT * FROM table_lottery_two WHERE owner_username =? AND round_id=?",[name,roundID], function(error, results, fields) {
            if (results.length > 0) {
                res.send(results)
            }
            else{
                res.send({message:`You didn't buy the lower two lottery round ${roundID}`})
            }
        })
    }
    else{
        res.send({message:'Please pick type lottery'})
    }   
}

exports.test = (req,res) =>{


    var str1=req.body.str1
    var str2=req.body.str2
    const areAnagram = (data1, data2) => data1.toLowerCase().split('').sort().join('') === data2.toLowerCase().split('').sort().join('');
    if (areAnagram(str1,str2) == true) {
        var text = " Two string is Anagram";
    }
    else{
        var text = " Two string is Not Anagram";
    }
    
    res.send(areAnagram(str1,str2)+'\n'+text); 
    // console.log(str1.toLowerCase() + ' tolowcasw');
    // console.log(str1.split('') + ' split');
    // console.log(str1.split('').sort() + ' split+sort');
    // console.log(str1.split('').sort().join('') + ' split+sort+join');
    
    var resultNumber = str1.split('')
    var numberFront = []
    var numberBack = []
    var numberBack2 = []
    for (let i = 0; i < resultNumber.length; i++) {
        if (i <= 2) {
            numberFront.push(resultNumber[i])
        }else{
            if (i > 3) {
                numberBack2.push(resultNumber[i])
            }
            numberBack.push(resultNumber[i])
        }
    }

    console.log(numberFront.join(''));
    console.log(numberBack.join(''));
    console.log(numberBack2.join(''));
    
}


exports.sendResultLottery = (req,res)=>{
    let roundID = req.body.round_id.toUpperCase();
    let resultLotterySix = req.body.result_number_six;
    let resultLottery3f = req.body.result_number_3front;
    let resultLottery3b = req.body.result_number_3back;
    let resultLottery2b = req.body.result_number_2back;
    let pickOdds3f = req.body.pickOdds_number_3front;
    let pickOdds3b = req.body.pickOdds_number_3back;
    let pickOdds2b = req.body.pickOdds_number_2back;
    let stage = 1;
    let status = 1
    //เช็คว่ามี roundID หรือป่าว 
    db.query("SELECT * FROM controller_lottery WHERE round_id = ?",[roundID],function(err, result, field){
        if (result.length > 0) {
            //เช็คว่า roundID ผลออกหรือยัง
            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'  AND round_status = '"+ status +"' ", function(err, result, field){
                if (result.length > 0) {
                    res.send({message:`Lottery ${roundID} expired`})
                }
                else{
                    //updata table controller 
                    db.query(`UPDATE controller_lottery SET round_status=?, result_number_six=?, result_number_3front=?,
                    result_number_3back=?,result_number_2back=?,pickOdds_number_3front=?,pickOdds_number_3back=?,pickOdds_number_2back=? WHERE round_id =? `,
                    [stage,resultLotterySix,resultLottery3f,resultLottery3b,resultLottery2b,pickOdds3f,pickOdds3b,pickOdds2b,roundID],(error, results, fields) => {
                        if (error) throw error;
                    })
                    //updatae table six lottery
                    db.query(`UPDATE table_lottery_six SET round_status=?, result_number=? WHERE round_id =? `,
                    [stage,resultLotterySix,roundID],(error, results, fields) => {
                        if (error) throw error;
                    })
                    //updatae table 3front
                    db.query(`UPDATE table_lottery_three_f SET round_status=?, result_number=?,pick_odds=? WHERE round_id =? `,
                    [stage,resultLottery3f,pickOdds3f,roundID],(error, results, fields) => {
                        if (error) throw error;
                    })
                    //updatae table 3back
                    db.query(`UPDATE table_lottery_three_b SET round_status=?, result_number=?,pick_odds=? WHERE round_id =? `,
                    [stage,resultLottery3b,pickOdds3b,roundID],(error, results, fields) => {
                        if (error) throw error;
                    })
                    //updatae table 2back
                    db.query(`UPDATE table_lottery_two SET round_status=?, result_number=?,pick_odds=? WHERE round_id =? `,
                    [stage,resultLottery2b,pickOdds2b,roundID],(error, results, fields) => {
                        if (error) throw error;
                    })
                    res.send({message:`Lottery round ${roundID} Result Is Out `})
                }
            })
        }
        else{
            res.send({message:`Not found lottery round ${roundID} `})
        }
    })

   
}

exports.closeBillLotteryByRoundeID = (req,res)=>{
    let roundID = req.body.round_id.toUpperCase();
    let status = 1
 
    //เช็คว่ามี roundID หรือไม่
    db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"' ", function(err, result, field){
        if (result.length > 0) {
            //เช็คว่า roundID นั้นผลออกหรือยัง
            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'  AND round_status = '"+ status +"' ", function(err, result, field){
                if (result.length > 0) {
                    //เช็คว่าบิดบิลไปแล้วหรือยัง
                    db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'  AND ticket_status = '"+ status +"' ", function(err, result, field){
                        if (result.length > 0) {
                            res.send({message:`The lottery round ${roundID} has been closed`})
                        }
                        else{
                            req.session.roundID = roundID
                            res.redirect('/closeBillLotteryByRoundeIDStage1')
                        }
                    })
                }
                else{
                    res.send({message:`Can't close bill ${roundID} because Lottery results are not out yet`})
                }
            })
        }
        else{
            res.send({message:`Not found lottery round ${roundID}`})
        }
    })

}
//คิดบิลเลข 6 ตัว
exports.closeBillLotteryByRoundeIDStage1 = (req,res) =>{
    let roundID = req.session.roundID;
    let stage = 1
    var countUserWin = 0
    var countUserLoss = 0
    var finalReward = 0
    var sixdigit = 6000000
    db.query("SELECT * FROM table_lottery_six WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                if (results[i].pick_number == results[i].result_number) {
                    var reward = sixdigit * results[i].pick_odds
                    countUserWin++
                    finalReward = finalReward + reward
                }
                else{
                    var reward = 0;
                    countUserLoss++
                    finalReward = finalReward + reward
                }
    
                var id = results[i].ID
            
                db.query("UPDATE table_lottery_six SET winning_amount=?,ticket_status=? WHERE ID = '"+ id +"'",
                [reward,stage],(error, results, fields) => {
                    if (error) throw error;
                })
                db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                    if (results.length > 0) {
                        var count_user_win = results[0].count_user_win
                        var count_user_lose = results[0].count_user_lose
                        var count_pay_money = results[0].count_pay_money
                        count_user_win = count_user_win + countUserWin
                        count_user_lose = count_user_lose + countUserLoss
                        count_pay_money = count_pay_money + finalReward
                        db.query("UPDATE controller_lottery SET count_user_win=?,count_user_lose=?,count_pay_money=? WHERE round_id = '"+ roundID +"'",
                        [count_user_win,count_user_lose,count_pay_money],(error, results, fields) => {
                            if (error) throw error;
                        })        
                    }
                })
            }
            res.redirect('/closeBillLotteryByRoundeIDStage2')
        } else {
            res.redirect('/closeBillLotteryByRoundeIDStage2')
            //res.send({message:'six'});
        }	
    });    
}
//คิดบิล 3 ตัวบน
exports.closeBillLotteryByRoundeIDStage2 = (req,res) =>{
    let roundID = req.session.roundID;
    let stage = 1
    var countUserWin = 0
    var countUserWinTot = 0
    var countUserLoss = 0
    var finalReward = 0
    var pickNumber = 0
    var resultNumber = 0
    db.query("SELECT * FROM table_lottery_three_f WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
        if (results.length > 0) {
     
            for (let i = 0; i < results.length; i++) {
                if (results[i].pick_number == results[i].result_number) {
                    var reward = results[i].bet_amount * results[i].pick_odds
                    countUserWin++
                    pickNumber = results[i].pick_number
                    resultNumber = results[i].result_number
                    const areAnagram = (data1, data2) => data1.toLowerCase().split('').sort().join('') === data2.toLowerCase().split('').sort().join('');
                    if (areAnagram(pickNumber,resultNumber) == true) {
                        countUserWinTot++
                        var tot = (results[i].pick_odds / 2) * results[i].bet_amount
                        finalReward = finalReward + reward + tot
                    }
                    else{
                        var tot = 0
                        finalReward = finalReward + reward
                    } 
                }
                else{
                    var reward = 0;
                    countUserLoss++
                    pickNumber = results[i].pick_number
                    resultNumber = results[i].result_number
                    const areAnagram = (data1, data2) => data1.toLowerCase().split('').sort().join('') === data2.toLowerCase().split('').sort().join('');
                    if (areAnagram(pickNumber,resultNumber) == true) {
                        countUserWinTot++
                        var tot = (results[i].pick_odds / 2) * results[i].bet_amount
                        finalReward = finalReward + reward + tot
                    }
                    else{
                        var tot = 0
                        finalReward = finalReward + reward
                    } 
                }
                var id = results[i].ID
            
                db.query("UPDATE table_lottery_three_f SET winning_amount=?,ticket_status=?,winning_tot_amount=? WHERE ID = '"+ id +"'",
                [reward,stage,tot],(error, results, fields) => {
                    if (error) throw error;
                })
                db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                    if (results.length > 0) {
                        var count_user_win = results[0].count_user_win
                        var count_user_lose = results[0].count_user_lose
                        var count_pay_money = results[0].count_pay_money
                        var count_user_win_tot = results[0].count_user_win_tot
                        count_user_win = count_user_win + countUserWin
                        count_user_lose = count_user_lose + countUserLoss
                        count_pay_money = count_pay_money + finalReward
                        count_user_win_tot = count_user_win_tot + countUserWinTot
                        db.query("UPDATE controller_lottery SET count_user_win=?,count_user_win_tot=?,count_user_lose=?,count_pay_money=? WHERE round_id = '"+ roundID +"'",
                        [count_user_win,count_user_win_tot,count_user_lose,count_pay_money],(error, results, fields) => {
                            if (error) throw error;
                        })        
                    }
                })
            }
            res.redirect('/closeBillLotteryByRoundeIDStage3')
        } else {
            res.redirect('/closeBillLotteryByRoundeIDStage3')
            //res.send({message:'3f'});
        }	
    });    
}
//คิดบิล 3 ตัวล่าง
exports.closeBillLotteryByRoundeIDStage3 = (req,res) =>{
    let roundID = req.session.roundID;
    let stage = 1
    var countUserWin = 0
    var countUserWinTot = 0
    var countUserLoss = 0
    var finalReward = 0
    var pickNumber = 0
    var resultNumber = 0
    db.query("SELECT * FROM table_lottery_three_b WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                if (results[i].pick_number == results[i].result_number) {
                    var reward = results[i].bet_amount * results[i].pick_odds
                    countUserWin++
                    pickNumber = results[i].pick_number
                    resultNumber = results[i].result_number
                    const areAnagram = (data1, data2) => data1.toLowerCase().split('').sort().join('') === data2.toLowerCase().split('').sort().join('');
                    if (areAnagram(pickNumber,resultNumber) == true) {
                        countUserWinTot++
                        var tot = (results[i].pick_odds / 2) * results[i].bet_amount
                        finalReward = finalReward + reward + tot
                    }
                    else{
                        var tot = 0
                        finalReward = finalReward + reward
                    } 
                }
                else{
                    var reward = 0;
                    countUserLoss++
                    pickNumber = results[i].pick_number
                    resultNumber = results[i].result_number
                    const areAnagram = (data1, data2) => data1.toLowerCase().split('').sort().join('') === data2.toLowerCase().split('').sort().join('');
                    if (areAnagram(pickNumber,resultNumber) == true) {
                        countUserWinTot++
                        var tot = (results[i].pick_odds / 2) * results[i].bet_amount
                        finalReward = finalReward + reward + tot
                    }
                    else{
                        var tot = 0
                        finalReward = finalReward + reward
                    } 
                }
        
                var id = results[i].ID
            
                db.query("UPDATE table_lottery_three_b SET winning_amount=?,ticket_status=?,winning_tot_amount=? WHERE ID = '"+ id +"'",
                [reward,stage,tot],(error, results, fields) => {
                    if (error) throw error;
                })
                db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                    if (results.length > 0) {
                        var count_user_win = results[0].count_user_win
                        var count_user_lose = results[0].count_user_lose
                        var count_pay_money = results[0].count_pay_money
                        var count_user_win_tot = results[0].count_user_win_tot
                        count_user_win = count_user_win + countUserWin
                        count_user_lose = count_user_lose + countUserLoss
                        count_pay_money = count_pay_money + finalReward
                        count_user_win_tot = count_user_win_tot + countUserWinTot
                        db.query("UPDATE controller_lottery SET count_user_win=?,count_user_win_tot=?,count_user_lose=?,count_pay_money=? WHERE round_id = '"+ roundID +"'",
                        [count_user_win,count_user_win_tot,count_user_lose,count_pay_money],(error, results, fields) => {
                            if (error) throw error;
                        })               
                    }
                })
            }
            res.redirect('/closeBillLotteryByRoundeIDStage4')
        } else {
            res.redirect('/closeBillLotteryByRoundeIDStage4')
            //res.send({message:'3b'});
        }	
    });    
}
//คิดบิล 2 ตัวล่าง
exports.closeBillLotteryByRoundeIDStage4 = (req,res) =>{
    let roundID = req.session.roundID;
    let stage = 1
    var countUserWin = 0
    var countUserLoss = 0
    var finalReward = 0
    db.query("SELECT * FROM table_lottery_two WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                if (results[i].pick_number == results[i].result_number) {
                    var reward = results[i].bet_amount * results[i].pick_odds
                    countUserWin++
                    finalReward = finalReward + reward
                }
                else{
                    var reward = 0;
                    countUserLoss++
                    finalReward = finalReward + reward
                }
                var id = results[i].ID
            
                db.query("UPDATE table_lottery_two SET winning_amount=?,ticket_status=? WHERE ID = '"+ id +"'",
                [reward,stage],(error, results, fields) => {
                    if (error) throw error;
                })
                db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
                    if (results.length > 0) {
                        var count_user_win = results[0].count_user_win
                        var count_user_lose = results[0].count_user_lose
                        var count_pay_money = results[0].count_pay_money
                        count_user_win = count_user_win + countUserWin
                        count_user_lose = count_user_lose + countUserLoss
                        count_pay_money = count_pay_money + finalReward
                        db.query("UPDATE controller_lottery SET ticket_status=?, count_user_win=?,count_user_lose=?,count_pay_money=? WHERE round_id = '"+ roundID +"'",
                        [stage,count_user_win,count_user_lose,count_pay_money],(error, results, fields) => {
                            if (error) throw error;
                        })        
                    }
                })
            }
            //res.send({message:`Close bill lottery round ${roundID} suscessfully.`})
            res.redirect('/closeBillLotteryByRoundeIDFinal')
           
        } else {
            db.query("UPDATE controller_lottery SET ticket_status=? WHERE round_id = '"+ roundID +"'",
            [stage],(error, results, fields) => {
                if (error) throw error;
            })    
            res.redirect('/closeBillLotteryByRoundeIDFinal')
            //res.send({message:'2b'});
        }	
    });   
}
//close bill finished
exports.closeBillLotteryByRoundeIDFinal = (req,res) =>{
    let roundID = req.session.roundID;
    setTimeout(function () {
        db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'", function(error, results, fields) {
            if (results.length > 0) {
               var allUser = results[0].count_user_all_round
               var userWin = results[0].count_user_win
               var userWinTot = results[0].count_user_win_tot
               var userLose = results[0].count_user_lose
               var payMoney = results[0].count_pay_money
               var profit = results[0].count_money_profit
            }
            res.send({message:`Close bill lottery round ${roundID} suscessfully.`,allUser:allUser,userWin:userWin,
            userWinTot:userWinTot,userLose:userLose,payMoney:payMoney,profit:profit})
        })
    }, 2000)
    
}



exports.checkLotteryResultByRound = (req,res) =>{
    let roundID = req.body.round_id.toUpperCase();
    let SelectType = req.body.select_type;
    let status = 1
  
    db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"' ", function(err, result, field){
        if (result.length > 0) {
            db.query("SELECT * FROM controller_lottery WHERE round_id = '"+ roundID +"'  AND ticket_status = '"+ status +"' ", function(err, result, field){
                if (result.length > 0) {
                    req.session.dataAll = result
                    req.session.roundID = roundID
                    req.session.SelectType = SelectType
                    res.redirect('/checkLotteryResultByRoundStage1')     
                }
                else{
                    res.send({message:`The lottery round ${roundID} process is not finished`})
                }
            })
        }
        else{
            res.send({message:`Not found lottery round ${roundID} or something wrong`})
        }
    })

}
//get data six digit
exports.checkLotteryResultByRoundStage1 = (req,res) =>{
    let roundID = req.session.roundID
    req.session.sixdigitWin = []
    req.session.sixdigitLose = []
    req.session.count_sixdigitWin = 0
    req.session.count_sixdigitLose = 0
    db.query("SELECT * FROM table_lottery_six WHERE round_id = '"+ roundID +"' ", function(err, result, field){
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {           
                if (result[i].winning_amount > 0) {
                    req.session.sixdigitWin.push(result[i])
                    req.session.count_sixdigitWin++
                }
                else{
                    req.session.sixdigitLose.push(result[i])
                    req.session.count_sixdigitLose++
                }
                
            }
            req.session.sixnumber_count_all = result.length
            res.redirect('/checkLotteryResultByRoundStage2')      
        }
    })

}
//get data 3front
exports.checkLotteryResultByRoundStage2 = (req,res) =>{
    let roundID = req.session.roundID
    req.session.threefrontWin = []
    req.session.threefrontLose = []
    req.session.threefrontTot = []
    req.session.count_threefrontWin = 0
    req.session.count_threefrontLose = 0
    req.session.count_threefrontTot = 0
    db.query("SELECT * FROM table_lottery_three_f WHERE round_id = '"+ roundID +"' ", function(err, result, field){
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {             
                if (result[i].winning_amount > 0) {
                    req.session.threefrontWin.push(result[i])
                    req.session.count_threefrontWin++
                }
                if (result[i].winning_tot_amount > 0) {
                    req.session.threefrontTot.push(result[i])
                    req.session.count_threefrontTot++
                }
                else{
                    req.session.threefrontLose.push(result[i])
                    req.session.count_threefrontLose++
                }    
            }
            req.session.threeFnumber_count_all = result.length
            res.redirect('/checkLotteryResultByRoundStage3')      
        }
    })
}
//get data 3back
exports.checkLotteryResultByRoundStage3 = (req,res) =>{
    let roundID = req.session.roundID
    req.session.threebackWin = []
    req.session.threebackLose = []
    req.session.threebackTot = []
    req.session.count_threebacktWin = 0
    req.session.count_threebackLose = 0
    req.session.count_threebackTot = 0
    db.query("SELECT * FROM table_lottery_three_b WHERE round_id = '"+ roundID +"' ", function(err, result, field){
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {             
                if (result[i].winning_amount > 0) {
                    req.session.threebackWin.push(result[i])
                    req.session.count_threebacktWin++
                }
                if (result[i].winning_tot_amount > 0) {
                    req.session.threebackTot.push(result[i])
                    req.session.count_threebackTot++
                } 
                else{
                    req.session.threebackLose.push(result[i])
                    req.session.count_threebackLose++
                }
            }
            req.session.threeBnumber_count_all = result.length
            res.redirect('/checkLotteryResultByRoundStage4')      
        }
    })
}
//get data 2back
exports.checkLotteryResultByRoundStage4 = (req,res) =>{
    let roundID = req.session.roundID
    let SelectType = req.session.SelectType
    req.session.twobackWin = []
    req.session.twobackLose = []
    req.session.count_twobackWin = 0
    req.session.count_twobackLose = 0
    db.query("SELECT * FROM table_lottery_two WHERE round_id = '"+ roundID +"' ", function(err, result, field){
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {             
                if (result[i].winning_amount > 0) {
                    req.session.twobackWin.push(result[i])
                    req.session.count_twobackWin++
                }
                else{
                    req.session.twobackLose.push(result[i])
                    req.session.count_twobackLose++
                }
            }
            req.session.twoBnumber_count_all = result.length
            
            if (SelectType == 'all') {
                res.send({
                    RoundID:roundID,
                    lotteryData:req.session.dataAll,
                    lotterySixDigit:{Alluser:req.session.sixnumber_count_all,
                        WinAmount:req.session.count_sixdigitWin,
                        LoseAmount:req.session.count_sixdigitLose,
                        Win:req.session.sixdigitWin,
                        Lose:req.session.sixdigitLose},
                    lotteryThreeFrontDigit:{Alluser:req.session.threeFnumber_count_all,
                        WinAmount:req.session.count_threefrontWin,
                        WinTotAmount:req.session.count_threefrontTot,
                        LoseAmount:req.session.count_threefrontLose,
                        Win:req.session.threefrontWin,
                        WinTot:req.session.threefrontTot,
                        Lose:req.session.threefrontLose},
                    lotteryThreeBackDigit:{Alluser: req.session.threeBnumber_count_all, 
                        WinAmount:req.session.count_threebacktWin,
                        WinTotAmount:req.session.count_threebackTot,
                        LoseAmount:req.session.count_threebackLose,
                        Win:req.session.threebackWin,
                        WinTot:req.session.threebackTot,   
                        Lose:req.session.threebackLose},
                    lotteryTwoBackDigit:{Alluser:req.session.twoBnumber_count_all,
                        WinAmount:req.session.count_twobackWin,
                        LoseAmount:req.session.count_twobackLose,
                        Win:req.session.twobackWin,
                        Lose:req.session.twobackLose}
                })
            }
            else if (SelectType == 'summary') {
                res.send({
                    RoundID:roundID,
                    lotteryData:req.session.dataAll,
                })
            }
            else if (SelectType == 'six') {
                res.send({
                    RoundID:roundID,
                    lotterySixDigit:{Alluser:req.session.sixnumber_count_all,
                        WinAmount:req.session.count_sixdigitWin,
                        LoseAmount:req.session.count_sixdigitLose,
                        Win:req.session.sixdigitWin,
                        Lose:req.session.sixdigitLose}
                })   
            }
            else if (SelectType == 'three_f') {
                res.send({
                    RoundID:roundID,
                    lotteryThreeFrontDigit:{Alluser:req.session.threeFnumber_count_all,
                        WinAmount:req.session.count_threefrontWin,
                        WinTotAmount:req.session.count_threefrontTot,
                        LoseAmount:req.session.count_threefrontLose,
                        Win:req.session.threefrontWin,
                        WinTot:req.session.threefrontTot,
                        Lose:req.session.threefrontLose}
                })
            }
            else if (SelectType == 'three_b') {
                res.send({
                    RoundID:roundID,
                    lotteryThreeBackDigit:{Alluser: req.session.threeBnumber_count_all, 
                        WinAmount:req.session.count_threebacktWin,
                        WinTotAmount:req.session.count_threebackTot,
                        LoseAmount:req.session.count_threebackLose,
                        Win:req.session.threebackWin,
                        WinTot:req.session.threebackTot,   
                        Lose:req.session.threebackLose}
                })
            }
            else if (SelectType == 'two') {
                res.send({
                    RoundID:roundID,
                    lotteryTwoBackDigit:{Alluser:req.session.twoBnumber_count_all,
                        WinAmount:req.session.count_twobackWin,
                        LoseAmount:req.session.count_twobackLose,
                        Win:req.session.twobackWin,
                        Lose:req.session.twobackLose}
                })
            }
            else{
                res.send({message:'Please select type'})
            }
        }
    })
}

exports.buyLotteryTest= async (req,res) =>{

//     let test = await butLotterySix.findAll({
//         where: {
//             pick_odds: 2
//           },
//     });
  //findAll จะได้ [{}]
  /*
  let test = await butLotterySix.findAll({
            // where: {
            //     owner_username: 'pop'
            //   },
        });
        await test[0].update({
            result_number:'777'
        });
  */
  //findOne จะได้ {}
  /*
  let test = await butLotterySix.findAll({
            // where: {
            //     owner_username: 'pop'
            //   },
        });
        await test.update({
            result_number:'777'
        });
  */
   
//   res.json({
//       data: test,
//       status: true,
//   });


//update
try {
    let test = await butLotterySix.findOne({
        where: {
            owner_username: 'pop'
          },
    });
    await test.update({
        result_number:'998'
    });
    res.json({
        data:test,
        message:'suscess',
    })

} catch (error) {
    res.json({
        message:'error',
        error:error
    })
}
 
//create
    // try{
    //     let lotterySix = {
    //         owner_username : req.body.owner_username,
    //         bet_amount : req.body.bet_amount,
    //         pick_number : req.body.pick_number,
    //         round_id : req.body.round_id,
    //     };
    //     await butLotterySix.create(lotterySix);
    //     res.json({
    //         dataUpdate: lotterySix,
    //         message: "create data success",
    //     });
    // }
    // catch (err) {
    //     let lotterySix = {
    //         owner_username : req.body.owner_username,
    //         bet_amount : req.body.bet_amount,
    //         pick_number : req.body.pick_number,
    //         round_id : req.body.round_id,
    //     };
    //     res.json({
    //         errData: lotterySix,
    //         err: "err|" + err,
    //         status: false,
    //         message: "missing data success",
    //     });
    // }

}

/*
    app.get("/getTabel",lotteryController.getTableLottery);
    app.post("/openLotteryByRoundID",lotteryController.openLotteryByRoundID);
    app.get("/checkLotteryOpen",lotteryController.checkLotteryOpen);

    app.post("/prepareBuyLottery",lotteryController.prepareBuyLottery);
    app.get("/buyLottery",lotteryController.buyLottery);

    app.post("/checkLottery",lotteryController.checkLottery);
    app.post("/test",lotteryController.test);

    app.put("/sendResultLottery",lotteryController.sendResultLottery);

    app.put("/closeBillLotteryByRoundeID",lotteryController.closeBillLotteryByRoundeID);
    app.get("/closeBillLotteryByRoundeIDStage1",lotteryController.closeBillLotteryByRoundeIDStage1);
    app.get("/closeBillLotteryByRoundeIDStage2",lotteryController.closeBillLotteryByRoundeIDStage2);
    app.get("/closeBillLotteryByRoundeIDStage3",lotteryController.closeBillLotteryByRoundeIDStage3);
    app.get("/closeBillLotteryByRoundeIDStage4",lotteryController.closeBillLotteryByRoundeIDStage4);
    app.get("/closeBillLotteryByRoundeIDFinal",lotteryController.closeBillLotteryByRoundeIDFinal);
    
    app.post("/checkLotteryResultByRound",lotteryController.checkLotteryResultByRound);
    app.get("/checkLotteryResultByRoundStage1",lotteryController.checkLotteryResultByRoundStage1);
    app.get("/checkLotteryResultByRoundStage2",lotteryController.checkLotteryResultByRoundStage2);
    app.get("/checkLotteryResultByRoundStage3",lotteryController.checkLotteryResultByRoundStage3);
    app.get("/checkLotteryResultByRoundStage4",lotteryController.checkLotteryResultByRoundStage4);
*/ 

