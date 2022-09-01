const user = require('../models/tableUser');
const jwt = require('jsonwebtoken');

exports.getUser = async(req,res) =>{
    try {
        var datauser = await user.findAll();
        res.json({
            message:'success',
            data:datauser
        })
    } catch (error) {
        res.json({
            message:'err find getUser',
            error:error
        })
    }
}

exports.getUserbyID = async(req,res) => {
    try {
        let id = req.params.id;
        var datauser = await user.findOne({
            where:{
                user_id:id
            }
        });
        if (datauser) {
            res.json({
                message:'success',
                data:datauser
            })
        } else {
            res.status(404).json({
                message:`Not found user id ${id}`,
                data:datauser
            })
        }
    } catch (error) {
        res.json({
            message:'err find getUserbyID',
            error:error
        })
    }
}

exports.insertUser = async(req,res) =>{
    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }
    function replaceAll(str, find, replace) {
        if (str) {
          return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
        } else {
          return undefined;
        }
    }

    let userUsername = req.body.user_username;
    let userPassword = req.body.user_password;
    let userPhone = replaceAll(req.body.user_phone, "-", "");
    let userEmail = req.body.user_email;
    let userFirstname = req.body.user_firstname;
    let userLastname = req.body.user_lastname;
    let userAccount = replaceAll(req.body.user_account_number, "-", "");
    userUsername = replaceAll(userUsername, " ", ""); 
    userPassword = replaceAll(userPassword, " ", ""); 
    userPhone = replaceAll(userPhone, " ", ""); 
    userEmail = replaceAll(userEmail, " ", ""); 
    userFirstname = replaceAll(userFirstname, " ", ""); 
    userLastname = replaceAll(userLastname, " ", ""); 
    userAccount = replaceAll(userAccount, " ", ""); 

    let bankTh = replaceAll(req.body.user_bank, " ", "");
    let userBank = "OTHERS";
    switch (bankTh) {
      case "ไทยพาณิชย์":
        userBank = "SCB";
        break;
      case "กสิกรไทย":
        userBank = "KBANK";
        break;
      case "กรุงไทย":
        userBank = "KTB";
        break;
      case "กรุงศรี":
        userBank = "BAYB";
        break;
      case "กรุงศรีอยุธยา":
        userBank = "BAYB";
        break;
      case "กรุงเทพ":
        userBank = "BBL";
        break;
      case "UOB":
        userBank = "UOB";
        break;
      default:
        userBank = "OTHER";
        break;
    }
    let userStatus = 'normal'
    let jwtToken = jwt.sign({
        userUsername: userUsername,
        userPassword: userPassword
    }, 
    "create-authen-nodejs", {
        expiresIn: "1h"
    });//ใส่ข้อความอะไรก็ได้ ตรง create-authen-nodejs หรือ process.env.TOKEN_KEY เป็นข้อความจาก ไฟล์ env
    var key = jwtToken;
    
    try {
        var datauser = await user.findOne({
            where:{
                user_username:userUsername
            }
        });
    } catch (error) {
        res.json({
            message:'err find insertUser'
        })
    }

    let insertUser = {
        user_username:userUsername,
        user_password:userPassword,
        user_phone:userPhone,
        user_email:userEmail,
        user_firstname:userFirstname,
        user_lastname:userLastname,
        user_account_number:userAccount,
        user_bank:userBank,
        user_status:userStatus,
        secretKey:key
    }

    if (datauser) {
        res.json({
            message:'Duplicate username or try a different username',
        })
    } else {
        try {
            await user.create(insertUser);
            var data = await user.findOne({
                where:{
                    user_username:userUsername
                }
            });
            res.json({
                message:'create user success',
                data:data
            })
        } catch (error) {
            res.json({
                message:'err insert user',
                error:error
            })
        }
    }

}

exports.updateUser = async(req,res) =>{

    let userUsername = req.body.user_username;
    let userPassword = req.body.user_password;
    let userPhone = req.body.user_phone;
    let userEmail = req.body.user_email;
    let userFirstname = req.body.user_firstname;
    let userLastname = req.body.user_lastname;
    let userAccountNumber = req.body.user_account_number;
    let userBank = req.body.user_bank;

    let updateStatus = 0 //update ข้อมูลส่วนตัว
    
    try {
        var datauser = await user.findOne({
            where:{
                user_username:userUsername
            }
        });
    } catch (error) {
        res.json({
            message:'err find updateUser',
            error:error
        })
    }

    let dataupdate = {
        user_password:userPassword,
        user_phone:userPhone,
        user_email:userEmail,
        user_firstname:userFirstname,
        user_lastname:userLastname,
        user_account_number:userAccountNumber,
        user_bank:userBank,
        update_status:updateStatus
    }

    if (datauser) {
        datauser.update(dataupdate);
        res.json({
            message:`update data user ${userUsername} success`
        })
    } else {
        res.status(404).json({
            message:`Not found user ${userUsername}`
        })
    }
    
}

