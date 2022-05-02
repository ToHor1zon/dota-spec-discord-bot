// const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { discordBotToken } = require('./config.json');
const { mainProcess } = require('./src')
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/");


client.commands = new Collection();
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const command = require(`./commands/${file}`);
// 	// client.commands.set(command.data.name, command);
// }

client.once('ready', async () => {
	console.log('Ready!');

	mainProcess(client);
	setTimeout(() => mainProcess(client), 30000);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(discordBotToken);