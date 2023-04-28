const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { eventNames } = require("../config/eventConfig");
const { moveConfig } = require("../config/battleConfig");

const buildSelectBattleMoveRow = (battle, stateId) => {
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(JSON.stringify({
            eventName: eventNames.BATTLE_MOVE_SELECT,
            stateId: stateId,
        }))
        .setPlaceholder("Select a move")
        .addOptions(Object.keys(battle.activePokemon.moveIds).map(moveId => {
            // TODO: remove moves on cooldown?
            const moveData = moveConfig[moveId];
            const cooldown = battle.activePokemon.moveIds[moveId];
            const cdString = cooldown > 0 ? ` (CD: ${cooldown})` : "";
            return {
                label: `${moveData.name}${cdString}`,
                value: `${moveId}`,
            }
        }));

    const actionRow = new ActionRowBuilder()
        .addComponents(selectMenu);

    return actionRow;
}

module.exports = {
    buildSelectBattleMoveRow
};