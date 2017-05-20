exports.run = (bot, msg) => {
    if (msg.mentions.users.size < 1)
        throw bot.consts.phrase('mention_to_x', { x: 'feed' });

    msg.edit(msg.mentions.users.map(m => `*forces ${bot.consts.foods[Math.round(Math.random() * (bot.consts.foods.length - 1))]} down ${m}'s throat*`).join('\n'));
};

exports.info = {
    name: 'feed',
    usage: 'feed <user-1> [user-2] ... [user-n]',
    description: 'Force a food item down some users\' throat'
};
