const { User, Computer } = require("./users.js")
const { Round } = require("./round.js")


class Game {

    play() {
        // instantiate from the user, computer and round classes
        let user = new User()
        let computer = new Computer()
        let round = new Round(user, computer)

        // play until player quits
        while (!round.playerQuit) {
            round.playRound()
        }
    }
}

module.exports = { Game }