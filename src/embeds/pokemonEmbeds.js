const { rarities, rarityConfig, natureConfig, pokemonConfig, typeConfig, growthRateConfig } = require('../config/pokemonConfig');
const { moveConfig } = require('../config/battleConfig');
const { EmbedBuilder } = require('discord.js');
const { getWhitespace, getPBar, linebreakString, setTwoInline, getOrSetDefault } = require('../utils/utils');
const { getPokemonExpNeeded, buildPokemonStatString, buildPokemonBaseStatString } = require('../utils/pokemonUtils');
const { buildMoveString } = require('../utils/battleUtils');
const { backpackItems, backpackItemConfig } = require('../config/backpackConfig');
const { trainerFields } = require('../config/trainerConfig');
const { bannerTypeConfig, pokeballConfig } = require('../config/gachaConfig');
const { getPokeballsString } = require('../utils/trainerUtils');

const buildBannerEmbed = (trainer, bannerData) => {
    const type = bannerData.bannerType;
    const rateUp = bannerData.rateUp() || {};
    const pity = getOrSetDefault(trainer, "banners", trainerFields.banners.default)[type].pity;

    let displayPokemon = pokemonConfig["25"];
    if (rateUp[rarities.LEGENDARY]) {
        displayPokemon = pokemonConfig[rateUp[rarities.LEGENDARY][0]];
    }

    const rateUpRarities = Object.keys(rateUp);
    const rateUpWhitespace = getWhitespace(rateUpRarities);

    let rateUpString = "";
    for (let i = 0; i < rateUpRarities.length; i++) {
        const rarity = rateUpRarities[i];
        if (rateUp[rarity].length <= 0) {
            continue;
        }
        rateUpString += `\`${rateUpWhitespace[i]} ${rarity} \``;
        for (const speciesId of rateUp[rarity]) {
            const speciesData = pokemonConfig[speciesId];
            rateUpString += ` ${speciesData.emoji}`;
        }
        rateUpString += "\n";
    }
    if (rateUpString == "") {
        rateUpString = "None";
    }

    const embed = new EmbedBuilder();
    embed.setTitle(`${displayPokemon.emoji} ${bannerData.name}`);
    embed.setDescription(`${linebreakString(bannerData.description, 40)}`);
    embed.setColor(0xffffff);
    embed.setThumbnail(`${displayPokemon.sprite}`);
    embed.addFields(
        { name: "Type", value: `${bannerTypeConfig[type].name}`, inline: true },
        { name: "Pity", value: `${pity}/100`, inline: true },
        { name: "Rate Up", value: `${rateUpString}`, inline: false },
        { name: "Your Pokeballs", value: getPokeballsString(trainer), inline: false }
    );

    return embed;
}

const buildGachaInfoString = () => {
    let infoString = "**Gacha Info**\nUse Pokeballs to draw Pokemon from the Gacha! Each Pokeball has a different chance of drawing a Pokemon, with **better Pokeballs being more likely to draw rarer Pokemon.** The higher the rarity, the lower the chance of drawing that Pokemon.\n\n";
    infoString += "**Banners**\n";
    infoString += "Scroll through the banners using the buttons. Each banner has a different set of rate-up Pokemon. **When a rarity is drawn, there is a 50% chance to get a random rate-up Pokemon of that rarity instead.** If there are no rate-ups for that rarity, the Pokemon is random. There are also 3 banner types: Standard, Rotating, and Special.\n\n";
    infoString += "**Pity**\n";
    infoString += "Each banner has a pity counter. When a Pokemon is drawn, the pity counter increases according to the Pokeball used. **When the pity counter reaches 100, the next Pokemon drawn will be a random rate-up Legendary Pokemon,** or a random availible Legendary if no rate up. The pity counter resets when a rate-up Legendary Pokemon is drawn. Additionally, **pity is shared between all banners of the same type, and does not reset when rotating.**\n\n";
    infoString += "**Pokeballs**\n";
    for (const pokeball in pokeballConfig) {
        const chances = pokeballConfig[pokeball].chances;
        const pity = pokeballConfig[pokeball].pity;
        infoString += `${backpackItemConfig[pokeball].emoji} ${backpackItemConfig[pokeball].name}:`;
        for (const rarity in chances) {
            infoString += ` ${rarity}: ${Math.floor(chances[rarity] * 100)}% | `;
        }
        infoString += `Pity: ${pity}\n`;
    }
    return infoString;
}

