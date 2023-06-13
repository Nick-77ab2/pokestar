const { StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");

const buildIdConfigSelectRow = (ids, config, placeholder, data, eventName, showId=true, extraFields=[]) => {
    const menuId = {
        eventName: eventName,
        ...data,
    }

    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(`${JSON.stringify(menuId)}`)
        .setPlaceholder(placeholder)
        .addOptions(ids.map(id => {
            const data = config[id];
            const extra = extraFields.map(field => {
                return data[field];
            }).join(" | ");
            return {
                label: `${data.name}${extra ? " | " + extra : ""}${showId ? " #" + id.toString() : ""}`,
                value: `${id}`,
            }
        }));

    const actionRow = new ActionRowBuilder()
        .addComponents(selectMenu);

    return actionRow;
}

module.exports = {
    buildIdConfigSelectRow: buildIdConfigSelectRow
};