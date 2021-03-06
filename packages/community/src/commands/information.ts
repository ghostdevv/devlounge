import { command } from 'jellycommands';
import type { Guild } from 'discord.js';
import { readFileSync } from 'fs';

const { version } = JSON.parse(readFileSync('package.json', 'utf-8'));

export default command({
    name: 'information',
    description: 'Get information about the server',

    global: true,

    defer: true,

    run: async ({ interaction }) => {
        const guild = interaction.guild as Guild;

        const emojis = await guild.emojis.fetch();
        const owner = await guild.fetchOwner();

        const displayEmojis = emojis
            .map((emoji) => emoji.toString())
            .join('  ');

        interaction.followUp({
            embeds: [
                {
                    title: 'The Dev Lounge Information',
                    color: '#cf4a4a',
                    fields: [
                        {
                            name: 'Member information',
                            value: `Total members: ${guild.memberCount}`,
                        },
                        {
                            name: 'Boost information',
                            value: `Tier: ${guild.premiumTier}\nBoosts: ${guild.premiumSubscriptionCount}`,
                        },
                        {
                            name: 'Emojis',
                            value: `Total: ${emojis.size}\nEmojis: ${displayEmojis}`,
                        },
                        {
                            name: 'General Information',
                            value: `Owner: ${owner.user.username}`,
                        },
                        {
                            name: 'Bot',
                            value: `Version: ${version} | [Github](https://github.com/ghostdevv/devlounge)`,
                        },
                    ],
                    thumbnail: {
                        url: guild.iconURL() || '',
                    },
                },
            ],
        });
    },
});
