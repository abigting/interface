//公用方法-连接数据库
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser=require('body-parser');//解析参数
const app = express();
const router = express.Router();
const option={
  host:'localhost',
  user:'test',
  password:'123456',
  port:'3306',
  database:'fionatest',
  connectTimeout: 5000,
  multipleStatements: false
}
app.use(cors());//解决跨域
app.use(bodyParser.json());//json请求
app.use(bodyParser.urlencoded({extended: false}));//表单请求
app.listen(80,()=>console.log('服务启动'));
let pool;
repool();
const conn = mysql.createConnection(option);

function Result({code=1, msg='',data={}}){
  this.code=code;
  this.msg=msg;
  this.data=data;
}

function repool(){
  pool=mysql.createPool({
    ...option,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
  });
  pool.on('error', err=>err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool,2000));
  // app.all('*',(req,res,next)=>pool.getConnection(err=>err && setTimeout(repool,2000)||next()));
}
module.exports={pool,Result,router, conn, app};
