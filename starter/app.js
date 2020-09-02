/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore,  activePlayer, play, sixCount, winningScore, getWinScore;
 function inith () {
    play = true;
    getWinScore = true;
    winningScore = document.getElementById('scoreText').value;
    sixCount = [0,0];
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice1').style.display = 'none';   // устанавливает режим не показывать
    document.querySelector('.dice2').style.display = 'none';   // устанавливает режим не показывать
    document.getElementById('score-0').textContent = 0;     //выбираем елемент по ID
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
 };
inith ();

function diceRndm(){
   return Math.floor(Math.random()*6)+1;
}

// можно вынести функцию наmружу и можно оставить внутри как второй параметр
document.querySelector('.btn-roll').addEventListener('click', function(){ //. означает выбор клвсса                                                                                    //# выбор по id
    
    if (play){
        if(getWinScore) winningScore = document.getElementById('scoreText').value;
    getWinScore = false;
    document.querySelector('.dice1').style.display = 'block';    //показывать
    document.querySelector('.dice2').style.display = 'block';    //показывать
    let dice1 = diceRndm();
    let dice2 = diceRndm();
    let dice1Dom = document.querySelector('.dice1');
    let dice2Dom = document.querySelector('.dice2');
    dice1Dom.src = 'dice-'+dice1 + '.png';
    dice2Dom.src = 'dice-'+dice2 + '.png';
    if (dice1 !== 1 && dice2 !== 1){
        roundScore =roundScore + dice1+dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        if (dice1 === 6 || dice2 ===6){
            sixCount[activePlayer] ++;
            if(sixCount[activePlayer] >= 2){
                document.querySelector('#score-'+ activePlayer).textContent = 0;
                sixCount[activePlayer] = 0;
                nextPlayer();
            }
        }
    }
    else {
        document.querySelector('#score-'+ activePlayer).textContent = 0;
        nextPlayer();
    }
        
    }
    
});
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(play){
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        scores[activePlayer] +=roundScore;
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= winningScore){
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('#name-'+ activePlayer).textContent = 'WINNER!!!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            play = false;
        
    }
    else nextPlayer();
    }
    
});

function nextPlayer (){
    document.querySelector('#current-'+activePlayer).textContent = 0;
        activePlayer === 0? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.querySelector('.player-0-panel').classList.toggle('active'); 
        //добавляет елемент active если его нет и убирает если есть 
        document.querySelector('.player-1-panel').classList.toggle('active');
        /*
        удаляет елемент класса
        document.querySelector('.player-0-panel').classList.remove('active');
        добавляет елемент класса
        document.querySelector('.player-1-panel').classList.add('active');  */
        document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn-new').addEventListener('click', inith);




