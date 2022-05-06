// const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { discordBotToken } = require('./config.json');
const mongoose = require('mongoose');
const db = require('./src/database')

mongoose.connect("mongodb://localhost:27017/");


client.commands = new Collection();

client.once('ready', async () => {
	console.log('Ready!');
	await db.getUsers();
	await db.syncProfiles();
});

client.login(discordBotToken);