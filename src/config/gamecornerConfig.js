const { backpackItems } = require("./backpackConfig")

const games ={
    VOLT_SHOCK: "voltShock", //basically voltorb flip
    ALACARD_SHAM: "alacardSham", //aka hidden singleplayer blackjack.
    RIOLU_ROULETTE: "rioluRoulette"
    //IF POSSIBLE: SLOWPOKE_SLOTS: "slowpokeSlots"
    //MILTANK_HOLDEM: "miltankHoldem", (Will implement when more confident)
}
const gameConfig = {
    [games.VOLT_SHOCK]: {
        name: "Volt Shock",
        sprite: "https://archives.bulbagarden.net/media/upload/0/02/Voltorb_Flip.png",
        emoji: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/100.png",
        description: `The voltorbs have invaded minesweeper. Can you figure out which tiles don't have voltorbs on them?`,
        payout: `payout is: 1:5 for complete, 1:3 for half.`
        
    }
}

module.exports = {
    games,
    gameConfig
}