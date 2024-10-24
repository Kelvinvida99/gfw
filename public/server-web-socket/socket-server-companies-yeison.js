//const server = require('ws').Server;
const https = require('https');
const WebSocket = require('ws');
const fs = require('fs');


const server = https.createServer({
	cert: fs.readFileSync('beestock.gosive.com/demo.gosive.com.crt','utf8'),
	key: fs.readFileSync('beestock.gosive.com/demo.gosive.com.key','utf8')
  });/**/


  //const wss = new WebSocket.Server({ server });
 // server.listen(8021);





 const companies = [ 
	{name:'gosive',   port: 8090, server: undefined, activeUsers:[] }
  ]

/*

const companies = [ 
					{name:'gosive',   port: 8000, server: undefined, activeUsers:[] },
					{name:'promise',  port: 8001, server: undefined, activeUsers:[] },
				    {name:'zummtire', port: 8002, server: undefined, activeUsers:[] }
				  ]*/

companies.forEach((company)=>{
	//company.server = new server({port:company.port})
	server.listen(company.port)
	company.server = new WebSocket.Server({ server });

})


module.exports = { companies: companies}