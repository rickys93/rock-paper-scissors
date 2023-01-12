// const prompt = require("prompt-sync")();

let user_results = []

let possible_choices = ['r', 'p', 's']

let game_number = 1
let user_choice 

let get_user_choice = () => {
    while (!user_choice) {
        user_choice = prompt("Please select Rock/Paper/Scissors (type R/P/S): ")
        user_choice.toLowerCase()
        if (!possible_choices.includes(user_choice)) {
            console.log("Please make sure you type either R/P/S")
            user_choice = ""
        }
    }
}

get_user_choice()
