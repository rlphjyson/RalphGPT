//Create a Discord Bot using OPEN AI API that interacts on the discord server
require('dotenv').config();

//connect to discord API
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

// connection to OpenAI API
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

//Check kung may nag send ng message sa discord
client.on('messageCreate', async function (message) {
    try {
        //para di madetect yung chat ng bot
        if (message.content.substring(0, 5) === "!") {
            if (message.author.bot) return;

            const gptResponse = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `${message.content}`,
                temperature: 1,
                max_tokens: 2048,
            })
            message.reply(`${gptResponse.data.choices[0].text}`);

        }
        return;
    } catch (err) {
        console.log(err);
    }
});

// log in yung bot sa discord

client.login(process.env.DISCORD_TOKEN);
console.log("RalphGPT is Online on Discord");


