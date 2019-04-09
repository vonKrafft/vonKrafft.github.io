/*************************************************************************
 Description : Code JS pour un jeu du morpion en JS
 Author : vonKrafft
 Author URL : https://vonkrafft.fr
 Author mail : contact@vonkrafft.fr
 Date : 13 Décembre 2013
 *************************************************************************/
var canvas  = document.querySelector('#canvas');
var context = canvas.getContext('2d');
var tailleCanvasX = canvas.getAttribute('width');
var tailleCanvasY = canvas.getAttribute('height');

var caseSize = Math.min(tailleCanvasX/3, tailleCanvasY/3);
var margin = 25;

var isPlayerOne = true;
var isTheEnd = false;
var nbCaseFull = 0;
var isCaseFull = new Array(false, false, false, false, false, false, false, false, false);
var casesPlayer1 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var casesPlayer2 = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var nbMatchesPlayed = 0;

function drawGrid(){
	context.strokeStyle="#181818";
	context.lineWidth=3;
	context.beginPath();
	context.moveTo(caseSize, margin);
	context.lineTo(caseSize, 3*caseSize-margin);
	context.moveTo(2*caseSize, margin);
	context.lineTo(2*caseSize, 3*caseSize-margin);
	context.moveTo(margin, caseSize);
	context.lineTo(3*caseSize-margin, caseSize);
	context.moveTo(margin, 2*caseSize);
	context.lineTo(3*caseSize-margin, 2*caseSize);
	context.stroke();
}

function drawCross(x,y) {
	context.strokeStyle="#00007f";
	context.lineWidth=3;
	context.beginPath();
	context.moveTo(x-(caseSize/2)+margin, y-(caseSize/2)+margin);
	context.lineTo(x+(caseSize/2)-margin, y+(caseSize/2)-margin);
	context.moveTo(x-(caseSize/2)+margin, y+(caseSize/2)-margin);
	context.lineTo(x+(caseSize/2)-margin, y-(caseSize/2)+margin);
	context.stroke();	
}

function drawCircle(x,y) {
	context.strokeStyle="#7f0000";
	context.lineWidth=3;
	context.beginPath();
	context.arc(x, y, (caseSize/2)-margin, 0, 2*Math.PI, true);
	context.stroke();	
}

function drawSector(x,y,i) {
	if(isPlayerOne) {
		drawCross(x,y);
		casesPlayer1[i] = 1;
		isPlayerOne = false;
		$('#canvas').addClass('circle').removeClass('cross');
		$("#scoreMessages").html("<span class=\"player2\">C'est au joueur 2 de jouer.</span>");
		if(casesPlayer1[0]*casesPlayer1[1]*casesPlayer1[2] == 1) theEnd(1);
		else if(casesPlayer1[3]*casesPlayer1[4]*casesPlayer1[5] == 1) theEnd(1);
		else if(casesPlayer1[6]*casesPlayer1[7]*casesPlayer1[8] == 1) theEnd(1);
		else if(casesPlayer1[0]*casesPlayer1[3]*casesPlayer1[6] == 1) theEnd(1);
		else if(casesPlayer1[1]*casesPlayer1[4]*casesPlayer1[7] == 1) theEnd(1);
		else if(casesPlayer1[2]*casesPlayer1[5]*casesPlayer1[8] == 1) theEnd(1);
		else if(casesPlayer1[0]*casesPlayer1[4]*casesPlayer1[8] == 1) theEnd(1);
		else if(casesPlayer1[2]*casesPlayer1[4]*casesPlayer1[6] == 1) theEnd(1);
		else if(nbCaseFull == 9) theEnd(0);
	} else {
		drawCircle(x,y);
		casesPlayer2[i] = 1;
		isPlayerOne = true;
		$('#canvas').addClass('cross').removeClass('circle');
		$("#scoreMessages").html("<span class=\"player1\">C'est au joueur 1 de jouer.</span>");
		if(casesPlayer2[0]*casesPlayer2[1]*casesPlayer2[2] == 1) theEnd(2);
		else if(casesPlayer2[3]*casesPlayer2[4]*casesPlayer2[5] == 1) theEnd(2);
		else if(casesPlayer2[6]*casesPlayer2[7]*casesPlayer2[8] == 1) theEnd(2);
		else if(casesPlayer2[0]*casesPlayer2[3]*casesPlayer2[6] == 1) theEnd(2);
		else if(casesPlayer2[1]*casesPlayer2[4]*casesPlayer2[7] == 1) theEnd(2);
		else if(casesPlayer2[2]*casesPlayer2[5]*casesPlayer2[8] == 1) theEnd(2);
		else if(casesPlayer2[0]*casesPlayer2[4]*casesPlayer2[8] == 1) theEnd(2);
		else if(casesPlayer2[2]*casesPlayer2[4]*casesPlayer2[6] == 1) theEnd(2);
		else if(nbCaseFull == 9) theEnd(0);
	}
}

