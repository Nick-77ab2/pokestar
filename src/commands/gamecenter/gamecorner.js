/**
 * @file
 * @author Nick Pelletier
 * @date 2023
 * @section Description
 * 
 * gameCenter.js is used to create the command types for the game center and send delegated tasks.
*/
const { setState, deleteState } = require("../../services/state");
const { buildGameCenterSend } = require('../../services/games');

const gamecorner = async(user) =>{
    const stateId = setState({
        userId: user.id,
        messageStack:[],
    }, ttl=150);

    const {send, err} = await buildGameCornerSend({
        stateId: stateId,
        userId: user.id,
        view: "gameCenter",
        option: null
    }
    );
    if (err) {
        deleteState(stateId);
    }
    return { send: send, err: err };

}

const gamecornerMessageCommand = async (message) => {
    const {send, err} =await gamecenter(message.author);
    if(err){
        await message.channel.send(`${err}`);
        return { err: err };
    } else {
        await message.channel.send(send);
    }
}

const gamecornerSlashCommand = async (interaction) => {
    const { send, err } = await gamecenter(interaction.user);
    if (err) {
        await interaction.reply(`${err}`);
        return { err: err };
    } else {
        await interaction.reply(send);
    }
}

module.exports = {
    message: gamecornerMessageCommand,
    slash: gamecornerSlashCommand
};