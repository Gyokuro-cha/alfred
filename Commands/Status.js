/** @format */

const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const ProfileModel = require("../Models/profileSchema.js");

const GUILD_NAME_ONE = "NoFap and SemenRetention";

const GUILD_NAME_TWO = "NoFapGuru's Bot Testing Server";


const CHANNEL_NAME = "daily-streak";

module.exports = new Command({
	name: "status",
	description: "Show current user status",
	permission: "SEND_MESSAGES",
	async run(message, args, client) {

        //Check if the command is allowed in the channel
        
        if (message.channel.name !== 'daily-streak') {
            message.channel.send(`This command is not allowed in ${message.channel.name}`);
            return;
        }
    

        await ProfileModel.
        find({
            userID: message.author.id
        })
        .exec( async function (_err, _profile) {
            if (_err){
                console.error('error' + _err);
            }

            if (_profile.length === 0) {
				
                let msg = await message.channel.send(`Your profile can't be found, try !initiate to initialize`);
    
            } else {
                const guild = client.guilds.cache.find(
                    g => g.name == GUILD_NAME_ONE || GUILD_NAME_TWO
                );
    
                const channel = guild.channels.cache.find(
                    c => c.name == CHANNEL_NAME
                );
    
                const embed = new Discord.MessageEmbed();
                const streak = _profile[0].streak;
                const title = _profile[0].title;
    
                embed
                    .setTitle("Current Status")
                    .setColor("GREEN")
                    .setAuthor(message.author.username)
                    .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    .addFields(
                        {
                            name: "Account Creation Day",
                            value: message.author.createdAt.toUTCString().toString(),
                            inline: true
                        },
                        {
                            name: "Current Streak",
                            value: streak.toString(),
                            inline: true
                        },
                        {
                            name: "Title",
                            value: title.toString(),
                            inline: true
                        }
                    );


                    await message.channel.send({ embeds: [embed] });     
                    
            }

            
        });


		
	}
});


