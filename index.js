//发起请求
const {app, pool} = require('./connect');
const login = require('./one');

app.all('/',(req,res,next)=>{
 next()
});

app.all('/',(req,res)=>{
  pool.getConnection((err, conn)=>{
    res.json({a:'b'});
    conn.release();//释放连接池，等待别的连接使用
  })
});
app.use('/login', login);
