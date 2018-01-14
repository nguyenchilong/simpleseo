'use strict';
var fs = require('fs'),
	cheerio = require('cheerio');

/**
 * parse html content to object
 * @param file
 * @param options
 * @returns {*}
 */
function parse_html(file, options) {
	var contents;
	if (fs.existsSync(file)) {
		contents = fs.readFileSync(file, 'utf8');
	}
	return cheerio.load(contents, options);
}

/**
 * validate rule and show message
 * @param rules   all rules need validate with json format
 */
function validate(file, rules) {
	var $ = parse_html(file), message = [];
	for(var index in rules){
		if(typeof rules[index] == 'object'){
			for(var key in rules[index]){
				var msg = valid_rule($, index, key, rules[index][key]);
				message.push(msg);
			}
		} else {
			var msg = valid_rule($, index, rules[index]);
			message.push(msg);
		}
	}
	return message;
}

/**
 * check rule
 * @param $       object html parser
 * @param element tag name need validate
 * @param rule    rule rule validate
 * @param agrv    value for multiple sub-rule
 * @returns {*}
 */
function valid_rule($, element, rule, agrv) {
	console.log('element, rule, agrv ', element, rule, agrv);
	var tag = $(element), message;
	switch(rule){
		case 'count':
			message = 'The ['+element+'] tag have total ['+tag.length+'] elements in this html';
			break;
		case 'more':
			message = (tag.length > agrv) ? 'The ['+element+'] tag have more '+agrv+' elements in this html' : '';
			break;
		case 'has_attr':
			var count = tag.length;
			if(count > 1){
				var total = 0;
				tag.each(function(i, elem) {
					var attr = $(this).attr(agrv);
					total = (attr == undefined || attr == '') ? (total + 1) : total;
					message = (attr == undefined || attr == '') ? 'The ['+element+'] tag missing total ['+total+'] ['+agrv+'] attribute' : '';
				});
			} else {
				var attr = tag.attr(agrv);
				message = (attr == undefined || attr == '') ? 'The ['+element+'] tag missing ['+agrv+'] attribute' : '';
			}
			break;
		case "required":
		default:
			message = (tag.length > 0) ? '' : 'The ['+element+'] tag is required.';
			break;
	}
	return message;
}

module.exports.SimpleSEO = validate;