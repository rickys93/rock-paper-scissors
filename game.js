const { User, Computer } = require("./users.js")
const { Round } = require("./round.js")


class Game {
    constructor() {
        this.possibleChoices = ['r', 'p', 's']
    }

    play() {
        let user = new User(this.possibleChoices)
        let computer = new Computer(this.possibleChoices)
        let round = new Round(user, computer, 1, this.possibleChoices)

        while (!round.playerQuit) {
            round.playRound()
        }
    }
}


module.exports = { Game }