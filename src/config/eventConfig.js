const eventNames = {
    POKEMON_SCROLL: "pokemonScroll",
    POKEMON_RELEASE: "pokemonRelease",
    POKEMON_LIST_SELECT: "pokemonSelect",
    POKEMON_EVOLVE_SELECT: "pokemonEvolveSelect",
    POKEMON_EVOLVE_CONFIRM: "pokemonEvolveConfirm",
    POKEMON_RELEASE_PAGE: "pokemonReleasePage",
    POKEMON_INFO_BUTTON: "pokemonInfoButton",
    POKEMON_ACTION_BUTTON: "pokemonActionButton",
    POKEDEX_LIST_BUTTON: "pokedexListButton",
    POKEDEX_BUTTON: "pokedexButton",
    EQUIPMENT_SELECT: "equipmentSelect",
    EQUIPMENT_BUTTON: "equipmentButton",
    EQUIPMENT_UPGRADE: "equipmentUpgrade",
    NATURE_SELECT: "natureSelect",
    NATURE_CONFIRM: "natureConfirm",
    SHOP_SELECT: "shopSelect",
    SHOP_BUY: "shopBuy",
    HELP_SELECT: "helpSelect",
    PARTY_ADD: "partyAdd",
    PVP_ACCEPT: "pvpAccept",
    PVE_SCROLL: "pveScroll",
    PVE_SELECT: "pveSelect",
    PVE_ACCEPT: "pveAccept",
    DUNGEON_SELECT: "dungeonSelect",
    DUNGEON_ACCEPT: "dungeonAccept",
    BATTLE_INFO: "battleInfo",
    BATTLE_MOVE_SELECT: "battleMoveSelect",
    BATTLE_TARGET_SELECT: "battleTargetSelect",
    BANNER_SCROLL: "bannerScroll",
    BANNER_BUTTON: "bannerButton",
    BANNER_GACHA: "bannerGacha",
    MEW_BUTTON: "mewButton",
    MEW_SELECT: "mewSelect",
    VOTE_REWARDS: "voteRewards",
    EVENT_BUTTON: "eventButton",
    TUTORIAL_BUTTON: "tutorialButton",
    BACK: "back",
    POKEMON_ID_SELECT: "pokemonIdSelect",
};

