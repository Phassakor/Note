const testController = require("../controllers/testController");
const userController = require("../controllers/userController");
const lotteryController = require("../controllers/lotteryController");
const webclone = require("../controllers/webCloneController");

module.exports = (app) => {
  
    app.get("/", (req, res) => {
      var host = req.get("host");
      res.json(`SIGNALING OKAY TO ` + host+' by Osas and I-cona');
    });
    //test
    app.post("/getTest", testController.getTest);
    app.get('/login', testController.login);
    app.post("/auth", testController.auth);
    app.get("/getStr", testController.getStr);
    app.get("/home", testController.home);
    //test fifa
    app.get("/userLogin",testController.userLogin);
    app.get("/getUserfifa",testController.getUser);
    app.get("/getUserfifa/:id",testController.getUserByID);
    app.post("/loginUser",testController.loginUser);
    app.post("/registerUser",testController.registerUser);
    //app.post("/checkUser",testController.checkUser);
    app.get("/userHomeLogin",testController.userHomeLogin);
    app.get("/logout",testController.logout);
    // app.get("/getDay",testController.getDay);
    // app.post("/test",testController.test);


    //user
    app.get("/getUser",userController.getUser);
    app.get("/getUser/:id",userController.getUserbyID);
    app.post("/insertUser",userController.insertUser);
    app.post("/updateUser",userController.updateUser);
    app.post("/updateWalletUser",userController.updateWalletUser);
    app.post("/bannedUser",userController.bannedUser);
    app.post("/unBannedUser",userController.unBannedUser);
    app.post("/deleteUser",userController.deleteUser);
    app.post("/login",userController.login);

    app.post("/checkToken",userController.checkToken);

    //lottery
    app.post("/openLotteryByRoundID",lotteryController.openLotteryByRoundID);
    app.post("/checkLotteryOpen",lotteryController.checkLotteryOpen);
    app.post("/buyLottery",lotteryController.buyLottery);
    app.post("/checkLottery",lotteryController.checkLottery);
    app.post("/sendResultLottery",lotteryController.sendResultLottery);
    app.post("/closeBillLotteryByRoundeID",lotteryController.closeBillLotteryByRoundeID);
    app.post("/checkLotteryResultByRound",lotteryController.checkLotteryResultByRound);


    app.post("/test",lotteryController.test);
    app.post("/sendCookie",lotteryController.sendCookie);
    app.post("/testCookie",lotteryController.testCookie);
    app.post("/destroySession",lotteryController.destroySession);


    //webclone
    app.post("/loginClone",webclone.loginClone);
    app.post("/registerClone",webclone.registerClone);
    app.get("/lookchin",webclone.lookchin);
};