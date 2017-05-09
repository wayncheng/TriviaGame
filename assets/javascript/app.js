// 500, 1k, 2k, 3k, 5k, 7k, 10k, 20k, 30k, 50k, 100k, 250k, 500k, 1m
$(document).ready(function(){
var examInfo = [
	{
		question: 'How many "friends" are there?',
		a: '12',
		b: '3',
		c: '5',
		d: '6',
		correct: 'd',
		reward: '0.50'
	},
	{
		question: 'What is the name of the coffee shop they always go to?',
		a: 'Central Perk',
		b: 'Central Park',
		c: 'Starbucks',
		d: 'Java Joes',
		correct: 'a',
		reward: '1'
	},
	{
		question: 'Which characters are siblings on the show?',
		a: 'Joey and Rachel',
		b: 'Monica and Ross',
		c: 'Joey and Chandler',
		d: 'Rachel and Ross',
		correct: 'b',
		reward: '2'
	},
	{
		question: 'How many seasons did the show run for?',
		a: '9',
		b: '12',
		c: '8',
		d: '10',
		correct: 'd',
		reward: '3'
	},
	{
		question: "What is Chandler's last name?",
		a: 'Bong',
		b: 'Bang',
		c: 'Bing',
		d: 'Jones',
		correct: 'c',
		reward: '5'
	},
	{
		question: "What is Ross's profession?",
		a: 'Paleontologist',
		b: 'Actor',
		c: 'Dinosaur guy',
		d: 'Polantologist',
		correct: 'a',
		reward: '7'
	},
	{
		question: "Who recieves the TV guide at Chandler and Joey's apartment every week?",
		a: 'Ms. Chanandler Bong',
		b: 'Chandler Bing',
		c: 'Joey Tribbiani',
		d: 'Chanandler Bong',
		correct: 'a',
		reward: '10'
	},
	{
		question: 'Under what circumstance does Ross cite for "cheating" on Rachel?',
		a: "Doesn't count if it's in London",
		b: 'Way too drunk',
		c: 'What happens in Vegas, stays in Vegas.',
		d: 'THEY. WERE. ON. A. BREAK.',
		correct: 'd',
		reward: '20'
	},
	{
		question: 'Before getting married, Monica insists on having something old, something new, borrowed, and something...',
		a: 'brewed',
		b: 'pruned',
		c: 'blue',
		d: 'pooped',
		correct: 'c',
		reward: '30'
	},
	{
		question: '?',
		a: 'No',
		b: 'This',
		c: 'No',
		d: 'No',
		correct: 'b',
		reward: '50'
	},
	{
		question: 'What is the answer for this question?',
		a: 'No',
		b: 'No',
		c: 'This',
		d: 'No',
		correct: 'c',
		reward: '100'
	},
	{
		question: 'What is the answer for this question?',
		a: 'This',
		b: 'No',
		c: 'No',
		d: 'No',
		correct: 'a',
		reward: '250'
	},
	{
		question: 'What is the answer for this question?',
		a: 'No',
		b: 'No',
		c: 'No',
		d: 'This',
		correct: 'd',
		reward: '500'
	},
	{
		question: 'What is the answer for this question?',
		a: 'No',
		b: 'This',
		c: 'No',
		d: 'No',
		correct: 'b',
		reward: '1000'
	},
];

var intervalId;
var $c = $('#circle');
var $r = $('#reward');

//  stopwatch object.
var stopwatch = {
  time: 0,
  reset: function() {
    stopwatch.time = 0;
    $('#timer').text('60');
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
    var t = 60 - stopwatch.time;
    var pct = t/60;

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

var round = 0;
var userAns;
var set;

// $(document).ready(init());

$('#submit').on('click', stopwatch.stop);
$('#submit').on('click', submit);

function init(){
	set = examInfo[round];

	// Display reward amount
	$('#reward').text('For...$' + set.reward);

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
	$('.choice.wrap').removeClass('selected');
	$(this).addClass('selected');

	userAns = $(this).attr('id');
	console.log('userAns',userAns);
	
	if ( typeof(userAns) === 'string' ) {
		$('#submit').css('background-color','#f1c40f');

	}
	else {
		$('#submit').css('background-color','#95a5a6');
	}
}


function submit(){
	// check answer
	if( userAns === set.correct ) {
		console.log('correct answer!');
		// next question
		round++;

		// Display value of next question
		$r.text('Correct!');

		// initiate next round
		setTimeout(init,2000);
	}
	else {
		console.log('you lose!');
		$r.text('Wrong! Game Over.');
	}
}



function begin(){
	$('#timer-container').css('display','inline-block');
	$('#reward').css('font-size','40px')
	init();
	$('#ready').hide();
	$('#submit').show();
}
// Bind begin() to ready button on click
$('#ready').on('click', begin);

console.log(typeof(userAns));


}); ////////////////////////////// end document ready