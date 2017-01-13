var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
'September', 'October', 'November', 'December']
var currentIndex = 0;
var currentMonth = months[currentIndex];
var currentYear = 2017;

var cssChanger = function(num){
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").style.backgroundColor = "gray";
}

document.getElementById('future').addEventListener("click", function(){
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
});




var ViewModel = function() {
	
	
//get days from month

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
this.month = 0;
this.year = 2017;

//filtered output of days
this.themonth2 = [];


this.themonth = getDaysInMonth(month, 2017);

for (var i=0; i < themonth.length; i++){
	themonth2.push(themonth[i].getDate());
}

currMonth = themonth2.slice(0);
alert(currMonth); //1-31

var nextMonth = [];
this.themonth = getDaysInMonth(month + 1, 2017);

for (var i=0; i < themonth.length; i++){
	nextMonth.push(themonth[i].getDate());
}
alert(nextMonth); //1-28

var nextslice = nextMonth.slice(0,(42-themonth2.length));
alert(nextslice); //1-11
alert(nextslice.length); //11
alert(currMonth.length); //31

for (var i=0; i < nextslice.length; i++){
			themonth2.push(nextslice[i]);
		}
alert(themonth2); //1-31 + 1-11

var findtheindex = themonth2.lastIndexOf(1);
alert(findtheindex); //31

var previousSlice = themonth2.splice((findtheindex-(findtheindex-28)),(findtheindex-28));
alert(previousSlice);




		
    this.dates1 = ko.observableArray(themonth2);
	this.days1 = ko.observableArray(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
	this.shiftDays = function() {
		month+=1;
		if (month == 12) {
			month = 0;
			year +=1;
		}
		
		this.themonth = getDaysInMonth(month, year);
		this.dates1.removeAll();
		for (var i=0; i < themonth.length; i++){
			themonth2.push(themonth[i].getDate());
		}

		this.dates1.push(themonth2);
		
		
		this.dates1.pop();
		
	};
			
};






ko.applyBindings(ViewModel);







