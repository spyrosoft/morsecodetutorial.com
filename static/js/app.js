$(document).foundation();

$( '.beep.button' ).on( 'mousedown', beepBoop );
$( window ).on( 'mouseup', stopBeepBoop );

var outputAudio = document.getElementById( 'beep-boop' );

function beepBoop() {
	outputAudio.play();
}

function stopBeepBoop() {
	outputAudio.pause();
	outputAudio.currentTime = 0;
}