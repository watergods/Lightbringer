exports.run = (bot, msg, args) => {
    if (msg.guild)
        bot.utils.assertEmbedPermission(msg.channel, msg.member);

    const parsed = bot.utils.parseArgs(args, ['r', 'f:']);
    const random = parsed.options.r || false;
    const find = parsed.options.f || false;
    let guild;

    if (find) {
        guild = bot.guilds.filter(guild => (guild.name.toLowerCase().indexOf(find.toLowerCase()) >= 0));

        if (guild.size < 1)
            throw 'Guild by that name was not found!';
        else
            guild = guild.first();
    } else {
        guild = random ? bot.guilds.random() : msg.guild;
    }

    const emojis = guild.emojis;
    if (emojis.size < 1)
        throw 'The guild does not have any emojis!';

    msg.edit(msg.content, { embed:
        bot.utils.formatLargeEmbed('', '', {
            delimeter: ' ',
            children: emojis.map(e => e.toString())
        }).setAuthor(`Emojis of ${guild.name} [${emojis.size}]`, guild.iconURL)
    }).catch(msg.error);
};

exports.info = {
    name: 'emojis',
    usage: 'emojis [options]',
    description: 'Gets the emojis of the current guild',
    options: [
        {
            name: '-r',
            usage: '-r',
            description: 'Uses a random guild instead'
        },
        {
            name: '-f',
            usage: '-f <guild name>',
            description: 'Uses a certain guild instead'
        }
    ]
};
