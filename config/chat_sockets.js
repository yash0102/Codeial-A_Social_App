
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer ,{         
            allowEIO3: true,
            cors:{             
                origin:'http://localhost:8000',
                methods:['GET','POST']         
            }  
       });


    // this will receive the connection request
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });
    });
}