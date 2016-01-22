$(document).foundation();

var full_morse_code = new Array('.-','-...','-.-.','-..','.','..-.','--.','....','..','.---','-.-','.-..','--','-.','---','.--.','--.-','.-.','...','-','..-','...-','.--','-..-','-.--','--..','-----','.----','..---','...--','....-','.....','-....','--...','---..','----.','.-.-.-','--..--','..--..','.----.','-.-.--','.-...','---...','-.-.-.','.-..-.','-..-.','-.--.','-.--.-','-....-','.-.-.','-.....-','..--.-','.--.-.','...-..-');
var full_characters = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','.',',','?','\'','!','&',':',';','"','/','(',')','=','+','-','_','@','$');

var morse_code_alphabet = new Array('.-','-...','-.-.','-..','.','..-.','--.','....','..','.---','-.-','.-..','--','-.','---','.--.','--.-','.-.','...','-','..-','...-','.--','-..-','-.--','--..');
var characters_alphabet = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

var morse_code_numbers = new Array('-----','.----','..---','...--','....-','.....','-....','--...','---..','----.');
var characters_numbers = new Array('0','1','2','3','4','5','6','7','8','9');

var morse_code_punctuation = new Array('.-.-.-','--..--','..--..','.----.','-.-.--','.-...','---...','-.-.-.','.-..-.');
var characters_punctuation = new Array('.',',','?','\'','!','&',':',';','"');

var morse_code_miscellaneous = new Array('-..-.','-.--.','-.--.-','-....-','.-.-.','-.....-','..--.-','.--.-.','...-..-');
var characters_miscellaneous = new Array('/','(',')','=','+','-','_','@','$');

var audio_files_directory = '/files/audio/morse-code/';

var enter_down;
var dash_timeout;

var current_input = '';
var current_prompt = '';
var valid_response = '';

var tutorial_quizzing = false;
var tutorial_current_step = 0;
var tutorial_number_of_steps_before_quiz = 2;
var tutorial_maximum_consecutive_retries = 5;
var tutorial_retries_to_add = 5;

var tutorial_number_of_quiz_rounds = 0;
var tutorial_quiz_retries = [];
var tutorial_quiz_retry = false;

var tutorial_previous_prompt = '';

document.addEvent('domready', function()
	{
		document.getElementById('interface-content').style.visibility = 'visible';
		document.getElementById('user-input').select();
		next_problem();
	}
);

function next_problem()
{
	if ( document.getElementById('option-tutorial').checked ) {
		if ( tutorial_quizzing ) {
			if ( tutorial_quiz_retries.length == 0 ) {
				tutorial_quiz_retry = false;
				if ( tutorial_number_of_quiz_rounds_exceeded() ) {
					tutorial_quizzing = false;
					next_problem();
					return;
				}
			}
			if ( tutorial_quiz_retry ) {
				alert(tutorial_quiz_retries);
			} else {
				tutorial_display_weighted_random_problem();
			}
			tutorial_number_of_quiz_rounds++;
		} else {
			display_current_tutorial_step();
			tutorial_current_step++;
			set_tutorial_quizzing_if_needed();
		}
	} else {
		
	}
}

function display_current_tutorial_step()
{
	if ( tutorial_current_step >= full_morse_code.length ) {
		display_comment( 'You have completed the tutorial!<br />Switching to practice mode.' );
		document.getElementById( 'option-practice' ).checked = 'checked';
		next_problem();
		return;
	}
	
	document.getElementById('output-prompt').value
		= current_prompt
		= tutorial_previous_prompt
		= full_characters[tutorial_current_step];
	
	valid_response = full_morse_code[tutorial_current_step];
	
	display_comment(valid_response);
}

function current_problem()
{
	
}

function tutorial_number_of_quiz_rounds_exceeded()
{
	if ( tutorial_number_of_quiz_rounds > ( ( tutorial_current_step / 3 ) + 4 ) ) {
		return true;
	}
	return false;
}

function tutorial_display_weighted_random_problem()
{
	clear_comment();
	
	var weighted_random_number = get_weighted_random_number();
	var random_problem_index = tutorial_current_step - parseInt( tutorial_current_step * weighted_random_number ) - 1;
	
	if ( full_characters[random_problem_index] == tutorial_previous_prompt ) {
		tutorial_display_weighted_random_problem();
		return;
	}
	
	document.getElementById('output-prompt').value
		= current_prompt
		= tutorial_previous_prompt
		= full_characters[random_problem_index];
	
	valid_response = full_morse_code[random_problem_index];
}

function add_current_prompt_to_retries()
{
	if ( tutorial_quizzing ) {
		if ( full_characters.indexOf ) {
			var index_of_current_prompt = full_characters.indexOf( current_prompt );
			if ( index_of_current_prompt >= 0 ) {
				for ( var i = 0; i < tutorial_maximum_consecutive_retries; i++ ) {
					tutorial_quiz_retries.push( current_prompt );
				}
			}
		}
	}
}

function set_tutorial_quizzing_if_needed()
{
	if ( tutorial_current_step > 0
	&& tutorial_current_step % tutorial_number_of_steps_before_quiz == 0 ) {
		tutorial_quizzing = true;
	}
	tutorial_number_of_quiz_rounds = 0;
}

function next_tutorial_quiz_problem()
{
	
}

function next_practice_problem()
{
	clear_comment();
	set_practice_problem();
	document.getElementById('user-input').select();
}

