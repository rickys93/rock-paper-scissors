const each = require('jest-each').default;

const { User, Computer, Choice } = require("./users");
const { Round } = require("./round");

describe("User class", () => {
    it("Exists", () => {
        expect(User).toBeDefined()
    })
    it("Is an object", () => {
        expect(User).toBeInstanceOf(Object)
    })

    let user = new User()
    let round = new Round(user)
    round.user.result = {"key":"value"}
    describe("updateResults", () => {
        it("Instantiates ok", () => {
            expect(user.results.wins).toEqual(0)
            expect(user.results.roundsPlayed).toEqual(0)
            expect(user.results.losses).toEqual(0)
            expect(user.results.draws).toEqual(0)
        })
        it("User result win works", () => {
            round.userResult = 'win'
            user.updateResults(round)
            expect(user.results.wins).toEqual(1)
            expect(user.results.roundsPlayed).toEqual(1)
            expect(user.results.losses).toEqual(0)
            expect(user.results.draws).toEqual(0)
            expect(user.results.lastRoundResults).toEqual(round.user.result)
        })
        it("User result lose works", () => {
            round.userResult = 'lose'
            user.updateResults(round)
            expect(user.results.wins).toEqual(1)
            expect(user.results.roundsPlayed).toEqual(2)
            expect(user.results.losses).toEqual(1)
            expect(user.results.draws).toEqual(0)
            expect(user.results.lastRoundResults).toEqual(round.user.result)
        })

    })
})

describe("Computer class", () => {

    it("Exists", () => {
        expect(Computer).toBeDefined()
    })
    it("Is an object", () => {
        expect(Computer).toBeInstanceOf(Object)
    })
})

describe("Choice class", () => {

    it("Exists", () => {
        expect(Choice).toBeDefined()
    })
    it("Is an object", () => {
        expect(Choice).toBeInstanceOf(Object)
    })
})