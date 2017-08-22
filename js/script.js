// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
// document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var quotes = [
	{ 
		quote: "There are known knowns. These are things we know that we know. There are known unknowns. That is to say, there are things that we know we don't know. But there are also unknown unknowns. There are things we don't know we don't know.",
		source: "Donald Rumsfeld",
		citation: "DoD News Briefing",
		year: "2002",
		tags: ["politics", "brainy"]
	}, 
	{ 
		quote: "You must be the change you wish to see in the world.",
		source: "Mahatma Gandhi",
		tags: ["motiviational", "learning", "inspirational"]
	},
	{ 
		quote: "If you want to win anything - a race, yourself, your life - you have to go a little berserk.",
		source: "George A. Sheehan",
		tags: ["motiviational", "sports"]
	},
	{ 
		quote: "Wisdom cannot be imparted. Wisdom that a wise man attempts to impart always sounds like foolishness to someone else... Knowledge can be communicated, but not wisdom. One can find it, live it, do wonders through it, but one cannot communicate and teach it.",
		source: "Hermann Hesse", 
		citation: "Siddartha", 
		year: "1992", 
		tags: ["life", "wisdom", "learning"]
	},
	{ 
		quote: "'I wish it need not have happened in my time,' said Frodo. 'So do I,' said Gandalf, 'and so do all who live to see such times. But that is not for them to decide. All we have to decide is what to do with the time that is given us.'",
		source: "Gandalf the Grey", 
		citation: "The Fellowship of the Ring",
		year: "1954",
		tags: ["positive", "inspirational"]
	}, 
	{
		quote: "'I speak to everyone in the langauge they understand,' said Ender. 'That isn't being slick. It's being clear'",
		source: "Orson Scott Card",
		citation: "Speaker for the Dead",
		year: "1986",
		tags: ["life", "wisdom"] 
	}
];

var seenQuotes = quotes.slice(0); 
var backgroundColors = ["#36b55c", "#FFA500", "#1E90FF", "#FF6347", "#BA55D3"];
var backgroundCounter = 0;
var timeChecker; 

//Print quote every 30 seconds since last quote displayed
function timeDisplay () {
	clearInterval(timeChecker);
	timeChecker = setInterval(function() {printQuote();}, 20000); 
}


//Print to div quote-box  
function print(message) {
	var output = document.getElementById("quote-box");
	output.innerHTML = message;
}

//Generates random number based on the length of the quotes array
function genRandNum (quotes) {
	var randomNum = Math.floor(Math.random() * quotes.length);
	return randomNum;
}

//Gets a random quote 
function getRandomQuote (quotes) {
	// Check if there are no more new quotes to display
	if (seenQuotes.length === 0) {
		seenQuotes = quotes.slice(0); 
		console.log("All quotes seen! Re-setting...");
	}

	var quoteObject = seenQuotes[genRandNum(seenQuotes)];

	// Remove quote from possible list
	var quoteIndex = seenQuotes.indexOf(quoteObject); 
	seenQuotes.splice(quoteIndex, 1);

	return quoteObject; 
}

//Change background color without repeating same color twice in a row
function changeBackground () {
	if (backgroundCounter === 5) {
		backgroundCounter = 0;
	}

	document.body.style.backgroundColor = backgroundColors[backgroundCounter];
	backgroundCounter ++; 
} 

//Print relevant tags 
function printTags (tagArray) {
	var html = ""; 
	for (var i = 0; i < tagArray.length; i++) {
		html += "<button class='tags'>" + tagArray[i] + "</button>";  
	}
	return html 
}

//Prints quote-box html using a random quote 
function printQuote () {	 

	//Construct html message 
	var quoteObj = getRandomQuote(quotes);
	var message = "<p class='quote'>" + quoteObj.quote + 
	"</p> <p class='source'>" + quoteObj.source; 
	if (quoteObj.hasOwnProperty("citation")) {
		message += "<span class='citation'>" + quoteObj.citation + "</span>";
	}
	if (quoteObj.hasOwnProperty("year")){
		message += "<span class='year'>" + quoteObj.year + "</span>";
	}
	message += "</p>" + printTags(quoteObj.tags); 
	
	console.log(message);
	print(message);
	changeBackground();
}

printQuote();
timeDisplay();   
 



