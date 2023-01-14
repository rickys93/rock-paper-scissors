const { User, Computer } = require("./users.js")
const { Round } = require("./round.js")


class Game {

    play() {
        // instantiate from the user, computer and round classes
        let user = new User(this.possibleChoices)
        let computer = new Computer(this.possibleChoices)
        let round = new Round(user, computer, 1, this.possibleChoices)

        // play until player quits
        while (!round.playerQuit) {
            round.playRound()
        }
    }
}


// game = new Game()
// game.play()

module.exports = { Game }