exports.updateWalletUser = async(req,res) =>{
    let userUsername = req.body.user_username;
    let moneyWallet = req.body.money_wallet;
    let updateStatus = 1 //update wallet

    if(moneyWallet <= 0){
        res.status(400).json({ 
            message: 'Please input your wallet.'
        });
    }
    else{
        try {
            var datauser = await user.findOne({
                where:{
                    user_username:userUsername
                }
            });
            if (datauser) {
                var oldMoney = datauser.user_wallet
                var money = moneyWallet + oldMoney
                datauser.update({
                    user_wallet:money,
                    update_status:updateStatus
                })
                res.json({
                    message:`update wallet user ${userUsername} success`
                })
            } else {
                res.status(400).json({
                    message:`Not found user ${userUsername} `
                })
            }
           
        } catch (error) {
            res.json({
                message:'err find updateWalletUser',
                error:error
            })
        }
    }
}

exports.bannedUser = async(req,res) =>{
    let userUsername = req.body.user_username;
    let userStatus = 'banned'

    try {
        var datauser = await user.findOne({
            where:{
                user_username:userUsername
            }
        });
        if (datauser) {
            datauser.update({
                user_status:userStatus
            })
            res.json({
                message:`Banned user ${userUsername} successfully `,
            })
        } else {
            res.status(400).json({
                message:`Not found user ${userUsername} `
            })
        }
    } catch (error) {
        res.json({
            message:'err find bannedUser',
            error:error
        })
    }
}

exports.unBannedUser = async(req,res) =>{
    let userUsername = req.body.user_username;
    let userStatus = 'normal'
   try {
        var datauser = await user.findOne({
            where:{
                user_username:userUsername
            }
        });
        if (datauser) {
            datauser.update({
                user_status:userStatus
            })
            res.json({
                message:`Cancel banned user ${userUsername} successfully `,
            })
        } else {
            res.status(400).json({
                message:`Not found user ${userUsername} `
            })
        }
    } catch (error) {
        res.json({
            message:'err find unBannedUser',
            error:error
        })
    }

}

exports.deleteUser = async(req,res) =>{
    let userUsername = req.body.user_username;

    if (!userUsername) {
        res.status(400).json({
            message:'Please provide username'
        });
    }
    else{
        try {
            var datauser = await user.findOne({
                where:{
                    user_username:userUsername
                }
            });
            if (datauser) {
                datauser.destroy()
                res.json({
                    message:`Delete user ${userUsername} successfully `,
                })
            } else {
                res.status(400).json({
                    message:`Not found user ${userUsername} `
                })
            }
        } catch (error) {
            res.json({
                message:'err find deleteUser',
                error:error
            })
        }
    }
}

exports.login = async(req,res) =>{
    let userUsername = req.body.user_username
    let userPassword = req.body.user_password
    let sessionLogin = req.session.login = true
    let sessionAge = req.session.cookie.maxAge = 10000 //มิลลิเซค

    try {
        var datauser = await user.findOne({
            where:{
                user_username:userUsername,
                user_password:userPassword
            }
        });
    } catch (error) {
        res.json({
            message:'err find login',
            error:error
        })
    }
    
    if (datauser) {
        let dataAuth = {
            message:`Auth success`,
            userToken:datauser.secretKey,
            sessionLogin : sessionLogin,
            sessionAge : sessionAge
        }
        res.json({
            Auth : dataAuth
        })
    } else {
        res.json({
            message:'Login failed username or password incorrect'
        })
    }
}

exports.checkToken = async(req,res) =>{
    let token = req.body.token
    let login = req.session.login
    try {
        var getUser = await user.findOne({
            where:{
                secretKey:token
            }
        });
    } catch (error) {
        res.json({
            message:'err find checkToken',
            error:error
        })
    }

    if (login) {
        if (getUser) {
            res.json({
                message:'Auth success',
                user:getUser
            })
        } else {
            res.json({
                message:'Auth Failed'
            })
        }
    } else {
        res.json({
            message:'session expired please login'
        })
    }

   
}

