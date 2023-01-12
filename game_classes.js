class Game {



    play() {
        let user = new User()
        let computer = new Computer()
        let round = new Round(user, computer, 1)

        while (true) {
            round.startRound()
        }
    }


}

class Round {
    previousResult = {}

    constructor(user, computer, number) {
        this.user = user
        this.computer = computer
        this.number = number
        this.possible_choices
    }

    playRound() {
        this.user.getChoice()
        if (this.user.choice === 'q') {
            return
        }

        console.log(`\nRound ${round.number}:`)
        this.computer.getChoice()

    }

    createRoundResultObject() {
        return {
            roundNumber: this.roundNumber, 
            userChoice: this.user.choice, 
            computerChoice: this.computer.choice, 
            userResult: this.user_result
        }
    }

    determineResult() {
        if (this.user.choice === this.computer.choice) {
            this.user_result = "draw"
        }
    
        if (this.user.choice === "r") {
            if (this.computer.choice === "p") {
                this.user_result = "lose"
            } else {
                this.user_result = "win"
            }
        }
    
        if (this.user.choice === "p") {
            if (this.computer.choice === "s") {
                this.user_result = "lose"
            } else {
                this.user_result = "win"
            }
        }
    
        if (this.user.choice === "s") {
            if (this.computer.choice === "r") {
                this.user_result = "lose"
            } else {
                this.user_result = "win"
            }
        }
    }
}

class Choice {
    full_name = {
        'r':'Rock',
        'p':'Paper',
        's':'Scissors'
    }
    constructor(decision) {
        this.decision = decision
        this.name = full_name.decision
    }
}

class User {
    choice = null
    result = null
    results = {
        "roundsPlayed":0,
        "wins":0,
        "losses":0,
        "draws":0,
        "lastRoundResults":{}
    }
    possible_choices = ['r', 'p', 's']
    extra_choices = ['q', 're']
    user_inputs = possible_choices + extra_choices

    getChoice() {
        let user_choice
        while (!this.possible_choices.includes(user_choice)) {
            user_choice = prompt("Please select Rock/Paper/Scissors (type R/P/S) (Q = Quit, RE = Get results): ");
            user_choice.toLowerCase();
            if (!this.user_inputs.includes(user_choice)) {
                console.log("Please make sure you type either R/P/S");
                user_choice = "";
            }
            if (user_choice === 're') {
                this.printResults()
            }
        } 
        this.choice = user_choice
    }

    printResults() {
        console.log(`User Results:\n${this.results}`)
    }

    updateResults(round) {
        this.results.roundsPlayed ++ 
        if (round.result.user === 'win') {
            this.results.wins ++ 
        } else if (round.result.user === 'lose') {
            this.results.losses ++ 
        } else {
            this.results.draws ++ 
        }
        this.results.lastRoundResults = round.result
    }
}

class Computer {
    choice = null

    getChoice(possible_choices) {
        let random_int = Math.floor(Math.random() * possible_choices.length)
        let computer_choice = possible_choices[random_int]
        this.choice = computer_choice
    }
}

class UserInterface {
    printRoundResults(round) {
        let message = `User choice: ${round.user.choice.name}`
        message += `\nComputer Choice: ${round.computer.choice.name}`
        message += `\nRound result: ${this.getResultText(round.results.user_result)}`
        console.log(message)
    }
    printStartGame() {

    }
    printStartRound() {

    }
    getResultText(round_result) {
        if (round_result === 'win') {
            return color.green(round_result.toUpperCase())
        } else if (round_result === 'lose') {
            return color.red(round_result.toUpperCase())
        } else {
            return color.yellow(round_result.toUpperCase())
        }
    }
}