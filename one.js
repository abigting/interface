//具体请求内容
const {conn,Result,router} = require('./connect');

router.get('/',(req,res)=>{
  conn.query('SELECT * FROM student', (e,r)=>res.json(new Result({data:r})));
})
module.exports = router;

