const eventNames = {
    POKEMON_SCROLL: "pokemonScroll",
    POKEMON_RELEASE: "pokemonRelease",
    POKEMON_LIST_SELECT: "pokemonSelect",
    POKEMON_EVOLVE_SELECT: "pokemonEvolveSelect",
    POKEMON_EVOLVE_CONFIRM: "pokemonEvolveConfirm",
    SHOP_SELECT: "shopSelect",
    HELP_SELECT: "helpSelect",
    PVP_ACCEPT: "pvpAccept",
    BATTLE_MOVE_SELECT: "battleMoveSelect",
    BATTLE_TARGET_SELECT: "battleTargetSelect",
    BACK: "back",
};

const eventConfig = {
    [eventNames.POKEMON_SCROLL]: {
        "name": "Pokemon Scroll",
        "execute": "pokemonScroll.js",
    },
    [eventNames.POKEMON_RELEASE]: {
        "name": "Pokemon Release",
        "execute": "pokemonRelease.js",
    },
    [eventNames.POKEMON_LIST_SELECT]: {
        "name": "Pokemon List Select",
        "execute": "pokemonListSelect.js",
    },
    [eventNames.POKEMON_EVOLVE_SELECT]: {
        "name": "Pokemon Evolve Select",
        "execute": "pokemonEvolveSelect.js",
    },
    [eventNames.POKEMON_EVOLVE_CONFIRM]: {
        "name": "Pokemon Evolve Confirm",
        "execute": "pokemonEvolveConfirm.js",
        "exp": 25,
        "money": 200,
    },
    [eventNames.SHOP_SELECT]: {
        "name": "Shop Select",
        "execute": "shopSelect.js",
    },
    [eventNames.HELP_SELECT]: {
        "name": "Help Select",
        "execute": "helpSelect.js",
    },
    [eventNames.BACK]: {
        "name": "Back",
        "execute": "back.js",
    },
    [eventNames.PVP_ACCEPT]: {
        "name": "PVP Accept",
        "execute": "pvpAccept.js",
        "exp": 10,
        "money": 25,
    },
    [eventNames.BATTLE_MOVE_SELECT]: {
        "name": "Battle Move Select",
        "execute": "battleMoveSelect.js",
    },
    [eventNames.BATTLE_TARGET_SELECT]: {
        "name": "Battle Target Select",
        "execute": "battleTargetSelect.js",
        "exp": 15,
        "money": 30,
    },
    "test": {
        "name": "Test",
        "execute": "testEvent.js",
    },
};

module.exports = {
    eventNames,
    eventConfig,
};