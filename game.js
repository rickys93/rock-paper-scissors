const prompt = require("prompt-sync")();
const color = require("ansi-colors")

class Game {
    constructor() {
        this.possibleChoices = ['r', 'p', 's']
    }

    play() {
        let user = new User(this.possibleChoices)
        let computer = new Computer(this.possibleChoices)
        let round = new Round(user, computer, 1)

        while (true) {
            round.playRound()
        }
    }
}

class Round {

    constructor(user, computer, number) {
        this.user = user
        this.computer = computer
        this.number = number
        this.previousResult = {}
    }

    playRound() {
        this.user.getChoice()
        if (this.user.choice === 'q') {
            return
        }
        this.user.choice = new Choice(this.user.choice)
        console.log(`\nRound ${this.number}:`)
        this.computer.getChoice()
        this.determineResult()
        this.user.result = this.createRoundResultObject()
        this.user.updateResults(this)
        this.printRoundResults()
        this.number ++
    }

    createRoundResultObject() {
        return {
            roundNumber: this.number, 
            userChoice: this.user.choice, 
            computerChoice: this.computer.choice, 
            userResult: this.userResult
        }
    }

    determineResult() {
        if (this.user.choice.decision === this.computer.choice.decision) {
            this.userResult = "draw"
            return 
        }
    
        if (this.user.choice.decision === "r") {
            if (this.computer.choice.decision === "p") {
                this.userResult = "lose"
            } else {
                this.userResult = "win"
            } return 
        }
    
        if (this.user.choice.decision === "p") {
            if (this.computer.choice.decision === "s") {
                this.userResult = "lose"
            } else {
                this.userResult = "win"
            } return 
        }
    
        if (this.user.choice.decision === "s") {
            if (this.computer.choice.decision === "r") {
                this.userResult = "lose"
            } else {
                this.userResult = "win"
            } return 
        }
    }

    printRoundResults() {
        let message = `User choice: ${this.user.choice.fullName()}`
        message += `\nComputer Choice: ${this.computer.choice.fullName()}`
        message += `\nRound result: ${this.getResultText(this.userResult)}`
        console.log(message)
    }

    getResultText(roundResult) {
        if (roundResult === 'win') {
            return color.green(roundResult.toUpperCase())
        } else if (roundResult === 'lose') {
            return color.red(roundResult.toUpperCase())
        } else {
            return color.yellow(roundResult.toUpperCase())
        }
    }
}

class Choice {

    constructor(decision) {
        this.decision = decision
    }

    fullName() {
        let fullNames = {
            'r':'Rock',
            'p':'Paper',
            's':'Scissors'
        }
        return fullNames[this.decision]
    }
}

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
        while (!this.possibleChoices.includes(userChoice)) {
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
        this.choice = userChoice
    }

    printResults() {
        console.log(`User Results:\n${JSON.stringify(this.results, null, 4)}`)
    }

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

    getChoice(possibleChoices) {
        let random_int = Math.floor(Math.random() * this.possibleChoices.length)
        let computerChoice = this.possibleChoices[random_int]
        this.choice = new Choice(computerChoice)
    }
}


game = new Game()

game.play()