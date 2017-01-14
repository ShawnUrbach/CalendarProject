var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
'September', 'October', 'November', 'December']
var currentIndex = 1;
var currentMonth = months[currentIndex];
var currentYear = 2017;

var cssChanger = function(num){
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").style.backgroundColor = "gray";
}


var ViewModel = function() {
	
//------------------------------------------------------------SETUP
//get days from month date object;
this.getDaysInMonth = function(month, year) {
	var date = new Date(year, month, 1);
	var days = [];
	while (date.getMonth() === month) {
		days.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
    return days;
};

//raw output of days   
this.themonth = [];
this.month = 1;
this.year = 2017;


//----------------------------------------------------STARTMONTH

var startingDate1 = 19;
var startingDate2 = 30;

var date1 = new Date(2017,2,(startingDate1));
var date2 = new Date(2017,0,(startingDate2));
var day;
var between = [date1];

while(date2 <= date1) {
    day = date1.getDate()
    date1 = new Date(date1.setDate(--day));  
    between.push(date1);
}

var DateList = [];

for (var i=0; i < between.length; i++){
	DateList.push(between[i].getDate());
}
DateList.reverse();
DateList.shift();




//--------------------------------------------------------------------------------



	
    this.dates1 = ko.observableArray(DateList);
	this.days1 = ko.observableArray(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
	
	this.shiftDays = function() {
		
	currentIndex+=1;
	if (currentIndex == 12){
		currentIndex = 0;
		currentYear +=1;
	}
	currentMonth = months[currentIndex];
	document.getElementById("current").innerHTML = 
	"&nbsp;&nbsp;"
	+ currentMonth
	+ "&nbsp;&nbsp;"
	+ currentYear
	
		month+=1;
		if (month == 12) {
			month = 0;
			year +=1;
		}
		

		
//-----------------------------------------------------------CLEANUP		
			
		startingDate1 += 28;
		startingDate2 += 28;
		
		if (dates1().indexOf(1) > 5){
			startingDate1 +=7;
			startingDate2 +=7;	
		}
		
		var date1 = new Date(2017,2,(startingDate1));
var date2 = new Date(2017,0,(startingDate2));
var day;
var between = [date1];

while(date2 <= date1) {
    day = date1.getDate()
    date1 = new Date(date1.setDate(--day));  
    between.push(date1);
}

var DateList = [];

for (var i=0; i < between.length; i++){
	DateList.push(between[i].getDate());
}
DateList.reverse();
DateList.shift();
		
		
	
		
	this.dates1.removeAll();
		
		for (var i=0; i < 49; i++){
			this.dates1.push(DateList[i]);
		}
		
		
	};
	

//----------------------------------------------------------GO BACKWARDS
	this.shiftDaysBack = function() {
		currentIndex-=1;
	if (currentIndex == -1){
		currentIndex = 11;
		currentYear -=1;
	}
	currentMonth = months[currentIndex];
	document.getElementById("current").innerHTML = 
	"&nbsp;&nbsp;"
	+ currentMonth
	+ "&nbsp;&nbsp;"
	+ currentYear
	
		month-=1;
		if (month == -1) {
			month = 11;
			year -=1;
		}
		
//-----------------------------------------------------------CLEANUP		
			
		startingDate1 -= 28;
		startingDate2 -= 28;
		
		if (dates1().indexOf(1) < 7){
			startingDate1 -=7;
			startingDate2 -=7;	
		}
		
		var date1 = new Date(2017,2,(startingDate1));
var date2 = new Date(2017,0,(startingDate2));
var day;
var between = [date1];

while(date2 <= date1) {
    day = date1.getDate()
    date1 = new Date(date1.setDate(--day));  
    between.push(date1);
}

var DateList = [];

for (var i=0; i < between.length; i++){
	DateList.push(between[i].getDate());
}
DateList.reverse();
DateList.shift();
		
		
	
		
	this.dates1.removeAll();
		
		for (var i=0; i < 49; i++){
			this.dates1.push(DateList[i]);
		}
		
		
	};
	
	
	
	
};

ko.applyBindings(ViewModel);








document.getElementById('future').addEventListener("click", function(){
});







