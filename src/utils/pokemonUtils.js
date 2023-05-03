const { growthRates, rarityConfig, pokemonConfig } = require('../config/pokemonConfig');
const { getPBar, getWhitespace } = require('./utils');

const getPokemonExpNeeded = (level, growthRate) => {
    if (level <= 1) {
        return 0;
    }

    if (growthRate == growthRates.FAST) {
        // (1/2) x ^ 2.5
        return Math.floor(0.5 * Math.pow(level, 2.5));
    } else if (growthRate == growthRates.MEDIUMFAST) {
        // (4/5) x ^ 2.5
        return Math.floor(0.8 * Math.pow(level, 2.5));
    } else if (growthRate == growthRates.MEDIUMSLOW) {
        // x ^ 2.5
        return Math.floor(Math.pow(level, 2.5));
    } else if (growthRate == growthRates.SLOW) {
        // (3/2) x ^ 2.5
        return Math.floor(1.5 * Math.pow(level, 2.5));
    }

    return 0;
}

const calculateWorth = (pokemons=null, speciesIds=null) => {
    let worth = 0;
    if (pokemons) {
        pokemons.forEach(pokemon => {
            worth += rarityConfig[pokemonConfig[pokemon.speciesId].rarity].money;
        });
    } else if (speciesIds) {
        speciesIds.forEach(speciesId => {
            worth += rarityConfig[pokemonConfig[speciesId].rarity].money;
        });
    }

    return worth;
}

const buildPokemonStatString = (pokemon, size=20, compact=false) => {
    const statArray = [
        `${pokemon.stats[0]}` + (compact ? `` : `|${pokemon.ivs[0]}|${pokemon.evs[0]}`),
        `${pokemon.stats[1]}` + (compact ? `` : `|${pokemon.ivs[1]}|${pokemon.evs[1]}`),
        `${pokemon.stats[2]}` + (compact ? `` : `|${pokemon.ivs[2]}|${pokemon.evs[2]}`),
        `${pokemon.stats[3]}` + (compact ? `` : `|${pokemon.ivs[3]}|${pokemon.evs[3]}`),
        `${pokemon.stats[4]}` + (compact ? `` : `|${pokemon.ivs[4]}|${pokemon.evs[4]}`),
        `${pokemon.stats[5]}` + (compact ? `` : `|${pokemon.ivs[5]}|${pokemon.evs[5]}`)
    ];
    const whitespace = getWhitespace(statArray);
    let statString = "";
    statString += `\` HP (${whitespace[0]}${statArray[0]})\` ${getPBar(pokemon.stats[0] * 100 / 300, size=size)}\n`;
    statString += `\`Atk (${whitespace[1]}${statArray[1]})\` ${getPBar(pokemon.stats[1] * 100 / 300, size=size)}\n`;
    statString += `\`Def (${whitespace[2]}${statArray[2]})\` ${getPBar(pokemon.stats[2] * 100 / 300, size=size)}\n`;
    statString += `\`SpA (${whitespace[3]}${statArray[3]})\` ${getPBar(pokemon.stats[3] * 100 / 300, size=size)}\n`;
    statString += `\`SpD (${whitespace[4]}${statArray[4]})\` ${getPBar(pokemon.stats[4] * 100 / 300, size=size)}\n`;
    statString += `\`Spe (${whitespace[5]}${statArray[5]})\` ${getPBar(pokemon.stats[5] * 100 / 300, size=size)}\n`;
    statString += `Power: ${pokemon.combatPower}`;

    return statString;
}

module.exports = {
    getPokemonExpNeeded,
    calculateWorth,
    buildPokemonStatString
};