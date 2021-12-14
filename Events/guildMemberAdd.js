/** @format */

const Event = require("../Structures/Event.js");

const Discord = require("discord.js");

const ProfileModel = require("../Models/profileSchema.js");


//Will need users to manually join the streak channel in order for their data to be initiatied into the db
module.exports = new Event("guildMemberAdd", async (client, member) => {
	console.log('member added');

    const channel = member.guild.channels.cache.find(
		c => c.name == "general"
	);

	if (!channel) return;

	let profile = await ProfileModel.create({
		userID: member.id,
		streak: 0
	});

	profile.save();
    

    channel.send(`welcome <@${member.user.id}> to NoFap and Semen Retention Server`);

	// const embed = new Discord.MessageEmbed();

	// embed
	// 	.setTitle("New Member")
	// 	.setColor("GREEN")
	// 	.setAuthor(member.user.tag)
	// 	.setThumbnail(member.user.avatarURL({ dynamic: true }))
	// 	.addFields(
	// 		{
	// 			name: "Account Created",
	// 			value: member.user.createdAt.toUTCString(),
	// 			inline: true
	// 		},
	// 		{
	// 			name: "User Joined",
	// 			value: member.joinedAt.toUTCString(),
	// 			inline: true
	// 		}
	// 	)
	// 	.setTimestamp(member.joinedTimestamp);

	// channel.send({ embeds: [embed] });
});
