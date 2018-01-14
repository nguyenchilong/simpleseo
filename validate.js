'use strict';
var fs = require('fs'),
	seo = require('./seo'),
	argv = require('optimist')
	.demand('f')
	.alias('f', [ 'file', 'filename' ])
	.describe('f', "The path to html file for validate SEO.")
	.alias('r', ['rule'])
	.describe('r', 'The path to rules.txt file with json format.')
	.default('r', 'rules.txt')
	.argv;

if(argv.file != '' && argv.file != undefined && fs.existsSync(argv.file)){
	if(argv.r != '' && argv.r != undefined && fs.existsSync(argv.r)){
		var rules = fs.readFileSync(argv.r, 'utf8'),
			message = seo.SimpleSEO(argv.file, JSON.parse(rules));
		if(typeof message == 'object'){
			console.log('Detect SEO missing ================================ ');
			var i = 0;
			for(var msg in message){
				if(message[msg] != ''){
					console.log((i + 1)+'. '+message[msg]);
					i++;
				}
			}
		}
	} else {
		console.log('Please check again path to file rules.');
		process.exit();
	}
} else {
	console.log('Please check again path to file html.');
	process.exit();
}

/*
var rules = {
	"title": "required",
	"meta[name=descriptions]": "required",
	"meta[name=keywords]": "required",
	"strong": {
		"more": 15
	},
	"h1": {
		"more": 1
	},
	"img": {
		"has_attr": "alt",
		"count": ""
	},
	"a": {
		"has_attr": "rel"
	}
};
 */