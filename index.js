function loadJanuary(){
		document.getElementById('past').click();
}

window.onload = loadJanuary;

//VARIABLE DECLARATIONS

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
'Sep', 'Oct', 'Nov', 'Dec']
var currentMonthIndex = 1;
var currentYear = 2017;
var currentTimeIndex = 24205;
var currentMonth = months[currentMonthIndex];
var dateList = [];
var pre_post_Dates = [];
var monthEnd;
var monthStart;
var between;
var dateSelection;
var selectIndex = 0;

//FUNCTIONS

var returnUserYear = function(){
	return this.userYear();
}

var returnUserDate = function(){
	return this.userDate();
}

var eventLength = function(){
	return this.eventList().length;	
}

//Changes CSS style if date not in current month
var cssNotCurrentMonth = function(num){
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").style.backgroundColor = "gray";
}

//Changes CSS style if date is selected
var cssSelectedDate = function(num){
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").style.outlineColor = "red";
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").style.outlineWidth = "2px";
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").style.outlineStyle = "solid";
}

//Changes CSS style if date is an event day
var cssEvents = function(num){
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").innerHTML = dateSelection + '<span id = "eventDot'+selectIndex+'">&#149;</span>';
	selectIndex+=1;
}

//Removes event dot
var cssDefault = function(num){
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").innerHTML = dateSelection;
}

//Removes CSS changes
var cssRemove = function(num){
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").style.outlineColor = "white";
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").style.outlineWidth = "0px";
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").style.outlineStyle = "solid";
}

//Changes colors of event dots
var colorChanger = function(){
	for (var i=0; i < userIndexes().length; i++){
		if ((userIndexes()[i]) == currentTimeIndex){
			document.getElementById("eventDot"+i).style.color = userColorArray()[i];
		}
	}
}

//Creates array of prepended and postpended days for style change
var createCSSChangeArray = function(){
	for (var i=0; i < dateList.length; i++){
		if (dateList[i] > 14 && dateList.indexOf(dateList[i]) < 14) {
			pre_post_Dates.push(dateList.indexOf(dateList[i]));
		}
	}
	for (var i=0; i < dateList.length; i++){
		if (dateList[i] < 20 && dateList.lastIndexOf(dateList[i]) > 30){
			pre_post_Dates.push(dateList.lastIndexOf(dateList[i]));
		}
	}
	for (var i=0; i < pre_post_Dates.length; i++){
		pre_post_Dates[i] = (pre_post_Dates[i]+1);
	}
}

//Changes current month text 
var changeMonthText = function(){
	currentMonth = months[currentMonthIndex];
	document.getElementById("current").innerHTML = 
	"&nbsp;&nbsp;"
	+ currentMonth
	+ "&nbsp;&nbsp;"
	+ currentYear
}

//Populates array of dates
var populateDays = function(){
	for (var i=0; i < between.length; i++){
		dateList.push(between[i].getDate());
	}
	dateList.reverse();
	dateList.shift();		
	this.dates.removeAll();
	for (var i=0; i < 49; i++){
		this.dates.push(dateList[i]);
	}
}

//Converts raw dates to date indexes
var cssSelection = function(changeThis){
	dateSelection = dateList.find(findDate);				
	function findDate(element) {
		return element == changeThis;
	}
	if (dateSelection > 18){
		cssEvents((dateList.lastIndexOf(dateSelection))+1);
	}
	if (dateSelection <= 18){
		cssEvents((dateList.indexOf(dateSelection))+1);
	} 
}

//Iterates over date array for conversion into cssSelection
var dateArrayConverter = function(){
	selectIndex = 0;
	for (var i=0; i < userIndexes().length; i++){
		if ((userIndexes()[i]) == currentTimeIndex){
			cssSelection(userDateArray()[i]);
		}
	}
}

