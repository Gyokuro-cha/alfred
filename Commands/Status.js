/** @format */

const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const ProfileModel = require("../Models/profileSchema.js");

const GUILD_NAME = "NoFapGuru's Bot Testing Server";

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
            userId: client.user.id
        })
        .exec(function (_err, _profile) {
            if (_err){
                return res.status(422).json({
                    errors: {
                        name: _err.name,
                        message: _err.message
                    },
                });
            }

            const guild = client.guilds.cache.find(
                g => g.name == GUILD_NAME
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
                .setAuthor(client.user.tag)
                .setThumbnail(client.user.avatarURL({ dynamic: true }))
                .addFields(
                    {
                        name: "Account Creation Day",
                        value: client.user.createdAt.toUTCString().toString(),
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

            channel.send({ embeds: [embed] });        

        });


		
	}
});


