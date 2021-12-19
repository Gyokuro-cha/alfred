/** @format */

const Event = require("../Structures/Event.js");

const Discord = require("discord.js");

const ProfileModel = require("../Models/profileSchema.js");
const Moment = require("moment");


const A_DAY_IN_HRS = 24;



//Will need users to manually join the streak channel in order for their data to be initiatied into the db
module.exports = new Event("guildMemberAdd", async (client, member) => {
	console.log('member added');

    const channel = member.guild.channels.cache.find(
		c => c.name == "general"
	);

	if (!channel) return;

	// Check if user is in db if not create
	// If true check if they checkin the last 24 hrs

	await ProfileModel.
        find({
            userID: client.user.id
        })
        .exec(async function (_err, _profile) {
            if (_err){
                return res.status(422).json({
                    errors: {
                        name: _err.name,
                        message: _err.message
                    },
                });
            }

			if (_profile.length === 0) {
				let profile = await ProfileModel.create({
					userID: client.user.id,
					title: 'Journey Man',
					streak: 0
				});
			
				profile.save();
			} else {
				let lastCheckInDate = Moment(_profile[0].lastCheckIn);
            	let hours = Moment().diff(Moment(lastCheckInDate), 'hours');


				
			} 

			console.log('profile ' + _profile);
		});

	
    

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
