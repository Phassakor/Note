var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000
const app = express();

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));
//ต้องใช้ในการอ่านข้อมูล ของ post ใน req.body 
//app.use(bodyParser.urlencoded({extended : true})); แบบเดิม //true vs false ไม่รู้ต่างกันไง
//app.use(bodyParser.json()); แบบเดิม
app.use(express.urlencoded({extended: false})); //แบบใหม่ ไม่ต้องเรียกใช้ bodyParser แล้ว
app.use(express.json());//แบบใหม่
app.use(cors()) // เพื่อให้ react หรือ frontend ดึง api จาก node js ได้
app.use(cookieParser())

require('./routing/index')(app);

app.listen(port, () => {
    console.log(`Listening on 1 http://localhost:${port}`)
  })

module.exports = app;
