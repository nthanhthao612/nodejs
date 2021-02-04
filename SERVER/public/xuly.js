var socket = io("http://localhost:8888");
socket.on("dk-thatbai",function(){
    alert("dang ky that bai");
});
socket.on("list-user",function(data){
    $("#dsUser").html("");
    data.forEach(function(i){
        $("#dsUser").append("<div class='user'>"+i+"</div>");
    });
})
socket.on("dk-thanhcong",function(data){
    $("#loginUser").append(" "+data);
    $("#chatform").show(1500);
    $("#loginform").hide(1000);
})
socket.on("da-logout",function(){
    alert("bye!");
    $("#loginform").show(1500);
    $("#chatform").hide(1000);
})
socket.on("server-send-msg",function(data){
    $("#boxMessage").append("<div>"+data.un+":"+data.nd+"</div>");
})
$(document).ready(function(){
    $("#loginform").show(1500);
    $("#chatform").hide(1000);
    $("#btnLogin").click(function(){
        socket.emit("dk-user",$("#txtUserName").val());
    })
    $("#btnSend").click(function(){
        socket.emit("client-send-msg",$("#textInput").val());
    })
    $("#btnLogout").click(function(){
        socket.emit("logout");
    })
})