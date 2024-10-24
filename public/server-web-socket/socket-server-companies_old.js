

const server = require('ws').Server;


const companies = [ 
					{name:'gosive',   port: 8000, server: undefined, activeUsers:[] },
					{name:'promise',  port: 8001, server: undefined, activeUsers:[] },
				    {name:'zummtire', port: 8002, server: undefined, activeUsers:[] }
				  ]

companies.forEach((company)=>{
	company.server = new server({port:company.port})
})


module.exports = { companies: companies}