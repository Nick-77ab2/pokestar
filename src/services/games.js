/**
 * @file
 * @author Nick Pelletier
 * @date 2023
 * @section Description
 * 
 * games.js creates the game center backend.
*/
//const {gameConfig} = require("../config/gamecenterConfig");
const { getOrSetDefault, formatMoney } = require("../utils/utils");
const { v4: uuidv4, v4 } = require('uuid');
const {buildGamesListEmbed} = require("../embeds/gamecornerEmbeds");
const { buildButtonActionRow } = require("../components/buttonActionRow");
const { getTrainer, addExpAndMoney, updateTrainer } = require("./trainer");
const { addPokemonExpAndEVs, getPokemon, calculatePokemonStats } = require("./pokemon");
const { logger } = require("../log");
const { deleteState } = require("./state");
const { buildScrollActionRow } = require("../components/scrollActionRow");
const { getState } = require("./state");
const {games, gameConfig } = require('../config/gamecornerConfig');
const { eventNames } = require("../config/eventConfig");
const { buildIdConfigSelectRow } = require("../components/idConfigSelectRow");
const { addRewards, getRewardsString, flattenCategories, flattenRewards } = require("../utils/trainerUtils");

const buildGamesSend = async ({ stateId=null, user=null, view="list", option=null} = {}) =>{
    //get state
    const state = getState(stateId);

    //get trainer
    let trainer = await getTrainer(user);
    if (trainer.err){
        return {send: null, err:trainer.err};
    }
    trainer = trainer.data;

    const send = {
        embeds: [],
        components: []
    }
    if (view ==="list"){
        //build list embed
        const embed = buildGamesListEmbed();
        send.embeds.push(embed);

        //build game select menu
        const gamesSelectRowData ={
            stateId: stateId,
        };
        const gamesSelectRow = buildIDConfigSelectRow(
            Object.values(games),
            gameConfig,
            "Select a game to play:",
            gamesSelectRowData,
            eventNames.GAME_SELECT,
            false
        );
        send.components.push(gamesSelectRow);
    } else if (view === "game"){
        const gameData = gameConfig[option];
        if (gameData === undefined){
            return {embed: null, err: `Invalid Game!`};
        }
        // get trainer
        const trainer = await getTrainer(user);
        if (trainer.err) {
            return { embed: null, err: trainer.err };
        }
        //start game
    }
}

module.exports = {
    buildGamesSend
}