$(document).ready(function(){
	var examInfo = [
		{
			question: 'How many states are in the USA?',
			a: '48',
			b: '49',
			c: '13',
			d: '50',
			correct: 'd'
		},
		{
			question: 'What is my name?',
			a: 'Wayne',
			b: 'Batman',
			c: 'Blaine',
			d: 'Dwayne',
			correct: 'a'
		},
		{
			question: 'What is the capitol of California?',
			a: 'San Francisco',
			b: 'Sacramento',
			c: 'Los Angeles',
			d: 'Washington D.C.',
			correct: 'b'
		},
	];

var round = 0;

	// $('.choice').each(function(){
	// 	$(this).prepend($(this).attr('value').toUpperCase());
	// });

	var set = examInfo[round];

	// var q = set.question
	$('#q').text(set.question);
	$('#a > .text').text(set.a);
	$('#b > .text').text(set.b);
	$('#c > .text').text(set.c);
	$('#d > .text').text(set.d);


$('#timer-container').click('on',countdown);

function countdown(){

};



}); ////////////////////////////// end document ready