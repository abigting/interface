/**
 * @description 入口文件
 * @author Feng.xiuting
 * @date 2020/3/29
 */
const { app, pool } =require('./connect')
const user = require('./router/user')
let login= false;
app.all('*', (req, res, next) => {
  // if(!login) return res.json('未登陆')
  //这里处理全局拦截，一定要写在最上面
  next()
})
app.get('/', (req,res) => {  //首页路由
  res.sendFile(__dirname+'/'+'index.html')
/*  res.json 以json对象的形式返回去
  res.send 以也页面的形式返回去
  res.download以文件的方式返回去，前端请求会下载此文*/
})
app.all('/', (req, res) => {
  pool.getConnection((err, conn) => {
    res.json({ type: 'test'})
    pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
  })
})
app.use('/user', user)
app.listen(8088, () => {
  console.log('服务启动','localhost:8088')
})
