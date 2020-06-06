var express = require('express');
var app = express();
var parser = require('body-parser');
var eventemitter = require('events');

var cors = require('cors');
const Stream  = new eventemitter();

app.use(cors());
app.use(parser.json());

app.use(
    parser.urlencoded({
        extended:true
    })
)
app.get('/',function(req,res,next){
    res.writeHead(200,{
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache',
        Connection:'keep-alive'
    });
    Stream.on('push',function(event, data){
        res.write('event: '+ String(event) +'\n'+'data: '+JSON.stringify(data)+'\n\n');
    });
})
let l = 51.673858;
let a =7.815982;

setInterval(() => {
    l = l + 0.100000;
    a = a + 0.100000;
    let r={
        'lat':l,
        'lng':a,
        'timeStamp': new Date()
    }
    Stream.emit('push','message',{route:r});
}, 1000);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});