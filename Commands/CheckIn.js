/** @format */

const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const Moment = require("moment");

const ProfileModel = require("../Models/profileSchema.js");

const A_DAY_IN_HRS = 0;


module.exports = new Command({
	name: "checkin",
	description: "Daily Check In for NoFap",
	permission: "SEND_MESSAGES",
	async run(message, args, client) {

        //Find user, check their last checkin date
        await ProfileModel.
        find({
            userId: client.user.id
        })
        .exec(function (_err, _profile) {
            let lastCheckInDate = Moment(_profile[0].lastCheckIn);
            let hours = Moment().diff(Moment(lastCheckInDate), 'hours');

            if (hours < A_DAY_IN_HRS) {
                message.channel.send("You already checked in for today.");
            } else {
                message.channel.send("Are you here to do a daily check in?");
                let collector = new Discord.MessageCollector(message.channel, () => true);
                collector.on("collect", (_msg) => {
                    if(_msg.content === 'exit' ){
                        message.channel.send("You finished your daily check in");
                        collector.stop();
                    }
                    if(_msg.content === 'yes'){
                        message.channel.send("Did you complete another day without a relapse? (Type I did, or I did not)");
                    }
                    if(_msg.content === 'I did'){
                        //update counter and lastCheckInDate
                        ProfileModel.updateOne(
                            {userID: client.user.id},
                            {streak: (_profile[0].streak + 1),
                                title: _profile[0].title},
                            {upsert: false},
                            function (_err, _profile) {
                                if (_err) {
                                    console.error(_err);
                                };                                
                            }
                        );
                        message.channel.send("Updated");
                        collector.stop();
                    }
                    if(_msg.content === 'I did  not'){
                        //update counter and lastCheckInDate
                        ProfileModel.updateOne(
                            {userID: client.user.id},
                            {streak: (_profile[0].streak - 1),
                                title: _profile[0].title},
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

        })



    


        // client.on("message", async message => {
        //     // accepted messages will be those from the same author, we compare IDs to make sure
        //     const filter = msg => msg.author.id == message.author.id;


        //     // the only option needed will be maxMatches, to only take one message before ending the collector
        //     const options = {
        //         maxMatches: 1
        //     };
        //     if (message.content === "!checkin") {
        //         // request
        //         message.channel.send("Are you here to do a daily check in?");
            
        //         // collector
        //         await message.channel.awaitMessages(filter, options)
        //         .then(collected => message.reply("answer " + collector.first().content + "!"));
        //       }
        //   });
          

       
		// const msg = await message.reply(`Ping: ${client.ws.ping} ms.`);

		// msg.edit(
		// 	`Ping: ${client.ws.ping} ms.\nMessage Ping: ${
		// 		msg.createdTimestamp - message.createdTimestamp
		// 	}`
		// );
	}
});

