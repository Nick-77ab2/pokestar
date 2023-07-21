/**
 * @file
 * @author Nick Pelletier
 * @date 2023
 * @section Description
 * 
 * gameSelect.js Creates the game that was selected.
*/
const { getState } = require("../../services/state");
const { buildGamesSend } = require("../../services/games");

const gameSelect = async (interaction, data) => {
    //get state
    const state = getState(data.stateId);
    if(!state){
        await interaction.update({
            components: []
        });
        return {err: "This interaction has expired." };
    }

    // verify user is the same as the user who pressed the button
    if (state.userId && interaction.user.id !== state.userId) {
        return { err: "This interaction was not initiated by you." };
    }

    const {send, err } = await buildGamesSend({
        stateId: data.stateId,
        user: interaction.user,
        view: "game",
        option: interaction.values[0],

    });
    if(err){
        return {err: err};

    }else{
        await interaction.update(send);
    }
}
module.exports = gameSelect;