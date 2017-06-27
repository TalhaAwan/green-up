var scoreRemarks = {
	0: "You scored nothing, please try again",
	10: "Poor Try :(",
	20: "Not a good sign",
	30: "Poor by a long shot",
	40: "Need a lot of improvement",
	50: "Half if better than nothing",
	60: "Nice, but not there yet",
	70: "Lots of improvement! Keep it up",
	80: "Awesome, getting close!",
	90: "Great! A few steps away from the ultimate",
	100: "Excellent! You can't get any better than 100%. Great job and keep it up."
}
function checkTest(testId, problemStatement){
	var answerId = 'test'+testId+'answer';
	var statusId = 'test'+testId+'status';
	var answer = document.getElementById(answerId).value;
	var maxLength = answer.length > problemStatement.length? answer.length : problemStatement.length;
	var lev = new Levenshtein(document.getElementById(answerId).value, problemStatement);
	var percentage = Math.round(((maxLength -lev.distance)/maxLength)*100);
	var roundScore = Math.round(percentage / 10) * 10;
    document.getElementById(statusId).innerHTML = "("+percentage+"/100) " + scoreRemarks[roundScore];
}

