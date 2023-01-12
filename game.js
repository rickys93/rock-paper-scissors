const prompt = require("prompt-sync")();
const color = require("ansi-colors")


let possible_choices = ['r', 'p', 's']
let extra_choices = ['q', 're']
let possible_user_inputs = possible_choices + extra_choices
let full_name = {
    'r':'Rock',
    'p':'Paper',
    's':'Scissors'
}



const get_user_choice = () => {
    let user_choice
    while (!user_choice) {
        user_choice = prompt("Please select Rock/Paper/Scissors (type R/P/S) (Q = Quit, RE = Get results): ");
        user_choice.toLowerCase();
        if (!possible_user_inputs.includes(user_choice)) {
            console.log("Please make sure you type either R/P/S");
            user_choice = "";
        }
    } 
    return user_choice
}

const get_computer_choice = () => {
    let random_int = Math.floor(Math.random() * possible_choices.length)
    let computer_choice = possible_choices[random_int]
    return computer_choice
}

const determine_result = (user_choice, computer_choice) => {
    if (user_choice === computer_choice) {
        return "draw"
    }

    if (user_choice === "r") {
        if (computer_choice === "p") {
            return "lose"
        } else {
            return "win"
        }
    }

    if (user_choice === "p") {
        if (computer_choice === "s") {
            return "lose"
        } else {
            return "win"
        }
    }

    if (user_choice === "s") {
        if (computer_choice === "r") {
            return "lose"
        } else {
            return "win"
        }
    }
}

const get_text_color = (round_result) => {
    if (round_result === 'win') {
        return color.green(round_result.toUpperCase())
    } else if (round_result === 'lose') {
        return color.red(round_result.toUpperCase())
    } else {
        return color.yellow(round_result.toUpperCase())
    }
}

const print_results = (round_result) => {
    let message = `User choice: ${full_name[round_result.user_choice]}`
    message += `\nComputer Choice: ${full_name[round_result.computer_choice]}`
    message += `\nRound result: ${get_text_color(round_result.user_result)}`
    console.log(message)
}

const update_user_results = (round_result, user_results) => {
    user_results.roundsPlayed ++ 
    if (round_result.user_result === 'win') {
        user_results.wins ++ 
    } else if (round_result.user_result === 'lose') {
        user_results.losses ++ 
    } else {
        user_results.draws ++ 
    }
    user_results.lastRoundResults = round_result
}

const play_game = () => {
    let user_results = {
        "roundsPlayed":0,
        "wins":0,
        "losses":0,
        "draws":0,
        "lastRoundResults":{}
    }
    let round_number = 0
    while (true) {
        console.log("New Round...")
        let user_choice = get_user_choice()
        if (user_choice === "q") { break }

        if (user_choice === "re") {
            console.log(`User Results:\n${user_results}`)
            continue
        } 

        round_number ++ 
        console.log(`\nRound ${round_number}:`)
        let computer_choice = get_computer_choice()
        let user_result = determine_result(user_choice, computer_choice)
        let round_result = {user_result, round_number, user_choice, computer_choice}
        
        print_results(round_result)
        update_user_results(round_result, user_results)        
    }
}


play_game()
