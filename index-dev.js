const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { discordBotToken } = require('./config.json');
const { devProcess } = require('./src')
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/");


client.commands = new Collection();

client.once('ready', async () => {
	console.log('Test instance is ready!');

	devProcess();
});

client.login(discordBotToken);