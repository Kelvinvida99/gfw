

//OBJECT TO SEND TO select.php
var selectObj = `{
    "entity":"goku",
    "sortBy":"id",
    "sortDirection":"ASC",
    "limit1":"0",
    "limit2":"10",
    "mainFilter":{"fields":["name","__ssn"],"values":["zzzz","333"]},
    "andFilter":{"fields":[],"values":[]}
}`;

//OBJECT TO SEND TO selectOne.php
var selectOneObj = `{
    "entity":"goku",
    "id":"1"
}`;


//OBJECT TO SEND TO preInsert.php 
var preInsertObj = `{
    "entity":"goku"
}`;

//lock unlock user
var Unlockusers = `{
    "status":"true",
    "reason":"me giede la vida",
    "usersIds":["1","2"]
}`;

var lockUsers = `{
    "status":"false",
    "reason":"me giede la vida",
    "usersIds":["1","2"]
}`;

var autocomplete = `{
    "entity":"goku",
    "mainFilter":["last_name, __ssn", "USERINPUT", "USERINPUT", ]
}`;
//use this for autocompelte
mainFilter: { fields:[], values:[] },


//OBJECT TO SEND TO insert.php
var updateObj = `{
    "entity":"goku",//clocks
    "fields": ["name","last_name","__ssn","patientId"],
    "values": ["Yeison","Pena","123456789","36"],
    "multiTables":[
        {
            "tableName": "goku_vs_countries", 
                "dataToInsert":[
                    {"name":"USA","dateVisited":"2021-01-28"},
                    {"name":"RUSA","dateVisited":"2021-02-27"}
                ],
                "dataToUpdate":[
                    {"id":"7","name":"DR","dateVisited":"2021-05-28","deleted":"0"},
                    {"id":"8","name":"PR","dateVisited":"2021-05-27","deleted":"0"}
                ]
        },
        {
            "tableName": "goku_vs_powers", 
                "dataToInsert":[ 
                    {"__name":"air","powerValue":"110"},
                    {"__name":"earth","powerValue":"75"}
                ],
                "dataToUpdate":[
                    {"id":"8","__name":"fire24","powerValue":"100","deleted":"0"}
                    {"id":"7","__name":"water77","powerValue":"90","deleted":"0"},
                ]
        }
    ]
}`;

entity.priveleges.file[];
var checkIfWriteFilePer = {entity: currentEntity, privilege: 'fileeadWrite'}

if(entity.priveleges.file.find(checkIfWriteFilePer )){

}


[
    {entity: currentEntity, privilege: 'readWrite'}
    {entity: currentEntity, privilege: 'filesWrite'}
    {entity: currentEntity, privilege: 'readWrite'}
    {entity: currentEntity, privilege: 'filesWrite'}
]

 { entity: currentEntity, privilege: 'filesWrite', privileteF:'filesWrite' }
 { entity: currentEntity, privilege: 'filesWrite', privileteF:'filesWrite' }




//OBJECT TO SEND TO update.php
var updateObj = `{
    "entity":"goku",
    "id":"1",
    "fields": ["name","last_name","__ssn"],
    "values": ["Yeison","Pena","123456789"],
    "multiTables":[
        {
            "tableName": "goku_vs_countries", 
                "dataToInsert":[
                    {"name":"USA","dateVisited":"2021-01-28"},
                    {"name":"RUSA","dateVisited":"2021-02-27"}
                ],
                "dataToUpdate":[
                    {"id":"7","name":"DR","dateVisited":"2021-05-28","deleted":"0"},
                    {"id":"8","name":"PR","dateVisited":"2021-05-27","deleted":"0"}
                ]
        },
        {
            "tableName": "goku_vs_powers", 
                "dataToInsert":[ 
                    {"__name":"air","powerValue":"110"},
                    {"__name":"earth","powerValue":"75"}
                ],
                "dataToUpdate":[
                    {"id":"7","__name":"water77","powerValue":"90","deleted":"0"},
                    {"id":"8","__name":"fire24","powerValue":"100","deleted":"0"}
                ]
        }
    ]
}`;

//OBJECT TO SEND TO delete.php
var deletetObj = `{
    "entity":"goku",
    "ids":["1","2","3"]
}`;



//SETTINGS

var settings = {
	"authentication": {
		"val": "ok"
	},
	"authorization": {
		"val": "ok"
	},
	"error": {
		"val": "ok"
	},
	"data": [{
		"id": "36",
		"name": "gosive ",
		"right": "user",
		"avatar": ".\/css\/img\/pic\/gosive.png",
		"bg": "#0AED",
		"wsPort": "8000",
		"company": "gosive",
		"timeZone": "America\/New_York",
		"leftnav": [{
			"entity": "goku",
			"privilege": "readWrite"
		}, {
			"entity": "goku",
			"privilege": "filesWrite"
		}]
	}],
	"availableRowsWithFilters": "0",
	"multiTables": [],
	"file": []
}