function theEnd(player) {
	$('#canvas').removeClass('cross').removeClass('circle');
	isTheEnd = true;
	nbMatchesPlayed++;
	if(nbMatchesPlayed<2) $("#nbMatches").html(nbMatchesPlayed+" manche");
	else $("#nbMatches").html(nbMatchesPlayed+" manches");
	
	if(player == 1) {
		$("#scoreMessages").html("<strong class=\"player1\">Le joueur 1 remporte la manche !</strong><br /><br />"
								+"<button onClick=\"newMatch()\">Nouvelle manche</button><br />"
								+"<button onClick=\"newGame()\">Nouvelle partie</button>");
		scorePlayer1++;
		if(scorePlayer1<2) $("#score1").html(scorePlayer1+" pt");	
		else $("#score1").html(scorePlayer1+" pts");
	} else if(player == 2) {
		$("#scoreMessages").html("<strong class=\"player2\">Le joueur 2 remporte la manche !</strong><br /><br />"
								+"<button onClick=\"newMatch()\">Nouvelle manche</button><br />"
								+"<button onClick=\"newGame()\">Nouvelle partie</button>");
		scorePlayer2++;
		if(scorePlayer2<2) $("#score2").html(scorePlayer2+" pt");	
		else $("#score2").html(scorePlayer2+" pts");	
	} else {
		$("#scoreMessages").html("<strong>Match nul !</strong><br /><br />"
								+"<button onClick=\"newMatch()\">Nouvelle manche</button><br />"
								+"<button onClick=\"newGame()\">Nouvelle partie</button>");	
	}
}

function newMatch() {
	var i = 0;
	context.clearRect(0, 0, tailleCanvasX, tailleCanvasY);
	drawGrid();
	isTheEnd = false;
	nbCaseFull = 0;
	for(i=0;i<9;i++) {
		isCaseFull[i] = false;
		casesPlayer1[i] = 0;
		casesPlayer2[i] = 0;
	}
	if(isPlayerOne) {
		$("#scoreMessages").html("<span class=\"player1\">C'est au joueur 1 de jouer.</span>");
		$('#canvas').addClass('cross').removeClass('circle');
	} else {
		$("#scoreMessages").html("<span class=\"player2\">C'est au joueur 2 de jouer.</span>");
		$('#canvas').addClass('circle').removeClass('cross');
	}
}

function newGame() {
	scorePlayer1 = 0;
	$("#score1").html(scorePlayer1+" pt");
	scorePlayer2 = 0;
	$("#score2").html(scorePlayer2+" pt");
	isPlayerOne = true;
	$('#canvas').addClass('cross').removeClass('circle');
	nbMatchesPlayed = 0;
	$("#nbMatches").html(nbMatchesPlayed+" manche");
	newMatch();
}

$( document ).ready(function(){
	drawGrid();
	$("#score1").html(scorePlayer1+" pt");
	$("#score2").html(scorePlayer2+" pt");
	$("#nbMatches").html(nbMatchesPlayed+" manche");
	$("#scoreMessages").html("<span class=\"player1\">C'est au joueur 1 de jouer.</span>");
	$('#canvas').addClass('cross').removeClass('circle');
});

$("#canvas").click(function(e){
	var x = e.pageX - this.offsetLeft;
	var y = e.pageY - this.offsetTop;
	var centerX = 0;
	var centerY = 0;
	var col = 0;
	var row = 0;
	var index = 0;
	
	if(x < caseSize) { centerX = caseSize/2; col = 0; }
	else if(x < 2*caseSize) { centerX = 3*caseSize/2; col = 1; }
	else { centerX = 5*caseSize/2; col = 2; }
	
	if(y < caseSize) { centerY = caseSize/2; row = 0; }
	else if(y < 2*caseSize) { centerY = 3*caseSize/2; row = 1; }
	else { centerY = 5*caseSize/2; row = 2; }
	
	index = col + 3 * row;
	if(!isCaseFull[index] && !isTheEnd) {
		isCaseFull[index] = true;
		nbCaseFull++;
		drawSector(centerX,centerY,index)
	}
	
});



