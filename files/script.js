const hackFunction = document.querySelector('.hackFunction');
const hackFunction2 = document.querySelector('.hackFunction2');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const levelHack = document.getElementById('levelHack');
const input = document.getElementById('inputValue');
const upF1 = document.getElementById('upF1');
const dnF1 = document.getElementById('dnF1');
const upF2 = document.getElementById('upF2');
const dnF2 = document.getElementById('dnF2');
const resault = document.getElementById('resault');
const symbol = document.getElementById('symbol');
const buttonConfirm = document.getElementById("buttonConfirm");
const result = document.querySelector(".result");
const resultInfo = document.getElementById("endInfo");
const nickConfirm = document.getElementById("nickConfirm");
const register = document.querySelector(".register"); 
const username = document.getElementById("username");
const userid = document.getElementById("userid");

var __timePlay = 30;
var progressBarInterval;
var stageLevel = 0;
var check = false;

const gameInit = () => {

	const cookie = document.cookie;
	let check2 = false;
	if (cookie != ""){
		//read cookie
		check2 = true;
		console.log(cookie);
	}

	if (cookie == ""){
		register.style.display = "";
	}

	buttonConfirm.addEventListener('click', function () {
		if (check2){
			if (check) {
				if (input.value == resaultQuestion) {
					generateQuestion();
					levelHack.textContent = "Zadanie " + stageLevel;
					input.value = '';
					progressBarStart('game', __timePlay);
				}
				else{
					gameOver();
				}
			}
		}
	});

	nickConfirm.addEventListener('click', function () {
		var date = new Date();
		date.setFullYear(date.getFullYear() + 10); // Ustawiamy datę na 10 lat w przyszłości

		//todo
		//send request with user nick
		//check if nick is taken
		//send generated userid
		//save userid and nick to a cookie

		const id = "01";
		const newCookie1 = "userid=" + id + "; expires=" + date.toUTCString() + "; path=/";
		const newCookie2 = "username=" + document.getElementById("inputNick").value + "; expires=" + date.toUTCString() + "; path=/";
		console.log(newCookie1);
		console.log(newCookie2);
		document.cookie = newCookie1;
		document.cookie = newCookie2;
		check2 = true;
		username.innerHTML = "username: " + document.getElementById("inputNick").value;
		userid.innerHTML = "userid: " + id;
		register.style.display = 'none';

	});

	result.style.display = 'none';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	//document.addEventListener('contextmenu', event => event.preventDefault());
};

const gameStart = () => {
	stageLevel = 0;
	check = false;
	levelHack.textContent = 'Zadanie 1';
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	result.style.display = 'none';
	register.style.display = 'none';
	input.value = '';
	progressBarStart('start', 2);
};

const gameOver = () => {
	check = false;
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Zadanie nieudane!';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	result.style.display = 'none';
	resultInfo.innerHTML = 'Wynik: ' + (stageLevel - 1) + " pkt";
	register.style.display = 'none';
	progressBarStart('end', 2);
	//send score to server
};

function progressBarStart(type, time) {
	var maxwidth = 1000;
	var width = maxwidth;
	const process = () => {
		if (width > 0) {
			if (type == 'start' || type == 'end') width = width - 3;
			else width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';
		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackFunction2.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				check = true;
				generateQuestion();
				progressBarStart('game', __timePlay);
				return;
			}

			if (type == 'game') {
				hackFunction.style.display = 'none';
				hackFunction2.style.display = 'none';
				hackInfo.style.display = 'block';
				hackText.style.display = 'none';
				gameOver();
				return;
			}

			if (type == 'end') {
				hackFunction.style.display = 'none';
				hackFunction2.style.display = 'none';
				hackText.style.display = 'none';
				buttonStart.style.display = '';
				progressBar.style.display = 'none';
				hackInfo.style.display = 'none';
				result.style.display = '';
			}
		}
	};
	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

let resaultQuestion = 0;

function generateQuestion() {
	let a1 = getRndInteger(1, 10);
	let a2 = getRndInteger(1, 10);

	dnF1.textContent = a1;
	dnF2.textContent = a2;
	upF1.textContent = getRndInteger(1, a1);
	upF2.textContent = getRndInteger(1, a2);

	let a3 = Math.random() < 0.5 ? true : false;
	symbol.textContent = a3 ? '+' : '-';

	let a4 = a3
		? addition(parseInt(upF1.textContent), parseInt(upF2.textContent), parseInt(dnF1.textContent), parseInt(dnF2.textContent))
		: subtraction(parseInt(upF1.textContent), parseInt(upF2.textContent), parseInt(dnF1.textContent), parseInt(dnF2.textContent));

	resault.textContent = a4[1];

	if (a4[0] < 0) {
		generateQuestion();
	} else {
		console.log(a4);
		stageLevel++;
		resaultQuestion = a4[0];
	}
}

function addition(u1, u2, d1, d2) {
	var a1 = u1 * d2 + u2 * d1;
	var a2 = d1 * d2;
	return [a1, a2];
}
function subtraction(u1, u2, d1, d2) {
	var a1 = u1 * d2 - u2 * d1;
	var a2 = d1 * d2;
	return [a1, a2];
}