const eventConfig = {
    [eventNames.POKEMON_SCROLL]: {
        "name": "Pokemon Scroll",
        "execute": "pokemonScroll.js",
        "directory": "pokemon",
    },
    [eventNames.POKEMON_RELEASE]: {
        "name": "Pokemon Release",
        "execute": "pokemonRelease.js",
        "directory": "pokemon",
    },
    [eventNames.POKEMON_LIST_SELECT]: {
        "name": "Pokemon List Select",
        "execute": "pokemonListSelect.js",
        "directory": "pokemon",
        "exp": 10,
        "money": 25,
    },
    [eventNames.POKEMON_EVOLVE_SELECT]: {
        "name": "Pokemon Evolve Select",
        "execute": "pokemonEvolveSelect.js",
        "directory": "pokemon",
    },
    [eventNames.POKEMON_EVOLVE_CONFIRM]: {
        "name": "Pokemon Evolve Confirm",
        "execute": "pokemonEvolveConfirm.js",
        "directory": "pokemon",
        "exp": 25,
        "money": 200,
    },
    [eventNames.POKEMON_RELEASE_PAGE]: {
        "name": "Pokemon Release Page",
        "execute": "pokemonReleasePage.js",
        "directory": "pokemon",
    },
    [eventNames.POKEMON_INFO_BUTTON]: {
        "name": "Pokemon Info Button",
        "execute": "pokemonInfoButton.js",
        "directory": "pokemon",
    },
    [eventNames.POKEMON_ACTION_BUTTON]: {
        "name": "Pokemon Action Button",
        "execute": "pokemonActionButton.js",
        "directory": "pokemon",
    },
    [eventNames.POKEDEX_LIST_BUTTON]: {
        "name": "Pokedex List Button",
        "execute": "pokedexListButton.js",
        "directory": "pokemon",
    },
    [eventNames.POKEDEX_BUTTON]: {
        "name": "Pokedex Button",
        "execute": "pokedexButton.js",
        "directory": "pokemon",
    },
    [eventNames.EQUIPMENT_SELECT]: {
        "name": "Equipment Select",
        "execute": "equipmentSelect.js",
    },
    [eventNames.EQUIPMENT_BUTTON]: {
        "name": "Equipment Button",
        "execute": "equipmentButton.js",
    },
    [eventNames.EQUIPMENT_UPGRADE]: {
        "name": "Equipment Upgrade",
        "execute": "equipmentUpgrade.js",
        "exp": 15,
    },
    [eventNames.NATURE_SELECT]: {
        "name": "Nature Select",
        "execute": "natureSelect.js",
    },
    [eventNames.NATURE_CONFIRM]: {
        "name": "Nature Confirm",
        "execute": "natureConfirm.js",
        "exp": 10,
        "money": 25,
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
        "directory": "help",
    },
    [eventNames.BACK]: {
        "name": "Back",
        "execute": "back.js",
    },
    [eventNames.PARTY_ADD]: {
        "name": "Party Add",
        "execute": "partyAdd.js",
        "directory": "battle",
        "exp": 5,
        "money": 10,
    },
    [eventNames.PVP_ACCEPT]: {
        "name": "PVP Accept",
        "execute": "pvpAccept.js",
        "directory": "battle",
        "exp": 10,
        "money": 25,
    },
    [eventNames.PVE_SCROLL]: {
        "name": "PVE Scroll",
        "execute": "pveScroll.js",
        "directory": "battle",
    },
    [eventNames.PVE_SELECT]: {
        "name": "PVE Select",
        "execute": "pveSelect.js",
        "directory": "battle",
    },
    [eventNames.PVE_ACCEPT]: {
        "name": "PVE Accept",
        "execute": "pveAccept.js",
        "directory": "battle",
        "exp": 10,
        "money": 25,
    },
    [eventNames.DUNGEON_SELECT]: {
        "name": "Dungeon Select",
        "execute": "dungeonSelect.js",
        "directory": "battle",
    },
    [eventNames.DUNGEON_ACCEPT]: {
        "name": "Dungeon Accept",
        "execute": "dungeonAccept.js",
        "directory": "battle",
        "exp": 10,
        "money": 25,
    },
    [eventNames.BATTLE_INFO]: {
        "name": "Battle Info",
        "execute": "battleInfo.js",
        "directory": "battle",
    },
    [eventNames.BATTLE_MOVE_SELECT]: {
        "name": "Battle Move Select",
        "execute": "battleMoveSelect.js",
        "directory": "battle",
    },
    [eventNames.BATTLE_TARGET_SELECT]: {
        "name": "Battle Target Select",
        "execute": "battleTargetSelect.js",
        "directory": "battle",
        "exp": 10,
        "money": 25,
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
    [eventNames.MEW_BUTTON]: {
        "name": "Mew Button",
        "execute": "mewButton.js",
        "directory": "mythic",
    },
    [eventNames.MEW_SELECT]: {
        "name": "Mew Select",
        "execute": "mewSelect.js",
        "directory": "mythic",
        "exp": 5,
        "money": 10,
    },
    [eventNames.VOTE_REWARDS]: {
        "name": "Vote Rewards",
        "execute": "voteRewards.js",
        "exp": 25,
    },
    [eventNames.EVENT_BUTTON]: {
        "name": "Event Button",
        "execute": "eventButton.js",
        "directory": "help",
    },
    [eventNames.TUTORIAL_BUTTON]: {
        "name": "Tutorial Button",
        "execute": "tutorialButton.js",
        "directory": "help",
    },
    [eventNames.POKEMON_ID_SELECT]: {
        "name": "Pokemon ID Select",
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
