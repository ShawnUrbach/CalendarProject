function loadJanuary(){
	document.getElementById('past').click();
}

window.onload = loadJanuary;

//-----------------------------------------------------------------------------VARIABLE DECLARATIONS

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
'Sep', 'Oct', 'Nov', 'Dec']
var currentIndex = 1;
var currentMonth = months[currentIndex];
var currentYear = 2017;
var DateList = [];
var pre_post_Dates = [];
var date1;
var date2;
var day;
var between;

//------------------------------------------------------------------------------FUNCTIONS

//Selects list item and changes CSS style
var cssChanger = function(num){
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").style.backgroundColor = "gray";
}

//Creates array of prepended and postpended days for style change
var createCSSChangeArray = function(){
	for (var i=0; i < DateList.length; i++){
		if (DateList[i] > 14 && DateList.indexOf(DateList[i]) < 14) {
			pre_post_Dates.push(DateList.indexOf(DateList[i]));
		}
	}
	for (var i=0; i < DateList.length; i++){
		if (DateList[i] < 20 && DateList.lastIndexOf(DateList[i]) > 30){
			pre_post_Dates.push(DateList.lastIndexOf(DateList[i]));
		}
	}
	for (var i=0; i < pre_post_Dates.length; i++){
		pre_post_Dates[i] = (pre_post_Dates[i]+1);
	}
}

//Changes current month text 
var changeMonthText = function(){
	currentMonth = months[currentIndex];
	document.getElementById("current").innerHTML = 
	"&nbsp;&nbsp;"
	+ currentMonth
	+ "&nbsp;&nbsp;"
	+ currentYear	
}

//Populates array of dates
var populateDays = function(){
	for (var i=0; i < between.length; i++){
		DateList.push(between[i].getDate());
	}
	DateList.reverse();
	DateList.shift();		
	this.dates.removeAll();
	for (var i=0; i < 49; i++){
		this.dates.push(DateList[i]);
	}
}

//-------------------------------------------------------------------------------VIEWMODEL

var ViewModel = function() {

	//---------------------------------------------------------------------------VIEWMODEL FUNCTIONS
	
	//Changes current date array
	var setNewDate = function(){
		date1 = new Date(2017,2,(startingDate1));
		date2 = new Date(2017,0,(startingDate2));
		between = [date1];

		while(date2 <= date1) {
			day = date1.getDate()
			date1 = new Date(date1.setDate(--day));  
			between.push(date1);
		}
	}
	
	//Applies cssChanger function to pre/postpend array
	var applyCSSToPrePost = function(){	
		for (var i=0; i < pre_post_Dates.length; i++){
			cssChanger(pre_post_Dates[i]);
		}
	}		

	//----------------------------------------------------SET INITIAL OBSERVABLE CALENDAR VALUES

	var month = 1;
	var year = 2017;

	var startingDate1 = 19;
	var startingDate2 = 30;
	
	setNewDate();

	DateList = [];

	//Sets initial calendar array
	for (var i=0; i < between.length; i++){
		DateList.push(between[i].getDate());
	}
	
	DateList.reverse();
	DateList.shift();

	createCSSChangeArray();
	
	//Top row of calendar
	this.daysoftheweek = ko.observableArray(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
	
	//Bottom 7 rows of calendar
	this.dates = ko.observableArray(DateList);
		
	//-------------------------------------------------------------------------GO FORWARD IN TIME
	
	//Shifts days forward on click
	this.shiftDays = function() {
		
		//---------------------------------------------------------------------INITIALIZE NEXT MONTH		
		
		//Increment values
		//After December, loop back to January
		currentIndex+=1;
		if (currentIndex == 12){
			currentIndex = 0;
			currentYear +=1;
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
		
		//If 1st of month is after 5th index, shift forward one week
		if (dates().indexOf(1) > 5){
			startingDate1 +=7;
			startingDate2 +=7;	
		}
			
		setNewDate();

		//---------------------------------------------------------------------POPULATE NEXT MONTH
		
		DateList = [];
		populateDays();
		
		//-----------------------------------------------------------------APPLY STYLE TO POST/PRE DATES
		
		pre_post_Dates = [];
		createCSSChangeArray();	
		applyCSSToPrePost();			
	};
		
	//---------------------------------------------------------------------GO BACKWARDS IN TIME
	
	//Shifts days backwards on click
	this.shiftDaysBack = function() {
		
		//-----------------------------------------------------------------INITIALIZE PREVIOUS MONTH
		
		//Decrement values
		//After January, loop back to December
		currentIndex-=1;
		if (currentIndex == -1){
			currentIndex = 11;
			currentYear -=1;
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
	
		//----------------------------------------------------------------POPULATE PREVIOUS MONTH

		DateList = [];
		populateDays();
		
		//----------------------------------------------------------------APPLY STYLE TO POST/PRE DATES
		
		pre_post_Dates = [];
		createCSSChangeArray();	
		applyCSSToPrePost();					
	};	
};

ko.applyBindings(ViewModel);




		








