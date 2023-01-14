const { Game } = require("../game.js")

describe("Game class", () => {
    it("Exists", () => {
        expect(Game).toBeDefined()
    })

    it("Is a class", () => {
        expect(Game).toBeInstanceOf(Object)
    })
})