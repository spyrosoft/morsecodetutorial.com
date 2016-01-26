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
			'title' : 'A Through Z'
		},
		{
			'id' : 'numbers',
			'title' : '0 Through 9',
			'intro' : 'Note the pattern. All numbers are five characters, beginning with all dashes. Dashes are substituted for dots one at a time from left to right. Then again dots are replaced with dashes from left to right.\n\n1 0 ----- 1 .---- 2 ..--- 3 ...-- 4 ....- 5 ..... 6 -.... 7 --... 8 ---.. 9 ----.'
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
}

displaySection();



function loadSection( section ) {
	$( '.section-title' ).html( section.title() );
	message( section.intro() );
}

$( 'input.answer' ).on( 'keydown', clearMessage );
$( 'input.answer' ).on( 'keydown', checkAnswer );

function checkAnswer() {
	var currentAnswer = $( '.answer' ).val();
	if ( currentAnswer === '' ) { return; }
	var correctAnswer = morseSection.currentProblem().answer();
	if ( morseSection.checkAnswer( currentAnswer ) ) {
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
	$( '.message' ).html( message );
}

function clearMessage() {
	message( '&nbsp;' );
}