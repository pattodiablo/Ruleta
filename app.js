var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var allNetNames=[];
var allClients=[];
var fullEntities;
var conexionCounter=true;


app.get('/ruleta', function(req, res){
  console.log('a user try to connect by infront');
});

io.on('connection', function(socket){
  var estado=true;
  console.log("conexionCounter "+ conexionCounter);
  if(conexionCounter){
    console.log("----------------------------------------------");
    console.log("           x4 socket server enabled           ");
    console.log("----------------------------------------------");
    console.log("--------------------rocks---------------------");
    console.log("                                              ");
    conexionCounter=false;
    
    while(allClients.length > 0) {
    allClients.pop();
}
  }
  allClients.push(socket);
  console.log("-----------------conexion----------------------");
  console.log("                                              ");
  console.log('usuario conectado ' + socket.id);

  
  

    socket.on('disconnect', function(){
    console.log("---------------desconeccion-------------------");
    
    
      
  });

  socket.on('send Entities', function(netName){

        for(var i in allClients){ //verifica si esta conectado 
          if(allClients[i].id==netName){
             console.log('nuevo netName : ' + netName);
             allNetNames.push(netName);
             console.log("numero de NetNames: " + allNetNames.length);
             populateNewPlayer(netName);
          }

        };
    
  });

 

   socket.on('ask forPlayers', function(netName){
     console.log("----------------------------------------------");
     console.log('asking for players ');
      console.log(netName);
     populate(netName);
  });

var bool=false;
  socket.on('btn pressed', function(){
     console.log("----------------------------------------------");
     console.log('boton presionado ');
    
      if(bool){

        bool=false
      }else{

        bool=true;
      }

     console.log(bool);
      io.emit("StopTheShit",bool);
  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function populate(netName){
  for(var i in allClients){
    if(allClients[i]!=netName){
       populateNewPlayer(allClients[i].id);
    }
   
  }
	 io.emit("populating",allNetNames);
  
}

function populateNewPlayer(singlePlayer){
    io.emit("addSinglePlayer",singlePlayer);  
}