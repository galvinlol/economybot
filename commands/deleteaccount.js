const fs = require("fs");

module.exports.run = (client, message, args) => {
	 let user = JSON.parse(fs.readFileSync("./database.json"));
	 function getUserFromMention(mention) {
        if (!mention) return;
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
            return client.users.cache.get(mention);
        }
    }
	
	if (user[message.author.id].isUserAdministrator) {
		const mention = getUserFromMention(args[0]);
		if (!mention) return message.reply("You have to mention the user you want to **DELETE**!");
		if (!user[mention.id]) {
			return message.reply(`User **${mention.username}** **(**${mention.id}**)** **does not exist** in Bot's database.`);
		}
		delete user[mention.id];
		fs.writeFile("database.json", JSON.stringify(user), err => {
			 if (!err) {
				 message.reply(`Date: <t:${Date.now() / 1000 | 0}:F> Successfully DELETED **${mention.username}** **(**${mention.id}**)**.`);
			 }
		 })
	}
}