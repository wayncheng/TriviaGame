// 500, 1k, 2k, 3k, 5k, 7k, 10k, 20k, 30k, 50k, 100k, 250k, 500k, 1m
$(document).ready(function(){

$('.container.content').hide();
$('#page2').hide();


var examInfo = [
	{
		question: 'How many "friends" are there?',
		a: '12',
		b: '3',
		c: '5',
		d: '6',
		correct: 'd',
		reward: '0.50',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: 'What is the name of the coffee shop they always go to?',
		a: 'Central Perk',
		b: 'Central Park',
		c: 'Starbucks',
		d: 'Java Joes',
		correct: 'a',
		reward: '1',
		response: '',
		result: '',
	},
	{
		question: 'Which characters are siblings on the show?',
		a: 'Joey and Rachel',
		b: 'Monica and Ross',
		c: 'Joey and Chandler',
		d: 'Rachel and Ross',
		correct: 'b',
		reward: '2',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: 'How many seasons did the show run for?',
		a: '9',
		b: '12',
		c: '8',
		d: '10',
		correct: 'd',
		reward: '3',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: "What is Chandler's last name?",
		a: 'Bong',
		b: 'Bang',
		c: 'Bing',
		d: 'Jones',
		correct: 'c',
		reward: '5',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: "What is Ross's profession?",
		a: 'Paleontologist',
		b: 'Actor',
		c: 'Dinosaur guy',
		d: 'Polantologist',
		correct: 'a',
		reward: '7',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: "Who recieves the TV guide at Chandler and Joey's apartment every week?",
		a: 'Ms. Chanandler Bong',
		b: 'Chandler Bing',
		c: 'Joey Tribbiani',
		d: 'Chanandler Bong',
		correct: 'a',
		reward: '10',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: 'Under what circumstance does Ross cite for "cheating" on Rachel?',
		a: "Doesn't count if it's in London",
		b: 'Way too drunk',
		c: 'What happens in Vegas, stays in Vegas.',
		d: 'THEY. WERE. ON. A. BREAK.',
		correct: 'd',
		reward: '20',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: 'Before getting married, Monica insists on having something old, something new, borrowed, and something...',
		a: 'brewed',
		b: 'pruned',
		c: 'blue',
		d: 'pooped',
		correct: 'c',
		reward: '30',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: "What is the name of Ross's pet monkey from the earlier seasons of the show?",
		a: 'Mitchell',
		b: 'Marcel',
		c: 'Koko',
		d: 'Harambe',
		correct: 'b',
		reward: '50',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: "What are the names of Monica and Chandler's children?",
		a: 'Chandler Jr. and Erica',
		b: 'Jack and Judy',
		c: 'Jack and Erica',
		d: 'Bill and Colleen',
		correct: 'c',
		reward: '100',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: 'What is the Geller family newsletter called?',
		a: 'Geller Yeller',
		b: 'Geller Gazette',
		c: "What's up with Ross?",
		d: 'Geller Times',
		correct: 'a',
		reward: '250',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: 'How many categories of towels does Monica have?',
		a: '6',
		b: '7',
		c: '5',
		d: '11',
		correct: 'd',
		reward: '500',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
	{
		question: "What was Chandler Bing's job before he went into advertising?",
		a: 'Transponster',
		b: 'Statistical Factoring and Data Reconfiguration',
		c: 'Computer stuff',
		d: 'Data Analyst',
		correct: 'b',
		reward: '1000',
		response: '',
		result: '',
		loot: '',
		currency: '',
	},
];


var currency = "USD";
var intervalId;
var $c = $('#circle');
var $r = $('#reward');
var timeLeft;
var round = 0;
var userAns;
var set;

//  stopwatch object.
var stopwatch = {
  time: 0,
  outof: 10,
  reset: function() {
    stopwatch.time = 0;
    $('#timer').text(stopwatch.outof);
    $('#circle').circleProgress({ value: 1 })
  },
  start: function() {
      intervalId = setInterval(stopwatch.count, 1000);
  },
  stop: function() {
    clearInterval(intervalId);
  },
  count: function() {
    stopwatch.time ++;
    var t = stopwatch.outof - stopwatch.time;
    var pct = t/stopwatch.outof;
    timeLeft = t;
    // Stop stopwatch when it reaches 0;
    if ( t <= 0) {
    	stopwatch.stop();
    	submit();
	    $('#timer').text('0');
	    $('#circle').circleProgress({ value: 0 });
    }

    // Update percentage to circle
    $c.circleProgress({ 
    	value: pct,
    	animation: false
    });

    // Circle color depending on time left
    if ( pct <= 0.25 ) 
    	$c.circleProgress({ fill: '#e74c3c'})
    else if ( pct <= 0.5 )
    	$c.circleProgress({ fill: '#f1c40f'})
    else 
    	$c.circleProgress({ fill: '#2ecc71'})
    
    // Update timer text
    $('#timer').text(t);
  }
}


// $(document).ready(init());

$('#submit').on('click', stopwatch.stop);
$('#submit').on('click', submit);

function init(){
	// End game once all round are done.
	if ( round === examInfo.length ) {
		endGame();
		return;
	}

	// Current object in exam info
	set = examInfo[round];

	// Display reward amount
	$('#reward').text('For...$' + set.reward);

	// clear selections
	$('.choice.wrap').removeClass('selected').removeClass('correct-answer');
	$('correct-answer')
	// $('.choice.wrap').css('background-image','url(assets/images/choice-min.svg)');

	stopwatch.reset();
	stopwatch.start();

	userAns = 'e';
	select();

	$('#q').text(set.question);
	$('#a > .text').text(set.a);
	$('#b > .text').text(set.b);
	$('#c > .text').text(set.c);
	$('#d > .text').text(set.d);

	$('#submit').show();
	
	$('#circle').circleProgress({
		startAngle: -Math.PI/2,
		value: 1,
		size: 100,
		reverse: true,
		animation: true,
		fill: '#2ecc71'
	});
}

$('.choice.wrap').on('click', select);

function select(){
	// Toggle background-color for selection
	$('.choice.wrap').removeClass('selected');
	$(this).addClass('selected');

	// Set current selection as user response
	userAns = $(this).attr('id');
	set.response = userAns;
	
	if ( typeof(userAns) === 'string' ) {
		$('#submit').css('background-color','#f1c40f');
	}
	else {
		$('#submit').css('background-color','#95a5a6');
	}
}


function submit(){
	// display corerct answer
	// $(correctSel).css('background-image','url(assets/images/choice-min-green.svg)');
	// $('#'+set.correct).css('background-image','url(assets/images/choice-min-green.svg)');
	$('#'+set.correct).addClass('correct-answer');
	
	//After first loss
	var firstLossMsg = '';

	if( currency === "USD")
		firstLossMsg = ' You are now playing for doll hairs.'

	// check answer
	if( userAns === set.correct && timeLeft > 0 ) {
		console.log('correct answer!');
		$r.text('Correct!');
		set.result = 'Correct Answer';
		set.loot = set.reward;
		set.currency = currency;
		console.log(set.response, set.result, set.loot, set.currency);
		rerack();
	}
	else if ( timeLeft <= 0 ){
			
		console.log('timeout');
		currency = 'doll hairs';
		$r.text('Out of time!' + firstLossMsg);
		set.result = "Ran out of time"
		set.loot = 0;
		set.currency = currency;
		console.log(set.response, set.result, set.loot, set.currency);
		rerack();
	}
	else {
		console.log('Wrong!');
		currency = 'doll hairs';
		$r.text('Wrong!');
		set.result = "Wrong Answer"
		set.loot = 0;
		set.currency = currency;
		console.log(set.response, set.result, set.loot, set.currency);
		rerack();
	}
	// rerack();
}


function rerack(){
	// next question
	round++;
	// initiate next round
	setTimeout(init,2000);
}



function begin(){
	$('#timer-container').css('display','inline-block');
	$('#reward').css('font-size','40px')
	init();
	$('#ready').hide();
	$('#submit').show();
	$('.container.content').show();
	$('#page-title').css('padding-top','10vh');
}
// Bind begin() to ready button on click
$('#ready').on('click', begin);
$('#endgame').on('click',endGame);
function endGame(){
	console.log('-----GAME OVER-----')
	$('#scorecard').show();

	// Write all results to table
	// For ever round...
	for (var i=0; i<examInfo.length; i++) {
		var set = examInfo[i];
		var tr = $('<tr/>');
		var td = $('<td/>');
		var th = $('<th/>');
		var rowClass = 'row-'+i;
		// console.log('set',set);
		var cols = ['question','response','correct','result','loot','currency'];
		// No. column
		td.text(i+1);
		td.addClass('col-0');
		tr.append(td);
		tr.addClass(rowClass);
		// For every column...	
		for (var j=0; j<cols.length; j++) {
			var td = $('<td/>');
			var c = cols[j];
			var x = set[c];
			var colNum = j+1
			var colClass = 'col-'+colNum;
			td.text(x).addClass(colClass);
			tr.append(td);
		};

		$('tbody').append(tr);
	};

	$('.container.content').hide();
	$('#main').css('height','initial');
	$('#page2').show();
	$('button').hide();
	$('#reward').hide();
	$('#timer-container').hide();
}

}); ////////////////////////////// end document ready