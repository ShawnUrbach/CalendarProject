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


var currFiltered = ko.observableArray([29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
16,17,18,19,20,21,22,23,24,25,26,27,28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]);


console.log(currFiltered());





	
    this.dates1 = ko.observableArray(currFiltered());
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
		
		
//--------------------------------------------------CURRENTMONTH(RAW)
var currMonth = [];
this.themonth = getDaysInMonth(month, year);

for (var i=0; i < themonth.length; i++){
	currMonth.push(themonth[i].getDate());
}
console.log(currMonth); //1-28


//-------------------------------------------------PREVIOUSMONTH(RAW)
var previousMonth = [];
this.themonth = getDaysInMonth(month-1, year);

for (var i=0; i < themonth.length; i++){
	previousMonth.push(themonth[i].getDate());
}
console.log(previousMonth); //1-31


//-----------------------------------------------------NEXTMONTH(RAW)
var nextMonth = [];
this.themonth = getDaysInMonth(month, year);

for (var i=0; i < themonth.length; i++){
	nextMonth.push(themonth[i].getDate());
}
console.log(nextMonth); //1-31

//----------------------------------------------------FIND PREVIOUSMONTHSLICE

var findtheindex = currFiltered().lastIndexOf(1);
console.log(findtheindex); //31

var previousMonthCopy = currFiltered().slice(0);
var previousSlice = previousMonthCopy.splice((findtheindex-(findtheindex-28)),(findtheindex-28));
console.log(previousSlice); //26-28


//------------------------------------------------------------NEXTMONTH(FILTERED)
var nextMonthFiltered = previousSlice.concat(nextMonth);
console.log(nextMonthFiltered); //26-28 + 1-31


//--------------------------------------------------------------FIND NEXTMONTHSLICE
var listnums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
var nextslice = listnums.slice(0,(49-nextMonthFiltered.length));
console.log(nextslice); //1-8


//------------------------------------------------------------NEXTMONTH(FILTERED)
nextMonthFiltered = nextMonthFiltered.concat(nextslice);
console.log(nextMonthFiltered); //26-28 + 1-31 + 1-8

var nextcurrFiltered = nextMonthFiltered.slice(0);

		
		
		
		
		
		
		
		
		
		
		
		
		this.dates1.removeAll();
		
		for (var i=0; i < 49; i++){
			this.dates1.push(nextMonthFiltered[i]);
		}
		
		currFiltered = ko.observableArray(nextMonthFiltered);
		
		
	};
			
};


ko.applyBindings(ViewModel);

document.getElementById('future').addEventListener("click", function(){
});







