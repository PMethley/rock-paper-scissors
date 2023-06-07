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
        return[returnText, winStatus];
    } else if (winningPairDict[playerSelection] === computerSelection) {
        returnText = `You win! ${playerSelection} beats ${computerSelection}!`;
        winStatus = "win";
        return[returnText, winStatus];
    } else {
        returnText = `You lose! ${computerSelection} beats ${playerSelection}!`;
        winStatus = "lose";
        return[returnText, winStatus];
    };   
};

playerScore = 0;
computerScore = 0;
const btnChoice = document.querySelectorAll(".choiceButton");
btnChoice.forEach((btnElement) => {
    btnElement.addEventListener("click", () => {
        let playerChoice = btnElement.dataset.choice;
        let resultsList = playRound(getComputerChoice(), playerChoice);
        document.querySelector("#current-result").innerText = resultsList[0];
        
        if (resultsList[1] === "win"){
            playerScore++;
        }else if (resultsList[1] === "lose"){
            computerScore++;
        };
        document.querySelector("#score-data").innerText = `${playerScore} - ${computerScore}`;
        
        if (playerScore === 5){
            alert(`You won! the score was ${playerScore}:${computerScore}`);
            resetGame();
        } else if (computerScore === 5){
            alert(`You lost! the score was ${computerScore}:${playerScore}`);
            resetGame();
        };
    });
});

function resetGame(){
    playerScore = 0;
    computerScore = 0;
    document.querySelector("#score-data").innerText = "0 - 0";
    document.querySelector("#current-result").innerText = "";
};