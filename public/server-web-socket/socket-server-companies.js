
//import { Server as server } from 'socket.io';


//const server = require('socket.io').Server;

//const server = require('ws').Server;

const https 		  = require('https');
const fs			  = require('fs');
const { Server } 	  = require('socket.io');
const privateKeyPath  = 'beestock.gosive.com/key.key';// Rutas a los archivos del certificado SSL
const certificatePath = 'beestock.gosive.com/cert.crt';
const privateKey      = fs.readFileSync(privateKeyPath);// Cargar el certificado SSL
const certificate     = fs.readFileSync(certificatePath);
const credentials     = { key: 				  privateKey, 
						  cert: 			  certificate};


const companies = [ 
					{name:'gosive',   port: 8090, server: undefined, activeUsers:[] },
					{name:'promise',  port: 8091, server: undefined, activeUsers:[] },
				    {name:'zummtire', port: 8092, server: undefined, activeUsers:[] }
				  ]

companies.forEach((company)=>{

	const server = https.createServer(credentials); // Crear el servidor HTTPS

	server.listen(company.port); // Iniciar el servidor HTTPS en el puerto de la empresa

	//Crear un servidor de Socket.IO para cada empresa y se le agrega el parametro de cors permitiendo las conexiones desde otros servidores
	company.server = new Server(server, {
		cors: {
			//origin: 'http://localhost', //permitir conexiones solo de localhost, si es https se debe cambiar a https://localhost
			//credentials: true
			origin: 'https://beestock.gosive.com', //permitir conexiones solo de localhost, si es https se debe cambiar a https://localhost
			credentials: true
			
		}
	});


	
//	company.server = new Server(server);
})


module.exports = { companies: companies}