/**
 * @file
 * @author Nick Pelletier
 * @date 2023
 * @section Description
 * 
 * gamecenterEmbeds.js Creates the embeded options for the gamecenter for user interaction.
*/
const { EmbedBuilder } = require("discord.js");
const {gameConfig} = require("../config/gamecornerConfig");
const { formatMoney } = require("../utils/utils");

//write the embed for showing the games.
const buildGamesListEmbed = () => {
    let gameString = "";
    //Setup copied from buildDungeonListEmbed expected to change.
    Object.entries(gameConfig).forEach(([gameId, gameData]) => {
        gameString += `**${gameData.emoji} ${gameData.name}** • ${gameData.description}\n\n`;
    });
    const embed = new EmbedBuilder();
    embed.setTitle(`Games`);
    embed.setColor(0xffffff);
    embed.setDescription(gameString);
    embed.setFooter({ text: `Play in the gamecenter to get coins for special prizes!` });

    return embed;
}

const buildGameEmbed = (gameId) => {
    //used in games.js after view === "games" and before view === "game"
    const gameData = gameConfig[gameId];
    const embed = new EmbedBuilder();
    embed.setTitle(`${gameData.emoji} ${gameData.name}`);
    embed.setColor(0xffffff);
    embed.setDescription(gameData.description);
    embed.addFields({name: "Payout", value: gameData.payout, inline: false });
    embed.setImage(gameData.sprite);
    embed.setFooter({text: "Use the buttons to set an amount to bet." });

    return embed;

}

module.exports ={
    buildGamesListEmbed,
    buildGameEmbed
}