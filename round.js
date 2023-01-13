const color = require("ansi-colors")

class Round {

    constructor(user, computer, number, possibleChoices) {
        this.user = user
        this.computer = computer
        this.number = number
        this.possibleChoices = possibleChoices
        this.previousResult = {}
        this.playerQuit = false
    }

    // this method plays each round
    playRound() {
        this.user.getChoice()
        if (this.user.choice.decision === 'q') {
            this.playerQuit = true
            return
        }
        // user choose to print results, end current round
        if (this.user.choice.decision === 're') { return }

        this.computer.getChoice()
        this.determineResult()
        this.user.result = this.createRoundResultObject()
        this.user.updateResults(this)
        this.printRoundResults()
        this.number ++
    }
    // creates object containing the round current round results
    createRoundResultObject() {
        let roundResult = {
            roundNumber: this.number, 
            userChoice: this.user.choice.fullName(),
            computerChoice: this.computer.choice.fullName(), 
            userResult: this.userResult
        }
        return roundResult
    }

    // determine the results of the round (whether the user won, lost or drew)
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
        let message = `\nRound ${this.number}:`
        message += `\nUser choice: ${this.user.choice.fullName()}`
        message += `\nComputer Choice: ${this.computer.choice.fullName()}`
        message += `\nRound result: ${this.getResultText(this.userResult)}`
        console.log(message)
    }

    // select colour based on round result
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

module.exports = {Round}