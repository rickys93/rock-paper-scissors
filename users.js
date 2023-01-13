const prompt = require("prompt-sync")();

// The User class contains the properties and methods for the user's choices and results.
class User {
    
    constructor(possibleChoices) {
        this.choice = null
        this.result = null
        this.results = {
            "roundsPlayed":0,
            "wins":0,
            "losses":0,
            "draws":0,
            "lastRoundResults":{}
        }
        this.possibleChoices = possibleChoices
        this.extraChoices = ['q', 're']
        this.userInputs = this.possibleChoices.concat(this.extraChoices)
    }

    getChoice() {
        let userChoice
        // Keep asking for choice until a user input is inputted ['r', 'p', 's', 'q', 're']
        while (!this.userInputs.includes(userChoice)) {
            userChoice = prompt("Please select Rock/Paper/Scissors (type R/P/S) (Q = Quit, RE = Get results): ");
            userChoice.toLowerCase();
            if (!this.userInputs.includes(userChoice)) {
                console.log("Please make sure you type either R/P/S");
                userChoice = "";
            }
            if (userChoice === 're') {
                this.printResults()
            }
        } 
        this.choice = new Choice(userChoice)
    }

    printResults() {
        console.log(`User Results:\n${JSON.stringify(this.results, null, 4)}`)
    }

    // this method updates the stats from previous rounds
    updateResults(round) {
        this.results.roundsPlayed ++ 
        if (round.userResult === 'win') {
            this.results.wins ++ 
        } else if (round.userResult === 'lose') {
            this.results.losses ++ 
        } else {
            this.results.draws ++ 
        }
        this.results.lastRoundResults = round.user.result
    }
}


class Computer {
    
    constructor(possibleChoices) {
        this.possibleChoices = possibleChoices
        this.choice = null
    }

    // get random choice from R/P/S as the computer's decision
    getChoice(possibleChoices) {
        let random_int = Math.floor(Math.random() * this.possibleChoices.length)
        let computerChoice = this.possibleChoices[random_int]
        this.choice = new Choice(computerChoice)
    }
}

// Choice clas that contains the decision
class Choice {

    constructor(decision) {
        this.decision = decision
    }

    // gets the full name version of the decision
    fullName() {
        let fullNames = {
            'r':'Rock',
            'p':'Paper',
            's':'Scissors'
        }
        return fullNames[this.decision]
    }
}

module.exports = {User, Computer, Choice}