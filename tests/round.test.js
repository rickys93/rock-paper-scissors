const each = require('jest-each').default;
const { Round } = require("../round");
const { User, Computer, Choice } = require("../users");

describe("Round class", () => {
    it("Exists", () => {
        expect(Round).toBeDefined()
    })
    it("Is an object", () => {
        expect(Round).toBeInstanceOf(Object)
    })

    let computer = new Computer()
    let user = new User()
    let round = new Round(user, computer)
    describe("determineResult", () => {
        describe("Returns draw correctly", () => {
            it("With r and r", () => {
                round.user.choice = new Choice('r')
                round.computer.choice = new Choice('r')
                round.determineResult()
                expect(round.userResult).toEqual('draw')
            })
            it("With r and r", () => {
                round.user.choice = new Choice('p')
                round.computer.choice = new Choice('p')
                round.determineResult()
                expect(round.userResult).toEqual('draw')
            })
            it("With r and r", () => {
                round.user.choice = new Choice('s')
                round.computer.choice = new Choice('s')
                round.determineResult()
                expect(round.userResult).toEqual('draw')
            })

        })
        describe("Returns win correctly", () => {
            it("With r and s", () => {
                round.user.choice = new Choice('r')
                round.computer.choice = new Choice('s')
                round.determineResult()
                expect(round.userResult).toEqual('win')
            })
            it("With p and r", () => {
                round.user.choice = new Choice('p')
                round.computer.choice = new Choice('r')
                round.determineResult()
                expect(round.userResult).toEqual('win')
            })
            it("With s and p", () => {
                round.user.choice = new Choice('s')
                round.computer.choice = new Choice('p')
                round.determineResult()
                expect(round.userResult).toEqual('win')
            })

        })
        describe("Returns lose correctly", () => {
            it("With s and r", () => {
                round.user.choice = new Choice('s')
                round.computer.choice = new Choice('r')
                round.determineResult()
                expect(round.userResult).toEqual('lose')
            })
            it("With r and p", () => {
                round.user.choice = new Choice('r')
                round.computer.choice = new Choice('p')
                round.determineResult()
                expect(round.userResult).toEqual('lose')
            })
            it("With p and s", () => {
                round.user.choice = new Choice('p')
                round.computer.choice = new Choice('s')
                round.determineResult()
                expect(round.userResult).toEqual('lose')
            })

        })
    })
})