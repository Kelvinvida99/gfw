
//import { Server as server } from 'socket.io';


//const server = require('socket.io').Server;

//const server = require('ws').Server;

const http 		  = require('http');
const { options } = require('less');
const { Server } 	  = require('socket.io');



const companies = [ 
					{name:'gosive',   port: 8000, server: undefined, activeUsers:[] },
					{name:'promise',  port: 8001, server: undefined, activeUsers:[] },
				    {name:'zummtire', port: 8002, server: undefined, activeUsers:[] }
				  ]

companies.forEach((company)=>{

	const server = http.createServer((req,res) => {
res.end("SSL ADDED")

	}); // Crear el servidor HTTPS

	server.listen(company.port); // Iniciar el servidor HTTPS en el puerto de la empresa

	//Crear un servidor de Socket.IO para cada empresa y se le agrega el parametro de cors permitiendo las conexiones desde otros puertos
	company.server = new Server(server, {
		cors: {
			origin: '*',
			credentials: true
		}
	});
//	company.server = new Server(server);
})


module.exports = { companies: companies}