var nodes7 = require('nodes7');  // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
var conn = new nodes7;
var tags = require('./tags')

const vars = Object.keys(tags)

const host = {
	port: 102,
	host: '192.168.0.1',
	rack: 0,
	slot: 1
}

conn.initiateConnection( host, connected); 
function connected(err) {
	if (typeof(err) !== "undefined") {
		console.log(err);
		process.exit();
	}
	conn.setTranslationCB(function(tag) {return tags[tag];}); 	// This sets the "translation" to allow us to work with object names
	conn.addItems(vars);

	//conn.writeItems(['F01_MA','F01_G1', 'F01_G2', 'F01_G3', 'F01_G4', 'F01_G5' ], [true, true, false, true, true, true], valuesWritten);  
	setInterval (function(){

		conn.readAllItems(valuesReady);

	},1000);

	
}

function valuesReady(anythingBad, values) {
	if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
	console.log('Entrada 1: ', values.PB_I1)
	console.log('Salida 1: ', values.P9_I7)
	
	console.log('Temporizador: ', values.PB_T1)
}

function valuesWritten(anythingBad) {
	if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
    console.log("Done writing.");
    
}