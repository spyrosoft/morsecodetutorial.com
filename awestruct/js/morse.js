// --------------------Populate the Tutorial--------------------
var data = {
	
	'alphabet-morse' : [
		'.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....', '..', '.---',
		'-.-', '.-..', '--', '-.', '---', '.--.', '--.-', '.-.', '...', '-',
		'..-', '...-', '.--', '-..-', '-.--', '--..'
	],
	
	'alphabet-characters' : [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
		'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
		'U', 'V', 'W', 'X', 'Y', 'Z'
	],
	
	
	'numbers-morse' : [
		'-----', '.----', '..---', '...--', '....-',
		'.....', '-....', '--...', '---..', '----.'
	],
	
	'numbers-characters' : [
		'0', '1', '2', '3', '4',
		'5', '6', '7', '8', '9'
	], 
	
	
	'punctuation-morse' : [
		'.-.-.-', '--..--', '..--..', '.----.', '-.-.--',
		'.-...', '---...', '-.-.-.', '.-..-.'
	],
	
	'punctuation-characters' : [
		'.', ', ', '?', '\'', '!',
		'&', ':', ';', '"'
	],
	
	
	'misc-morse' : [
		'-..-.', '-.--.', '-.--.-', '-....-', '.-.-.',
		'-.....-', '..--.-', '.--.-.', '...-..-'
	],
	
	'misc-characters' : [
		'/', '(', ')', '=', '+',
		'-', '_', '@', '$'
	]
};

var morse = new Tutorial();

// Populate the tutorial in a clojure to avoid namespace collisions
(function() {
	var sectionsData = [
		{
			'id' : 'alphabet',
			'title' : 'A Through Z',
			'intro' : 'Let\'s learn some letters!\n\nThe most common letters have the fewest dots and dashes.'
		},
		{
			'id' : 'numbers',
			'title' : '0 Through 9',
			'intro' : 'There is an easy to remember pattern. All numbers are five long. Dashes are swapped with dots one at a time from left to right. Then when dashes run out, dots are replaced with dashes from left to right. Take a look:\n\n1 0 ----- 1 .---- 2 ..--- 3 ...-- 4 ....- 5 ..... 6 -.... 7 --... 8 ---.. 9 ----.'
		},
		{
			'id' : 'punctuation',
			'title' : 'Punctuation'
		},
		{
			'id' : 'misc',
			'title' : 'Miscellaneous'
		}
	];
	
	for ( var sectionIndex in sectionsData ) {
		var sectionMeta = sectionsData[ sectionIndex ];
		if ( typeof sectionMeta[ 'intro' ] === 'undefined' ) {
			sectionMeta[ 'intro' ] = '';
		}
		var section = morse.addSection(
			sectionMeta[ 'id' ],
			sectionMeta[ 'title' ],
			sectionMeta[ 'intro' ]
		);
		
		var currentSectionData = data[ sectionMeta[ 'id' ] + '-morse' ];
		for ( var i in currentSectionData ) {
			section.addProblem(
				data[ sectionMeta[ 'id' ] + '-characters' ][ i ],
				data[ sectionMeta[ 'id' ] + '-characters' ][ i ],
				data[ sectionMeta[ 'id' ] + '-morse' ][ i ]
			);
		}
	}
})();






// --------------------Tutorial Content--------------------

var morseSection = morse.currentSection();

function displaySection() {
	$( '.section-title' ).html( morseSection.title() );
	message( morseSection.intro() );
	$( '.beep-input' ).show();
}

displaySection();

function loadCurrentProblem() {
	var currentProblem = morseSection.currentProblem();
	if ( currentProblem === null ) {
		//TODO:
		console.log('No current problem loaded.')
	} else {
		$( '.prompt' ).html( currentProblem.prompt() );
	}
}

loadCurrentProblem();

function loadSection( section ) {
	$( '.section-title' ).html( section.title() );
	message( section.intro() );
}

$( 'input.answer' ).on( 'keydown', clearMessage );
$( 'input.answer' ).on( 'keydown', checkAnswer );

function checkAnswer() {
	if ( currentInput === '' ) { return; }
	var correctAnswer = morseSection.currentProblem().answer();
	if ( morseSection.checkAnswer( currentInput ) ) {
		answerIsCorrect();
	} else {
		answerIsIncorrect();
	}
}

function answerIsCorrect() {
	message( nextWordOfEncouragement() );
}

function answerIsIncorrect() {
	var explanation = morseSection.currentProblem().explanation();
	if ( explanation ) { message( explanation ); }
	else { message( 'Try again.' ); }
}

// Release some endorphins for the user when they answer problems correctly:
var wordsOfEncouragement = ['Excellent', 'Correct', 'Superb', 'Fantastic', 'Marvelous', 'Admirable', 'Ace', 'First-class', 'Dandy', 'Exquisite', 'Fantastic', 'Golden', 'Marvellous', 'Outstanding', 'Splendid', 'Magnificent', 'Smashing', 'Terrific', 'Topnotch', 'Tremendous', 'Wonderful', 'Champion', 'First-rate', 'Brilliant', 'Fabulous', 'Stunning', 'Commendable', 'Huzzah'];
var wordsOfEncouragementIndex = 0;

function nextWordOfEncouragement() {
	if ( wordsOfEncouragementIndex === wordsOfEncouragement.length ) {
		wordsOfEncouragementIndex = 0;
	}
	var wordOfEncouragement = wordsOfEncouragement[ wordsOfEncouragementIndex ];
	wordsOfEncouragementIndex++;
	return wordOfEncouragement;
}


function message( message ) {
	message = message.replace(/\n/g, '<br>');
	$( '.message' ).html( message );
}

function clearMessage() {
	message( '&nbsp;' );
}