//Converts observables to numbers instead of strings
ko.extenders.number = function(observable, opt) {
   return ko.computed({
       read: observable,
       write: function(value) {
           if(typeof value !== "number") {
               value = parseFloat(value);
           }           
           
           if(!isNaN(value)) {
               observable(value);
           }           
       }
   });
}

//VIEWMODEL

var ViewModel = function() {

	//VIEWMODEL FUNCTIONS
	
	this.userYear = ko.observable().extend({ number: true });
	this.userMonth = ko.observable().extend({ number: true });
	this.userDate = ko.observable().extend({ number: true });
	this.userColor = ko.observable();
	
	//Array of visible user converted dates
	this.eventList = ko.observableArray();
	
	//Array of user date numbers
	this.userDateArray = ko.observableArray();
	
	//Array of user month indexes
	this.userIndexes = ko.observableArray();
	
	//Array of user colors
	this.userColorArray = ko.observableArray();
	
	//Year index (January 2017 = 24204)
	this.yearIndex = ko.computed(function() {
        return ((((this.userYear()*12))));
    }, this);
	
	//Month index (0-11)
	this.monthIndex = ko.computed(function() {
        return ((((this.userMonth()))));
    }, this);
	
	//Year index & month index combined
	this.userTimeIndex = ko.computed(function() {
        return ((this.yearIndex())+(this.monthIndex()));
    }, this);

	this.prevDates = ko.observableArray();	
	
	//Loads user selected date for view or event add
	this.loadUserDate = function(){
		this.userTimeChange = ko.computed(function() {
			return (currentTimeIndex-(this.userTimeIndex()));
		}, this);

		if (userTimeIndex() != currentTimeIndex){
			if (userTimeChange() > 0){
				for (var i=0; i < Math.abs(userTimeChange()); i++){
					document.getElementById('past').click();
				}
			}
			if (userTimeChange() < 0){
				for (var i=0; i < Math.abs(userTimeChange()); i++){
					document.getElementById('future').click();
				}
			}
		}
		
		//Converts raw dates to date indexes
		dateSelection = dateList.find(findDate);	
		function findDate(element) {
			return element == userDate();
		}
		if (prevDates().length > 0){
			cssRemove(prevDates.pop());
		}
		if (dateSelection > 18){
			cssSelectedDate((dateList.lastIndexOf(dateSelection))+1);
			prevDates.push((dateList.lastIndexOf(dateSelection))+1);
		}
		if (dateSelection <= 18){
			cssSelectedDate((dateList.indexOf(dateSelection))+1);
			prevDates.push((dateList.indexOf(dateSelection))+1);
		}
	}

	//Add Event button on click
	this.addEvent = function(){
		
		//User date input converted to string for event list
		var search = ' ' + (userMonth()+1).toString() + '/' + userDate().toString() + '/' + userYear().toString();
		
		//Number of times user event added on same day
		var eventOccurences = eventList().filter(function(val){
			return val === search;
		}).length;
	
		if (eventOccurences < 2){
		
			//Adds user selected date to associated arrays
			eventList.push(' ' + (userMonth()+1).toString() + '/' + userDate().toString() + '/' + userYear().toString());
			userDateArray.push(userDate());
			userColorArray.push(userColor());
			userIndexes.push(userTimeIndex());
			
			//If user selected date is in current month, display
			if (userTimeIndex() == currentTimeIndex){
				cssSelection(userDate());	
			}
			colorChanger();
		
			//Changes event list item color
			var ul = document.getElementById("eventList");
			var items = ul.getElementsByTagName("li");
			for (var i = 0; i < items.length; i++) {
				items[i].style.color = userColorArray()[i];
			}
		}
	
		if (eventOccurences == 2){
			alert('Can not add more than two events on the same day.');
		}
	
	}
	
	//Remove Event button on click
	this.removeEvent = function(){
		
		//Removes user selected date from associated arrays
		eventList.remove(' ' + (userMonth()+1).toString() + '/' + userDate().toString() + '/' + userYear().toString());
		userDateArray.splice((userIndexes().indexOf(userTimeIndex())),1);
		userColorArray.splice((userIndexes().indexOf(userTimeIndex())),1);
		userIndexes.remove(userTimeIndex());

		dateArrayConverter();
		 
		if (userTimeIndex() == currentTimeIndex){
			cssSelection(userDate());	
		}
		colorChanger();	
	}
	
	//Changes current date array
	var setNewDate = function(){
		monthEnd = new Date(2017,2,(startingDate1));
		monthStart = new Date(2017,0,(startingDate2));
		between = [monthEnd];

		while(monthStart <= monthEnd) {
			var day = monthEnd.getDate()
			monthEnd = new Date(monthEnd.setDate(--day));  
			between.push(monthEnd);
		}
	}
	
	//Applies cssNotCurrentMonth function to pre/postpend array
	var applyCSSToPrePost = function(){	
		for (var i=0; i < pre_post_Dates.length; i++){
			cssNotCurrentMonth(pre_post_Dates[i]);
		}
	}		

	//SET INITIAL OBSERVABLE CALENDAR VALUES

	var month = 1;
	var year = 2017;

	var startingDate1 = 19;
	var startingDate2 = 30;
	
	setNewDate();

	dateList = [];

	//Sets initial calendar array
	for (var i=0; i < between.length; i++){
		dateList.push(between[i].getDate());
	}
	
	dateList.reverse();
	dateList.shift();

	createCSSChangeArray();
	
	//Top row of calendar
	this.daysoftheweek = ko.observableArray(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
	
	//Bottom 7 rows of calendar
	this.dates = ko.observableArray(dateList);
	
	//GO FORWARD IN TIME
	
	//Shifts days forward on click
	this.shiftDays = function() {
		
		//INITIALIZE NEXT MONTH		
		
		//Increment values
		//After December, loop back to January
		currentMonthIndex+=1;
		currentTimeIndex +=1;
		if (currentMonthIndex == 12){
			currentMonthIndex = 0;
			currentYear += 1;
		}

		changeMonthText();
		
		//After Decemeber, increment year +1
		month+=1;
		if (month == 12) {
			month = 0;
			year +=1;
		}

		//Go forward 4 weeks
		startingDate1 += 28;
		startingDate2 += 28;
		
		//If 1st of month is after 6th index, shift forward one week
		if (dates().indexOf(1) > 6){
			startingDate1 +=7;
			startingDate2 +=7;	
		}
		
		setNewDate();

		//POPULATE NEXT MONTH
		
		dateList = [];
		populateDays();
		
		//APPLY STYLE TO POST/PRE DATES
		
		pre_post_Dates = [];
		createCSSChangeArray();	
		applyCSSToPrePost();
				
		dateArrayConverter();
		colorChanger();
	};
		
	//GO BACKWARDS IN TIME
	
	//Shifts days backwards on click
	this.shiftDaysBack = function() {
		
		//INITIALIZE PREVIOUS MONTH
		
		//Decrement values
		//After January, loop back to December
		currentMonthIndex-=1;
		currentTimeIndex -=1;
		if (currentMonthIndex == -1){
			currentMonthIndex = 11;
			currentYear -= 1;
		}
	
		changeMonthText();
		
		//After January, decrement year -1
		month-=1;
		if (month == -1) {
			month = 11;
			year -=1;
		}
		
		//Go backward 4 weeks
		startingDate1 -= 28;
		startingDate2 -= 28;
		
		//If 1st of month is before 7th index, shift backward one week		
		if (dates().indexOf(1) < 7){
			startingDate1 -=7;
			startingDate2 -=7;	
		}
				
		setNewDate();
	
		//POPULATE PREVIOUS MONTH

		dateList = [];
		populateDays();
		
		//APPLY STYLE TO POST/PRE DATES
		
		pre_post_Dates = [];
		createCSSChangeArray();	
		applyCSSToPrePost();

		dateArrayConverter();
		colorChanger();
	};	
};

ko.applyBindings(ViewModel);
