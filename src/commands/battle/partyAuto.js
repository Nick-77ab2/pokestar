const { getTrainer } = require('../../services/trainer');
const { updateParty, getPartyPokemons } = require('../../services/party');
const { getPokemon, listPokemons } = require('../../services/pokemon');
const { buildPartyEmbed } = require('../../embeds/battleEmbeds');
const { pokemonConfig } = require('../../config/pokemonConfig');

const partyAuto = async (user) => {
    // get trainer
    const trainer = await getTrainer(user);
    if (trainer.err) {
        return { send: null, err: trainer.err };
    }
    const party = trainer.data.party;

    // remove all pokemon from party
    // get length of party
    const length = party.rows * party.cols;
    // remove all pokemon from party
    party.pokemonIds = Array(length).fill(null);

    // get 6 highest combat power, battle eligible pokemon
    const filter = {
        battleEligible: true,
    };
    const sort = {
        combatPower: -1
    };
    const bestPokemons = await listPokemons(trainer.data, {
        filter: filter,
        sort: sort,
        pageSize: 6,
        page: 1
    });
    if (bestPokemons.err) {
        return { send: null, err: bestPokemons.err };
    } else if (bestPokemons.data.length <= 0) {
        return { send: "You don't have any battle eligible pokemon! Use `/gacha` to catch some@", err: null };
    }

    // add best pokemons to party in random positions
    for (const pokemon of bestPokemons.data) {
        // if position is already taken, get new position
        while (true) {
            // get random position
            let position = Math.floor(Math.random() * length);
            // if position is empty, add pokemon
            if (!party.pokemonIds[position]) {
                party.pokemonIds[position] = pokemon._id.toString();
                break;
            }
        }
    }

    // update trainer
    const update = await updateParty(trainer.data, party);
    if (update.err) {
        return { send: null, err: update.err };
    }

    // get party pokemons
    const partyPokemons = await getPartyPokemons(trainer.data);
    if (partyPokemons.err) {
        return { send: null, err: partyPokemons.err };
    }

    // build pokemon embed
    const embed = buildPartyEmbed(trainer.data, partyPokemons.data);

    const send = {
        content: `Your party has been autofilled with your strongest Pokemon!`,
        embeds: [embed]
    }
    return { send: send, err: null };
}

const partyAutoMessageCommand = async (message) => {
    const { send, err } = await partyAuto(message.author);
    if (err) {
        await message.channel.send(`${err}`);
        return { err: err };
    } else {
        await message.channel.send(send);
    }
}

const partyAutoSlashCommand = async (interaction) => {
    const { send, err } = await partyAuto(interaction.user);
    if (err) {
        await interaction.reply(`${err}`);
        return { err: err };
    } else {
        await interaction.reply(send);
    }
}

module.exports = {
    message: partyAutoMessageCommand,
    slash: partyAutoSlashCommand
};