// pokemon: user's pokemon data
// speciesData: pokemon species config data
const buildNewPokemonEmbed = (pokemon, pokeballId=backpackItems.POKEBALL, remaining=0) => {
    const speciesData = pokemonConfig[pokemon.speciesId];
    const pokeballData = backpackItemConfig[pokeballId];
    const pokeballString = `${pokeballData.emoji} You have ${remaining} ${pokeballData.name}s remaining.`;
    
    let typeString = "";
    for (let i = 0; i < speciesData.type.length; i++) {
        typeString += typeConfig[speciesData.type[i]].emoji;
        if (i < speciesData.type.length - 1) {
            typeString += " ";
        }
    }

    const ivString = `HP: ${pokemon.ivs[0]} | Atk: ${pokemon.ivs[1]} | Def: ${pokemon.ivs[2]} | SpA: ${pokemon.ivs[3]} | SpD: ${pokemon.ivs[4]} | Spe: ${pokemon.ivs[5]}`

    const embed = new EmbedBuilder();
    embed.setTitle(`${speciesData.name} (#${pokemon.speciesId})`);
    if (speciesData.rarity == rarities.LEGENDARY) {
        embed.setDescription(`You caught the LEGENDARY ${speciesData.name}!\n${pokeballString}`);
    } else {
        embed.setDescription(`You caught a ${speciesData.rarity} ${speciesData.name}!\n${pokeballString}`);
    }

    embed.setColor(rarityConfig[speciesData.rarity].color);
    embed.addFields(
        { name: "Type", value: typeString, inline: true },
        { name: "Nature", value: `${natureConfig[pokemon.natureId].name} (${natureConfig[pokemon.natureId].description})`, inline: true },
        { name: "Ability", value: pokemon.abilityId, inline: true },
        { name: "Shiny", value: pokemon.shiny ? "True" : "False", inline: true },
        { name: "IVs", value: ivString, inline: false },
    );
    embed.setImage(pokemon.shiny ? speciesData.shinySprite : speciesData.sprite);
    const lbHelp = '/info <id> to inspect this Pokemon\n/train <id> to train this Pokemon\n/list to see all your Pokemon';
    const footerText= `ID: ${pokemon._id}\n${lbHelp}`;
    embed.setFooter({ text: footerText });

    return embed;
}

const buildNewPokemonListEmbed = (pokemons, pokeballId=backpackItems.POKEBALL, remaining=0) => {
    let pokemonString = "You caught the following Pokemon:\n\n";
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        const speciesData = pokemonConfig[pokemons[i].speciesId];
        const ivPercent = pokemon.ivTotal * 100 / (31 * 6);

        pokemonString += `${pokemon.shiny ? "✨" : ""}${speciesData.emoji} **[${speciesData.rarity}] [IV ${Math.round(ivPercent)}%]** ${pokemon.name} (${pokemon._id})\n`;
    }
    const pokeballData = backpackItemConfig[pokeballId];
    const pokeballString = `${pokeballData.emoji} You have ${remaining} ${pokeballData.name}s remaining.`;

    const embed = new EmbedBuilder();
    embed.setTitle(`Gacha Results`);
    embed.setColor(0xffffff);
    embed.setDescription(`${pokemonString}\n${pokeballString}`);
    embed.setFooter({ text: `Select a Pokemon or use /info <id> to inspect it!` });

    return embed;
}

const buildPokemonListEmbed = (trainer, pokemons, page) => {
    let pokemonString = "\n";
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        const speciesData = pokemonConfig[pokemons[i].speciesId];
        const ivPercent = pokemon.ivTotal * 100 / (31 * 6);
        
        pokemonString += `${pokemon.shiny ? "✨" : ""}${speciesData.emoji} **[Lv. ${pokemon.level}] [IV ${Math.round(ivPercent)}%]** ${pokemon.name} (${pokemon._id})\n`;
    }

    const embed = new EmbedBuilder();
    embed.setTitle(`Trainer ${trainer.user.username}'s Pokemon`);
    embed.setColor(0xffffff);
    embed.setDescription(pokemonString);
    embed.setFooter({ text: `Page ${page} | Select a Pokemon or use /info <id> to inspect it!` });

    return embed;
}

