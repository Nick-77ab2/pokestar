const { collectionNames } = require("./databaseConfig");

const INVITE_URL = "https://discord.com/api/oauth2/authorize?client_id=1093411444877439066&permissions=517610982464&scope=bot%20applications.commands";

const voteConfig = [
    {
        "label": "DBL",
        "url": "https://discordbotlist.com/bots/pokestar"
    },
    {
        "label": "Botlist",
        "url": "https://botlist.me/bots/1093411444877439066"
    },
]

const leaderboardConfig = {
    "level": {
        "name": "Trainer Level",
        "collection": collectionNames.USERS,
        "label": ["level"],
    },
    "worth": {
        "name": "Total Pokemon Worth",
        "collection": collectionNames.POKEMON_AND_USERS,
        "label": ["pokemon", "totalWorth"],
    },
    "shiny": {
        "name": "Total Shiny Pokemon",
        "collection": collectionNames.POKEMON_AND_USERS,
        "label": ["pokemon", "totalShiny"],
    },
    "power": {
        "name": "Total Power",
        "collection": collectionNames.POKEMON_AND_USERS,
        "label": ["pokemon", "totalPower"],
    }
}

module.exports = {
    leaderboardConfig,
    INVITE_URL,
    voteConfig
}