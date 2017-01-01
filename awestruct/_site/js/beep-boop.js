var secondsOfToneAudio = 30;

$( '.beep.button' ).on( 'mousedown', startBeepBoop );
$( window ).on( 'mouseup', stopBeepBoop );
$( window ).on( 'mouseleave', stopBeepBoop );
$( window ).on( 'keydown', checkForCtrlKeydown );
$( window ).on( 'keyup', checkForCtrlKeyup );

var beepBoop;
var alternateBeepBoop;
var beepBoopTimeinterval;
var currentlyBeeping = false;
var boopTimeout;

var currentInput = '';

initializeBeepBoop();

function initializeBeepBoop() {
	beepBoop = document.getElementById( 'beep-boop-1' );
	alternateBeepBoop = document.getElementById( 'beep-boop-2' );
	
	beepBoop.volume = 0;
	beepBoop.play();
	
	alternateBeepBoop.volume = 0;
	alternateBeepBoop.play();
	
	switchBeepBoop();
	beepBoopTimeinterval = setInterval(
		switchBeepBoop,
		( secondsOfToneAudio * 0.75 ) * 1000
	);
}

function startBeepBoop() {
	if ( currentlyBeeping ) { return; }
	currentlyBeeping = true;
	beepBoop.volume = 1;
	appendDotToMorseOutput();
	updateMorseOutput();
	boopTimeout = setTimeout( appendDashIfEnoughTimeLapsed, 150 );
	clearMessage();
}

function stopBeepBoop() {
	currentlyBeeping = false;
	beepBoop.volume = 0;
}

function switchBeepBoop() {
	var beepBoopIds = whichBeepBoopIds();
	var beepBoopId = beepBoopIds[ 1 ];
	var alternateBeepBoopId = beepBoopIds[ 0 ];
	
	beepBoop = document.getElementById( 'beep-boop-' + beepBoopId );
	alternateBeepBoop = document.getElementById( 'beep-boop-' + alternateBeepBoopId );
	
	beepBoop.currentTime = 0;
	alternateBeepBoop.volume = 0;
}

function whichBeepBoopIds() {
	if ( beepBoop.id === 'beep-boop-1' ) { return [ '1', '2' ]; }
	return [ '2', '1' ];
}


function checkForCtrlKeydown( keyEvent ) {
	if ( Utilities.keyCodeLookup( keyEvent ) === 'control' ) {
		startBeepBoop();
	}
}

function checkForCtrlKeyup( keyEvent ) {
	if ( Utilities.keyCodeLookup( keyEvent ) === 'control' ) {
		stopBeepBoop();
	}
}

function appendDotToMorseOutput() {
	currentInput += '.';
}

function appendDashIfEnoughTimeLapsed() {
	if ( beepBoop.volume === 1 ) {
		deleteLastInputCharacter();
		appendDashToCurrentInput();
		updateMorseOutput();
	}
}

function deleteLastInputCharacter() {
	if ( currentInput.length > 0 ) {
		currentInput = currentInput.substring( 0, currentInput.length - 1 );
	}
}

function appendDashToCurrentInput() {
	currentInput += '-';
}

function updateMorseOutput() {
	$( '.morse-output' ).html( currentInput );
}