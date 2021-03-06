import 'dotenv/config';
import { JellyCommands } from 'jellycommands';
import { Intents } from 'discord.js';
import knex from './knex.js';
import { join } from 'desm';

const db = await knex();

const client = new JellyCommands({
    clientOptions: {
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        ],

        partials: ['MESSAGE', 'REACTION'],
    },

    commands: join(import.meta.url, './commands'),
    events: join(import.meta.url, './events'),

    props: {
        db,
    },

    dev: {
        global: process.env['NODE_ENV'] == 'development',
        guilds: ['663140687591768074'],
    },
});

client.login(process.env.TOKEN);
