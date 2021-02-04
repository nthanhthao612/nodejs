var express = require("express");
var app = express();
app.use(express.static("public"));
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.set("view engine","ejs");
app.set("views","./views");
server.listen(8888);
var userArray = ["aaa"];
io.on("connection",function(socket){
    console.log("co ket noi");
    socket.on("dk-user",function(data){
        console.log(data);
        if(userArray.indexOf(data)>=0)
        {
            socket.emit("dk-thatbai");  
        }
        else
        {
            console
            userArray.push(data);
            socket.UserName = data;
            io.sockets.emit("list-user",userArray);
            socket.emit("dk-thanhcong",data);
        }
    })
    socket.on("logout",function(){
        userArray.splice(userArray.indexOf(socket.UserName),1);
        socket.emit("da-logout");
        io.sockets.emit("list-user",userArray);
    })
    socket.on("client-send-msg",function(data){
        console.log(data);
        io.sockets.emit("server-send-msg",{un:socket.UserName,nd:data});
    })
})
app.get("/",function(req,res){
    res.render("trangchu");
})
