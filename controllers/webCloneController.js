const webclone = require('../models/tableWebClone');
//const sha256 = require('crypto-js/sha256');


exports.loginClone = async(req,res) =>{
    let userEmail = req.body.email
    let userPassword = req.body.password

    try {
        var datalogin = await webclone.findOne({
            where:{
                email:userEmail,
                password:userPassword
            }
        });
    } catch (error) {
        res.json({
            message:'err',
            error:error
        })
    }

    if (datalogin == null) {
        res.json({
            message:'Login failed email or password incorrect'
        })
    } else {
        res.json({
            message:'Login success',
            data:datalogin
        })
    }
}

exports.registerClone = async(req,res) =>{
    let userEmail = req.body.email
    let userPassword = req.body.password
    let firstName = req.body.firstname
    let lastName = req.body.lastname
    let mobilePhone = req.body.mobilephone
    let dateOfBirth = req.body.date_of_birth
    let Bank = req.body.bank
    let bankAccountNumber = req.body.bank_account_number
    let codeNameTeam = req.body.code_name_team
    let lineOA = req.body.line_OA
    let rewardAll = Math.floor(Math.random() * 900000)+100000;
    let rewardToday = Math.floor(Math.random() * 90000)+10000;
    let profitAll = Math.floor(Math.random() * 600000)+100000;

    let insertUser = {
        email:userEmail,
        password:userPassword,
        firstname:firstName,
        lastname:lastName,
        mobilephone:mobilePhone,
        date_of_birth:dateOfBirth,
        bank:Bank,
        bank_account_number:bankAccountNumber,
        code_name_team:codeNameTeam,
        line_OA:lineOA,
        reward_All:rewardAll,
        reward_today:rewardToday,
        profit_all:profitAll
    }

    try {
        var datauser = await webclone.findOne({
            where:{
                email:userEmail
            }
        });
    } catch (error) {
        res.json({
            message:'err registerClone'
        })
    }

    if (datauser) {
        res.json({
            message:'This email has already been used',
        })
    }else{
        await webclone.create(insertUser);
        res.json({
            message:'register seccessfully',
        })
    }

}


exports.lookchin = async(req,res) =>{
    // const open = require('open');
    // open('https://www.youtube.com/', {app: 'firefox'});
    res.send('connect')
}

/*
// blockChain concept https://www.youtube.com/watch?v=R6ts8hJGlGU&t=1208s
class Block{
    constructor(
        index,
        timestamp,
        transaction,
        precedingHash = ''
    ){
        this.index = index;
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
    }

    computeHash(){
        return sha256(
            this.index +
            this.precedingHash +
            this.timestamp +
            JSON.stringify(this.transaction)
        ).toString();
    }
}

class BlockChain{
    constructor(){
        this.id = '';
        this.name = '';
        this.blockchain = '';
        this.difficulty = '';
    }

    create(id,name,genesis){
        this.id = id;
        this.name = name;
        this.blockchain = [this.startGenesisblock(genesis)];
        this.difficulty = 4;
    }

    startGenesisblock(genesis){
        return new Block(
            0,
            genesis.date,
            genesis.transaction,
            "0"
        );
    }

    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length-1];
    }

    addNewBlock(newBlock){
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);
    }

    checkChainValidity(){
        for (let i = 0; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i-1];
            
            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.precedingHash !== precedingBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

class MilerCoin{
    constructor(){
        this.chain = [];
    }

    validateNewChain = (req,res,next) =>{
        if (req.body) {
            if (req.body.id &&
                req.body.name &&
                req.body.genesis &&
                req.body.genesis.date &&
                req.body.genesis.transaction)
                {
                    next();
            }else{
                res.status(404).json({message:'GGez'})
            }
        }else{
            res.status(404).json({message:'GGez'})
        }
    }

    createNewChain
}
*/
