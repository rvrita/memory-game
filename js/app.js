let cards = [
	'diamond',
	'paper-plane-o',
	'anchor',
	'bolt',
	'leaf',
	'bomb',
	'bicycle',
	'cube',
];
cards = cards.concat(cards);

const deck = document.getElementById('deck');
const restart = document.getElementById('restart');
const playAgain = document.getElementById('playagain');

let matchCount, starCount, moves, open, startTime, timerId;

deck.addEventListener('click', handleClick);

restart.addEventListener('click', dealCards);

playAgain.addEventListener('click', function () {
	dealCards();
	document.getElementById('congrats').style.display = 'none';
});

dealCards();


function dealCards() {
	startTime = Date.now();
	starCount = 3;
	matchCount = 0;
	moves = 0;
	open = [];
	deck.innerHTML = '';
	shuffle(cards);
	document.getElementById('moves').innerText = moves;
	document.getElementById('star2').classList.remove('hidden');
	document.getElementById('star3').classList.remove('hidden');


	cards.forEach(function (card) {
		const listItem = document.createElement('li');
		listItem.innerHTML = '<i class="fa fa-' + card + '"></i>';
		listItem.classList.add('card');
		
		deck.appendChild(listItem);
	});

	clearInterval(timerId);

	timerId = setInterval(function() {
		const elapsedSeconds = (Date.now() - startTime)/1000;
		updateTimer(elapsedSeconds);
	}, 1000);

	updateTimer(0);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function updateTimer(seconds) {
	document.getElementById('timer').innerText = formatTime(seconds);
}

/*
 * Returns a string in format "1:23".
 */
function formatTime(seconds) {
	const mins = Math.floor(seconds / 60);
	let secs = Math.floor(seconds % 60);
	if (secs < 10) {
		secs = "0" + secs;
	}
	return mins + ":" + secs;
}

function handleClick(event) {
  card = event.target;

  if (card.nodeName != 'LI' || 
	  	card.classList.contains('match') || 
	  	(open.length === 2) || 
	  	card.classList.contains('show')) {
  	return;
  }

  card.classList.add('show');
  card.classList.remove('bounce');
  card.classList.remove('wiggle');

  open.push(card);

  if (open.length === 2) {
  	  moves++;
  	  if (moves === 11) {
  	  	document.getElementById('star3').classList.add('hidden');
  	  	starCount = 2;
  	  } else if (moves === 17) {
  	  	document.getElementById('star2').classList.add('hidden');
  	  	starCount = 1;
  	  } 
  	  document.getElementById('moves').innerText = moves;
	  setTimeout(function() {
	  	if (open[0].innerHTML === open[1].innerHTML) {
	  		open[0].classList.add('match');
			open[1].classList.add('match');
			matchCount += 1;
			open[0].classList.add('bounce');
			open[1].classList.add('bounce');
			open[0].classList.remove('show');
			open[1].classList.remove('show');
			if (matchCount === 8) {
				clearInterval(timerId); // stop the timer
				const elapsedSeconds = (Date.now() - startTime)/1000;
				const elapsedTime = formatTime(elapsedSeconds);
  				document.getElementById('congrats').style.display = 'block';
  				document.getElementById('par').innerHTML = 
  					`With ${moves} moves and ${starCount} stars.
  					Elapsed time: ${elapsedTime}`;
  			}
	  	} else {
	  		open[0].classList.remove('show');
			open[1].classList.remove('show');
			open[0].classList.add('wiggle');
			open[1].classList.add('wiggle');
			
	  	}
	  	open = [];	  	
	   }, 1000);

  }


}



