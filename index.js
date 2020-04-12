//Requires the Discord.js module, the config module, and creates a new Discord client
const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();
//Login token for the bot, keep sneaky quiet
client.login(config.token);

//Once the client is ready, lets the user know
client.once('ready', () => {
	console.log('Ready!');
});

//Opday from the day I wrote this, dateCalc should have been adding a week's worth of milliseconds
//every time opday rolls around, but if you have a better idea for how to do this I'm all ears
var opday = Date.parse('18 Apr 2020 18:00:00 GMT');

//Looks for the command '!opday' in all channels of the Discord, then posts the results of dateCalc
//into the channel it was summoned in
client.on('message', message => {
	if (message.content.toLowerCase() === '!opday') {
		client.channels.cache.get('698571867124138087').send(dateCalc(opday));
	}

//Plus a help option, for help
	else if (message.content.toLowerCase() === '!help') {
		client.channels.cache.get('698571867124138087').send('This bot counts down how long until the next opday!\nTo get the countdown just type !opday.')
	}
})


function dateCalc(opday) {
	//Gets today's date in milliseconds, then subtracts todays date in milliseconds to get the amount
	//of time before the next opday
	today = Date.now();
	var timeUntil = opday - today;

	//If an opday has passed, it moves the variable for opday up a week in miliseconds, then continues
	//the calculation
	if(timeUntil < 0) {
		opday = opday + 604800000;
		timeUntil = opday - today;
	}

	//This figures out how many days until opday, rounding down with Math.floor, then takes the remaining
	//miliseconds for conversion to hours
	var daysUntil = Math.floor(timeUntil / 86400000);
	timeUntil = timeUntil % 86400000;

	//This does the same as days, but for hours
	var hoursUntil = Math.floor(timeUntil / 3600000);
	timeUntil = timeUntil % 3600000;

	//This does the same as hours, but for minutes
	var minutesUntil = Math.floor(timeUntil / 60000);
	timeUntil = timeUntil % 60000;

	//This does the same as minutes, but for seconds. It also doesn't round down, because if you're checking
	//down to the milisecond, fuck you!
	var secondsUntil = (timeUntil / 1000).toFixed(0);

	//And here she is, putting it all into a string for a beautiful countdown to our next day of fun!
	timeUntil = daysUntil + " days, " + hoursUntil + " hours, " + minutesUntil + " minutes, and " + secondsUntil + " seconds until OPDAY!!!";

	return timeUntil;
}