const buildPokemonEmbed = (trainer, pokemon) => {
    const speciesData = pokemonConfig[pokemon.speciesId];

    let typeString = "";
    for (let i = 0; i < speciesData.type.length; i++) {
        typeString += typeConfig[speciesData.type[i]].emoji;
        if (i < speciesData.type.length - 1) {
            typeString += " ";
        }
    }

    const oldLevelExp = getPokemonExpNeeded(pokemon.level, speciesData.growthRate);
    const newLevelExp = getPokemonExpNeeded(pokemon.level + 1, speciesData.growthRate);
    const levelPercent = pokemon.level >= 100 ? 0 : ((pokemon.exp || 0) - oldLevelExp) / (newLevelExp - oldLevelExp) * 100;
    const progressBar = `${getPBar(levelPercent, 20)} -- ${Math.round(levelPercent)}%`;

    const statString = buildPokemonStatString(pokemon);

    // TODO: display original owner?
    const embed = new EmbedBuilder();
    embed.setTitle(`${trainer.user.username}'s ${pokemon.name}`);
    embed.setDescription(`${pokemon.shiny ? "✨" : ""}**[Lv. ${pokemon.level}]** ${speciesData.name} (#${pokemon.speciesId})\n${speciesData.description}`);
    embed.setColor(rarityConfig[speciesData.rarity].color);
    embed.addFields(
        { name: "Type", value: typeString, inline: true },
        { name: "Ability", value: pokemon.abilityId, inline: true },
        { name: "Nature", value: `${natureConfig[pokemon.natureId].name} (${natureConfig[pokemon.natureId].description})`, inline: true },
        { name: "Rarity", value: speciesData.rarity, inline: true },
        { name: "Shiny", value: pokemon.shiny ? "True" : "False", inline: true },
        { name: "Date Caught", value: new Date(pokemon.dateAcquired).toLocaleDateString(), inline: true },
        { name: "Stats (Stat|IVs|EVs)", value: statString, inline: false },
        { name: "Level Progress", value: progressBar, inline: false }
    );

    // if pokemon has moves, display them
    if (speciesData.moveIds) {
        const fields = speciesData.moveIds.map((moveId) => {
            const moveData = moveConfig[moveId];
            const { moveHeader, moveString } = buildMoveString(moveData);
            return {
                name: moveHeader,
                value: moveString,
                inline: true,
            };
        });
    
        // every 2 fields, add a blank field
        if (fields.length > 2) {
            for (let i = 2; i < fields.length; i += 3) {
                fields.splice(i, 0, { name: '** **', value: '** **', inline: false });
            }
        }

        embed.addFields(fields);
    }

    embed.setImage(pokemon.shiny ? speciesData.shinySprite : speciesData.sprite);

    const lbHelp = '/train <id> to train this Pokemon' + (pokemon.battleEligible ? '\n/partyadd <id> <position> to add this Pokemon to your party' : '');
    embed.setFooter({ text: `ID: ${pokemon._id}\n${lbHelp}` });

    return embed;
}

const buildSpeciesDexEmbed = (id, speciesData, tab) => {
    const embed = new EmbedBuilder();
    embed.setTitle(`${speciesData.emoji} #${id} ${speciesData.name}`);
    embed.setColor(rarityConfig[speciesData.rarity].color);
    
    if (tab === "info") {
        // display: description, type, abilities, rarity, battleEligibility, evolvable, growth rate
        let typeString = "";
        for (let i = 0; i < speciesData.type.length; i++) {
            typeString += typeConfig[speciesData.type[i]].emoji;
            if (i < speciesData.type.length - 1) {
                typeString += " ";
            }
        }

        let abilityString = "";
        for (let i = 0; i < Object.keys(speciesData.abilities).length; i++) {
            const abilityId = Object.keys(speciesData.abilities)[i];
            const abilityProbability = speciesData.abilities[abilityId];
            abilityString += `${abilityId} (${abilityProbability}%)`;
            if (i < Object.keys(speciesData.abilities).length - 1) {
                abilityString += "\n";
            }
        }

        embed.setDescription(`${linebreakString(speciesData.description, 40)}`);
        embed.addFields(
            { name: "Type", value: typeString, inline: true },
            { name: "Abilities", value: abilityString, inline: true },
            { name: "Battle Eligibile", value: speciesData.battleEligible ? "True" : "False", inline: true },
            { name: "Rarity", value: speciesData.rarity, inline: true },
            { name: "Evolvable", value: speciesData.evolution ? "True" : "False", inline: true },
            { name: "Growth Rate", value: growthRateConfig[speciesData.growthRate].name, inline: true },
        );
        embed.setImage(speciesData.sprite);
    } else if (tab === "growth") {
        // display: growth rate, base stats, total, evolutions
        let evolutionString = "";
        if (speciesData.evolution) {
            for (let i = 0; i < speciesData.evolution.length; i++) {
                const evolution = speciesData.evolution[i];
                evolutionString += `Lv. ${evolution.level}: #${evolution.id} ${pokemonConfig[evolution.id].name}`;
                if (i < speciesData.evolution.length - 1) {
                    evolutionString += "\n";
                }
            }
        } else {
            evolutionString = "No evolutions!";
        }

        embed.setDescription(`Growth information for #${id} ${speciesData.name}:`);
        embed.addFields(
            { name: "Growth Rate", value: growthRateConfig[speciesData.growthRate].name, inline: true },
            { name: "Base Stats", value: buildPokemonBaseStatString(speciesData), inline: false },
            { name: "Evolutions", value: evolutionString, inline: false },
        );
    } else if (tab === "moves") {
        // display: move strings
        if (!speciesData.moveIds) {
            embed.setDescription(`No moves!`);
        } else {
            const fields = speciesData.moveIds.map((moveId) => {
                const moveData = moveConfig[moveId];
                const { moveHeader, moveString } = buildMoveString(moveData);
                return {
                    name: moveHeader,
                    value: moveString,
                    inline: true,
                };
            });

            // every 2 fields, add a blank field
            setTwoInline(fields);

            embed.setDescription(`Moves for #${id} ${speciesData.name}:`);
            embed.addFields(fields);
        }
    }

    return embed;
}

module.exports = {
    buildBannerEmbed,
    buildNewPokemonEmbed,
    buildNewPokemonListEmbed,
    buildPokemonListEmbed,
    buildPokemonEmbed,
    buildSpeciesDexEmbed,
    buildGachaInfoString
}