let express = require('express');
let app = express();
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}));

app.route('/name')
  .get((req, res)=>{
  res.json({'name':req.query.first+' '+req.query.last})
  })
  .post((req, res)=>{
  res.json({'name':req.body.first+' '+req.body.last})
  })

app.get('/:word/echo', function(req, res){
  res.json({'echo':req.params.word})
})


// 
app.get('/now', function(req, res, next){
  req.time = new Date().toString();
  next();
}, function(req,res){
  res.json({time: req.time})
})

// middleware
app.use(function(req, res, next){
  console.log(req.method+" "+req.path+" - "+req.ip);
  next()
})


// server .env
app.get('/json', function(req, res){
if (process.env.MESSAGE_STYLE === "uppercase")
{
    res.json({"message": "HELLO JSON"})
}
else {
    res.json({"message": "Hello json"})
}
})

// serve static
app.use('/public', express.static(__dirname+'/public'))

// serve html
app.get('/',(req, res)=>{
  res.sendFile(__dirname+"/views/index.html")
})

// app.get('/', (req, res)=>{
//   res.send('Hello Express')
// })



































 module.exports = app;
