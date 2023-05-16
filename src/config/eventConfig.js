const eventNames = {
    POKEMON_SCROLL: "pokemonScroll",
    POKEMON_RELEASE: "pokemonRelease",
    POKEMON_LIST_SELECT: "pokemonSelect",
    POKEMON_EVOLVE_SELECT: "pokemonEvolveSelect",
    POKEMON_EVOLVE_CONFIRM: "pokemonEvolveConfirm",
    POKEDEX_BUTTON: "pokedexButton",
    SHOP_SELECT: "shopSelect",
    SHOP_BUY: "shopBuy",
    HELP_SELECT: "helpSelect",
    PVP_ACCEPT: "pvpAccept",
    PVE_SCROLL: "pveScroll",
    PVE_SELECT: "pveSelect",
    PVE_ACCEPT: "pveAccept",
    BATTLE_INFO: "battleInfo",
    BATTLE_MOVE_SELECT: "battleMoveSelect",
    BATTLE_TARGET_SELECT: "battleTargetSelect",
    BANNER_SCROLL: "bannerScroll",
    BANNER_BUTTON: "bannerButton",
    BANNER_GACHA: "bannerGacha",
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
        "exp": 10,
        "money": 25,
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
    [eventNames.POKEDEX_BUTTON]: {
        "name": "Pokedex Button",
        "execute": "pokedexButton.js",
    },
    [eventNames.SHOP_SELECT]: {
        "name": "Shop Select",
        "execute": "shopSelect.js",
    },
    [eventNames.SHOP_BUY]: {
        "name": "Shop Buy",
        "execute": "shopBuy.js",
        "exp": 15,
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
    [eventNames.PVE_SCROLL]: {
        "name": "PVE Scroll",
        "execute": "pveScroll.js",
    },
    [eventNames.PVE_SELECT]: {
        "name": "PVE Select",
        "execute": "pveSelect.js",
    },
    [eventNames.PVE_ACCEPT]: {
        "name": "PVE Accept",
        "execute": "pveAccept.js",
        "exp": 10,
        "money": 25,
    },
    [eventNames.BATTLE_INFO]: {
        "name": "Battle Info",
        "execute": "battleInfo.js",
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
    [eventNames.BANNER_SCROLL]: {
        "name": "Gacha Scroll",
        "execute": "bannerScroll.js",
    },
    [eventNames.BANNER_BUTTON]: {
        "name": "Gacha Button",
        "execute": "bannerButton.js",
    },
    [eventNames.BANNER_GACHA]: {
        "name": "Gacha",
        "execute": "bannerGacha.js",
        "exp": 25,
        "money": 50,
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
