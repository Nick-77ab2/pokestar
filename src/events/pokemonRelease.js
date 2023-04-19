const { getTrainer, addExpAndMoneyTrainer } = require("../services/trainer");
const { releasePokemons, listPokemons } = require("../services/pokemon");
const { getState, deleteState } = require("../services/state");
const { idFrom } = require("../utils/utils");
const { calculateWorth } = require("../utils/pokemonUtils");

const pokemonRelease = async (interaction, data) => {
    // get state
    const state = getState(data.stateId);
    if (!state) {
        await interaction.update({ 
            content: "This interaction has expired.",
            components: [] 
        });
        return { err: "This interaction has expired." };
    }

    // if data has userId component, verify interaction was done by that user
    if (state.userId && interaction.user.id !== state.userId) {
        return { err: "This interaction was not initiated by you." };
    }
    if (!data.yes) {
        await interaction.update({ 
            content: "Pokemon release cancelled.", 
            components: []
        });
        deleteState(data.stateId);
        return;
    }

    const trainer = await getTrainer(interaction.user);
    if (trainer.err) {
        return { err: trainer.err };
    }

    // make sure they have all pokemon still
    const toRelease = await listPokemons(
        trainer.data, 
        { page: 1, filter: { _id: { $in: state.pokemonIds.map(idFrom)} } }
    );
    if (toRelease.err) {
        return { err: toRelease.err };
    } else if (toRelease.data.length !== state.pokemonIds.length) {
        await interaction.update({ 
            content: "One or more of the pokemon you selected to release are no longer in your party.",
            components: []
        });
        deleteState(data.stateId);
        return { err: "One or more of the pokemon you selected to release are no longer in your party." };
    }

    const releaseResult = await releasePokemons(trainer.data, state.pokemonIds);
    if (releaseResult.err) {
        return { err: releaseResult.err };
    } 

    // if deleted count equals pokemonIds length, add money
    if (releaseResult.data === state.pokemonIds.length) {
        const money = calculateWorth(toRelease.data);
        await addExpAndMoneyTrainer(trainer.data, 0, money);
    }

    await interaction.update({ 
        content: "Pokemon released. Bye-bye!",  
        components: [] 
    });
    deleteState(data.stateId);
}

module.exports = pokemonRelease;