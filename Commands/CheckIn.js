/** @format */

const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const Moment = require("moment");

const ProfileModel = require("../Models/profileSchema.js");

const A_DAY_IN_HRS = 24;

const TWO_DAYS_IN_HRS = 48;


module.exports = new Command({
	name: "checkin",
	description: "Daily Check In for NoFap",
	permission: "SEND_MESSAGES",
	async run(message, args, client) {

        if (message.channel.name !== 'daily-streak') {
            message.channel.send(`This command is not allowed in ${message.channel.name}`);
            return;
        }

        //Find user, check their last checkin date
        await ProfileModel.
        find({
            userID: message.author.id
        })
        .exec(async function (_err, _profile) {

            if (_profile.length === 0) {
				
                await message.channel.send(`Your profile can't be found, try !initiate to initialize`);

			} else {
                let lastCheckInDate = Moment(_profile[0].lastCheckIn);
                let hours = Moment().diff(Moment(lastCheckInDate), 'hours');

                if (hours < A_DAY_IN_HRS) {
                    message.channel.send("You already checked in for today." + " You need to wait " + hours + " hours before next check in");
                } else {
                    message.channel.send("Are you here to do a daily check in? (type yes or no)");
                    let collector = new Discord.MessageCollector(message.channel, () => true);
                    collector.on("collect", (_msg) => {
                        if(_msg.content.toLowerCase() === 'exit' ){
                            message.channel.send("You finished your daily check in");
                            collector.stop();
                        }else if(_msg.content.toLowerCase() === 'yes'){
                            message.channel.send("Did you complete another day without a relapse? (Type I did, or I did not)");
                        }else if(_msg.content.toLowerCase() === 'no'){
                            message.channel.send("Have a good day! Bye!");
                            collector.stop();
                        }else if(_msg.content.toLowerCase() === 'i did'){
                            //update counter and lastCheckInDate
                            ProfileModel.updateOne(
                                {userID: message.author.id},
                                {streak: (_profile[0].streak + 1),
                                    title: _profile[0].title,
                                    lastCheckIn: Date.now()    
                                },
                                {upsert: false},
                                function (_err, _profile) {
                                    if (_err) {
                                        console.error(_err);
                                    };                                
                                }
                            );
                            message.channel.send("Updated");
                            collector.stop();
                        }else if(_msg.content.toLowerCase() === 'i did not'){
                            //update counter and lastCheckInDate
                            ProfileModel.updateOne(
                                {userID: message.author.id},
                                {streak: 0,
                                    title: _profile[0].title,
                                    lastCheckIn: Date.now()
                                },
                                {upsert: false},
                                function (_err, _profile) {
                                    if (_err) {
                                        console.error(_err);
                                    };                                
                                }
                            );
                            message.channel.send("That's Unfortunate.  Don't give up.");
                            collector.stop();
                        }
                    });
                }
				
			} 


        })

	}
});

