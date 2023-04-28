const { pokemonConfig } = require('../config/pokemonConfig');

const buildPartyString = (pokemons, rows, cols, reverse=false, hp=false, emphPosition=null) => {
    let globalIndex = 0;
    let partyString = '';
    // set rows to be a range to iterate over
    const iter = reverse ? [...Array(rows).keys()].reverse() : [...Array(rows).keys()];
    for (let i of iter) {
        // build top line and HP if needed
        let rowString = '`';
        globalIndex = i * cols;
        for (let j = 0; j < cols; j++) {
            const lplus = emphPosition && (emphPosition - 1 == globalIndex || emphPosition == globalIndex) ? '╬' : '+';
            const rplus = emphPosition && emphPosition - 1 == globalIndex ? '╬' : '+';
            const border = emphPosition && emphPosition - 1 == globalIndex ? '=' : '-';
            const pokemon = pokemons[globalIndex];
            if (hp && pokemon) {
                // get hp percent
                let hpPercent = 0;
                if (pokemon.hp > 0) {
                    hpPercent = Math.max(Math.round(Math.floor(pokemon.hp * 100 / pokemon.maxHp)), 1);
                } else {
                    hpPercent = 0;
                }
                // make string
                const hpString = `${hpPercent}%`;
                // add to row string based on length of hp string
                const hpLength = hpString.length;
                if (hpLength === 2) {
                    rowString += `${lplus}${border}${border}${hpString}${border}`;
                } else if (hpLength === 3) {
                    rowString += `${lplus}${border}${hpString}${border}`;
                } else if (hpLength === 4) {
                    rowString += `${lplus}${border}${hpString}`;
                }
            } else {
                rowString += `${lplus}${border}${border}${border}${border}${border}`;
            }
            if (j == cols - 1) {
                rowString += `${rplus}\``;
            }
            globalIndex++;
        }
        globalIndex -= cols;
        partyString += rowString + '\n';
        
        // build pokemon line
        rowString = '`';
        for (let j = 0; j < cols; j++) {
            const lborder = emphPosition && (emphPosition - 1 == globalIndex || emphPosition == globalIndex) ? '║' : '|';
            const rborder = emphPosition && emphPosition - 1 == globalIndex ? '║' : '|';
            const pokemon = pokemons[globalIndex];
            const emoji = pokemon ? pokemonConfig[pokemon.speciesId].emoji : '⬛';
            rowString += `${lborder} \`${emoji}\` `;
            globalIndex++;
            if (j == cols - 1) {
                rowString += `${rborder}\``;
            }
        }
        globalIndex -= cols;
        partyString += rowString + '\n';

        // build bottom line with position
        rowString = '`';
        for (let j = 0; j < cols; j++) {
            const lplus = emphPosition && (emphPosition - 1 == globalIndex || emphPosition == globalIndex) ? '╬' : '+';
            const rplus = emphPosition && emphPosition - 1 == globalIndex ? '╬' : '+';
            const border = emphPosition && emphPosition - 1 == globalIndex ? '=' : '-';
            const position = globalIndex + 1;
            rowString += `${lplus}${border}${border}${position}${border}${border}`;
            if (j == cols - 1) {
                rowString += `${rplus}\``;
            }
            globalIndex++;
        }
        partyString += rowString;
        if (iter.indexOf(i) != iter.length - 1) {
            partyString += '\n';
        }
    }
    
    return partyString;
}

module.exports = {
    buildPartyString,
};