function set_practice_problem()
{
	var total_practice_array_lengths = get_total_practice_array_lengths();
	if (total_practice_array_lengths == 0) {
		display_comment('Please select at least one of the four categories: Alphabet, Numbers, Punctuation or Miscellaneous.');
		return;
	}
	
	var practice_index = parseInt( Math.random()*total_practice_array_lengths );
	
	var possible_problems_array = new Array();
	var possible_solutions_array = new Array();
	
	if (document.getElementById('option-alphabet').checked) {
		possible_problems_array.append(characters_alphabet);
		possible_solutions_array.append(morse_code_alphabet);
	}
	if (document.getElementById('option-numbers').checked) {
		possible_problems_array.append(characters_numbers);
		possible_solutions_array.append(morse_code_numbers);
	}
	if (document.getElementById('option-punctuation').checked) {
		possible_problems_array.append(characters_punctuation);
		possible_solutions_array.append(morse_code_punctuation);
	}
	if (document.getElementById('option-miscellaneous').checked) {
		possible_problems_array.append(characters_miscellaneous);
		possible_solutions_array.append(morse_code_miscellaneous);
	}
	
	document.getElementById('output-prompt').value
		= current_prompt
		= possible_problems_array[practice_index];
	practice_valid_response = possible_solutions_array[practice_index];
}

function get_total_practice_array_lengths()
{
	var total_practice_array_lengths = 0;
	if (document.getElementById('option-alphabet').checked) {
		total_practice_array_lengths += morse_code_alphabet.length;
	}
	if (document.getElementById('option-numbers').checked) {
		total_practice_array_lengths += morse_code_numbers.length;
	}
	if (document.getElementById('option-punctuation').checked) {
		total_practice_array_lengths += morse_code_punctuation.length;
	}
	if (document.getElementById('option-miscellaneous').checked) {
		total_practice_array_lengths += morse_code_miscellaneous.length;
	}
	return total_practice_array_lengths;
}

function check_input_down(event)
{
	if ( enter_down ) {
		return;
	}
	
	var event_key_code = get_key_code(event);
	if ( event_key_code == 13 && ! event.shiftKey ) {
		enter_down = true;
		play_tone();
		append_dot_to_current_input();
		dash_timeout = setTimeout('append_dash_if_enough_time_lapsed()', 150);
	} else if ( event_key_code == 13 && event.shiftKey ) {
		display_answer();
	} else if ( event_key_code == 8 ) {
		delete_last_input_character();
	} else {
		//TODO check for a character.  If so, reverse lookup.
	}
	update_morse_code_output();
}

function check_input_up(event)
{
	if ( get_key_code(event) == 13 ) {
		enter_down = false;
		stop_playing_tone();
	}
	if ( current_input.length > 7 ) {
		display_comment('Input too large');
		current_input = '';
	}
	clearTimeout( dash_timeout );
	update_morse_code_output();
	check_new_input();
}

function append_dot_to_current_input()
{
	current_input += '.';
}

function append_dash_to_current_input()
{
	current_input += '-';
}

function append_dash_if_enough_time_lapsed()
{
	if (enter_down) {
		delete_last_input_character();
		append_dash_to_current_input();
		update_morse_code_output();
	}
}

function display_answer()
{
	display_comment( current_prompt + ' : ' + valid_response );
}

function delete_last_input_character()
{
	if (current_input.length > 0) {
		current_input = current_input.substring(0, current_input.length - 1);
	}
}

function update_morse_code_output()
{
	document.getElementById('output').innerHTML = current_input;
}

function check_new_input()
{	
	if ( current_input == valid_response ) {
		current_input = '';
		update_morse_code_output();
		next_problem();
	} else if ( ! valid_response.match( new RegExp( '^' + current_input.replace( /\./g, '\\.' ), 'g' ) ) ) {
		add_current_prompt_to_retries();
		current_input = '';
		current_prompt = '';
		update_morse_code_output();
	}
}

function play_tone()
{
	if ( document.getElementById('option-audio').checked ) {
		document.getElementById('sound-output-tone').play();
	}
	if ( document.getElementById('option-visual').checked ) {
		document.getElementById('output-prompt').style.backgroundColor = '#00FF00';
		document.getElementById('output-prompt').style.color = '#000000';
	}
}

function stop_playing_tone()
{
	document.getElementById('sound-output-tone').pause();
	document.getElementById('output-prompt').style.backgroundColor = '#000000';
	document.getElementById('output-prompt').style.color = '#00FF00';
}

function get_code_to_play_file(filename)
{
	var code_to_play_file
		= '<embed name="sound" id="sound" src="'
		+ audio_files_directory
		+ filename
		+ '" volume="100" type="audio/wav" autostart="true" hidden="true" />';
	return code_to_play_file;
}

function show_options()
{
	document.getElementById('options').style.display = 'block';
	document.getElementById('options-button').value = 'Hide Options';
	document.getElementById('options-button').onclick = hide_options;
}

function hide_options()
{
	document.getElementById('options').style.display = 'none';
	document.getElementById('options-button').value = 'Options';
	document.getElementById('options-button').onclick = show_options;
}

function display_comment(comment)
{
	document.getElementById('comment-output').innerHTML = comment;
}

function clear_comment()
{
	document.getElementById('comment-output').innerHTML = '&nbsp;';
}

function get_key_code(event)
{
	if (typeof event == 'undefined') { event = window.event; }
	var event_key_code = event.keyCode;
	return event_key_code;
}

function get_weighted_random_number()
{
	var temporary_random_number = Math.random();
	var second_temporary_random_number = Math.random() * temporary_random_number;
	return temporary_random_number - second_temporary_random_number;
}