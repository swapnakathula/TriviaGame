var myQuestions = [
	{
		question: "What is the capital of Minnesota?",
		answers: {
			a: 'Minneapolis',
			b: 'saint paul',
			c: 'shakopee'
		},
		correctAnswer: 'b'
	},
	{
		question: "What is the length of the Mississippi River?",
		answers: {
			a: '2,000 mi',
			b: '2,500 mi',
			c: '2,320 mi'
		},
		correctAnswer: 'c'
	}
];

var count = 30;

$( document ).ready(function() {
	$('#submit').hide();
	function showQuestions(questions) {
		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers;

		// for each question...
		for (var i = 0; i < questions.length; i++) {

			// first reset the list of answers
			answers = [];

			// for each available answer...
			for (letter in questions[i].answers) {

				// ...add an html radio button
				answers.push(
					'<label>'
					+ '<input type="radio" name="question' + i + '" value="' + letter + '">'
					+ letter + ': '
					+ questions[i].answers[letter]
					+ '</label>'
				);
			}

			// add this question and its answers to the output
			output.push(
				'<div class="question">' + questions[i].question + '</div>'
				+ '<div class="answers">' + answers.join('') + '</div>'
			);
		}

		// finally combine our output list into one string of html and put it on the page
		$('#quiz').append(output.join(''));
	}


	function showResults(questions) {

		$('#timer').hide();
		$('#quiz').hide();
		$('#submit').hide();

		// gather answer containers from our quiz
		var answerContainers = $(".answers");

		// keep track of user's answers
		var userAnswer = '';
		var numCorrect = 0;
		var inCorrect = 0;
		var unAnswered = 0;

		// for each question...
		for (var i = 0; i < questions.length; i++) {

			// find selected answer
			userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

			// if answer is blank
			if ($.trim(userAnswer) === "") {
				unAnswered++;
			}

			// if answer is correct
			else if (userAnswer === questions[i].correctAnswer) {
				// add to the number of correct answers
				numCorrect++;

			}
			// if answer is wrong or blank
			else {
				inCorrect++;
			}
		}

		// show number of correct answers out of total
		$('#results').append('All Done!');
		$('#results').append('<br>');
		$('#results').append('Correct Answers: ' + numCorrect);
		$('#results').append('<br>');
		$('#results').append('Incorrect Answers: ' + inCorrect);
		$('#results').append('<br>');
		$('#results').append('Unanswered: ' + unAnswered);
	}

	// show questions when user first clicks on start button
	$("#start").on("click", function(){
		counter = setInterval(timer, 1000);
		showQuestions(myQuestions);
		$('#start').hide();
		$('#submit').show();
	});

	function timer() {
		if (count <= 0) {
			clearInterval(counter);
			showResults(myQuestions);
			return;
		}
		$("#timer").html("Time remaining: " + count + " secs");
		count--;
	}

	// on submit, show results
	$("#submit").on("click", function(){
		showResults(myQuestions);
	});

});
