/** @format */

const ProfileModel = require("../Models/profileSchema.js");

const Command = require("../Structures/Command.js");

module.exports = new Command({
	name: "initiate",
	description: "initialize the user!",
	permission: "SEND_MESSAGES",
	async run(message, args, client) {
        let msg;

        if (message.channel.name !== 'daily-streak') {
            message.channel.send(`This command is not allowed in ${message.channel.name}`);
            return;
        }

        await ProfileModel.
        find({
            userID: message.author.id
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
					userID: message.author.id,
                    userName: message.author.username,
					title: 'Journey Man',
					streak: 0
				});
			
				profile.save();
                await message.channel.send(`Your profile has been created.`);

			} else {
                await message.channel.send(`Profile already existed. Try !status to check your progress`)
				
			} 

		});

		
	}
});