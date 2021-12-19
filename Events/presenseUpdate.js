const Event = require("../Structures/Event.js");
const ProfileModel = require("../Models/profileSchema.js");
const Moment = require("moment");
const A_DAY_IN_HRS = 24;

module.exports = new Event("presenceUpdate", async (client, member) => {
    await ProfileModel.
        find({
            userId: client.user.id
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
					userID: member.id,
					title: 'Journey Man',
					streak: 0
				});
			
				profile.save();
			} else {
				let lastCheckInDate = Moment(_profile[0].lastCheckIn);
            	let hours = Moment().diff(Moment(lastCheckInDate), 'hours');
                
                //decrement if they didn't checkin
                // if (hours < A_DAY_IN_HRS) {
                        
                // }

                ProfileModel.updateOne(
                    {userID: client.user.id},
                    {streak: 0},
                    {upsert: true},
                    function (_err, _profile) {
                        if (_err) {
                            console.error(_err);
                        };
                        
                        console.log('updated ' + _profile);
                    }
                );
                

				
			} 

			console.log('profile ' + _profile);
		});
});