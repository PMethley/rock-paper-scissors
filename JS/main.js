function getComputerChoice() {
    let choices = Array("rock", "paper", "scissors");
    let choice = choices[Math.floor(Math.random()*choices.length)];
    return(choice);
};

function playRound(computerSelection, playerSelection) {
    playerSelection = playerSelection.toLowerCase();
    let winningPairDict = {
        rock:"scissors",
        scissors: "paper",
        paper: "rock"
    };
    let returnText = "";
    let winStatus = "";
    if(computerSelection === playerSelection){
        returnText = `It was a draw you both chose ${playerSelection}!`;
        winStatus = "draw";
        return[returnText, winStatus]
    } else if (winningPairDict[playerSelection] === computerSelection) {
        returnText = `You win! ${playerSelection} beats ${computerSelection}!`;
        winStatus = "win";
        return[returnText, winStatus]
    } else {
        returnText = `You lose! ${computerSelection} beats ${playerSelection}!`;
        winStatus = "lose";
        return[returnText, winStatus]
    };   
};

function game() {
    playerScore = 0;
    computerScore = 0;
    for (let index = 0; index < 5; index++) {
        let playerSelection = prompt("Please enter Rock, Paper or Scissors", "paper");
        let resultList = playRound(getComputerChoice(), playerSelection);
        console.log(resultList[0]);
        if (resultList[1] === "win"){
            playerScore++;
        }else if (resultList[1] === "lose"){
            computerScore++;
        };
        console.log(`player:${playerScore} pc:${computerScore}`)
        if ((Math.abs(playerScore-computerScore)) > 5-index-1) {
            break;
        };  
    };
    if (playerScore > computerScore) {
        console.log(`You won! the score was ${playerScore}:${computerScore}`);
    } else {
        console.log(`You lost! the score was ${computerScore}:${playerScore}`);
    };
};

game()