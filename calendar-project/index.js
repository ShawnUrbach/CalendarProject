var months = ['January 2017', 'February 2017', 'March 2017', 'April 2017', 'May 2017', 'June 2017', 'July 2017', 'August 2017',
'September 2017', 'October 2017', 'November 2017', 'December 2017']
var currentIndex = 0;
var currentMonth = months[currentIndex];

document.getElementById('future').addEventListener("click", function(){
	currentIndex+=1;
	if (currentIndex == 12){
		currentIndex = 0;
	}
	currentMonth = months[currentIndex];
	document.getElementById("current").innerHTML = 
	"&nbsp;&nbsp;"
	+ currentMonth
	+ "&nbsp;&nbsp;";
});

document.getElementById('past').addEventListener("click", function(){
	if (currentIndex == 0){
		currentIndex = 12;
	}
	currentIndex-=1;
	currentMonth = months[currentIndex];
	document.getElementById("current").innerHTML = 
	"&nbsp;&nbsp;"
	+ currentMonth
	+ "&nbsp;&nbsp;"
});

var dayslist = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
	16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4];
var ViewModel = function() {
	var self = this;
    self.dates = ko.observableArray(dayslist);
	self.days = ko.observableArray(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
	self.fullName = function() {
		self.dates.reverse();
    };
};
 
ko.applyBindings(new ViewModel());




