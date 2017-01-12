var months = ['January 2017', 'February 2017', 'March 2017', 'April 2017', 'May 2017', 'June 2017', 'July 2017', 'August 2017',
'September 2017', 'October 2017', 'November 2017', 'December 2017']
var currentIndex = 0;
var currentMonth = months[currentIndex];

var cssChanger = function(num){
	document.querySelector("ul:nth-child(3) > li:nth-child("+num+")").style.backgroundColor = "gray";
}

	//get days from month
	function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}
//raw output of days   
var themonth = [];
var month = 0;

//filtered output of days
var themonth2 = [];

//raw output of days
themonth = getDaysInMonth(month, 2017);
alert(themonth);


//filters output of days
for (var i=0; i < themonth.length; i++){
  themonth2.push(themonth[i].getDate());
}
alert(themonth2);

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

var ViewModel = function() {
		
    this.dates = ko.observableArray(themonth2);
	this.days = ko.observableArray(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
	this.shiftDays = function() {
		if (currentIndex == 1) {
			this.dates.unshift(29,30,31);
			this.dates.splice(31,32);
			this.dates.push(1,2,3,4);
			var February = this.dates.slice(0);
			cssChanger(1);
			cssChanger(2);
			cssChanger(3);
			cssChanger(32);
			cssChanger(33);
			cssChanger(34);
			cssChanger(35);	
		}
	
		if (currentIndex == 2) {
			this.dates.splice(0,3,26,27,28);
			this.dates.splice(31,4,29,30,31,1);
			var March = this.dates.slice(0);
			cssChanger(1);
			cssChanger(2);
			cssChanger(3);
		}
		
		if (currentIndex == 3) {
			this.dates.splice(3,0,29,30,31);
			this.dates.push(1,2,3,4);
			this.dates.splice(36,6,1,2,3,4,5,6);
			var April = this.dates.slice(0);
			cssChanger(1);
			cssChanger(2);
			cssChanger(3);
			cssChanger(4);
			cssChanger(5);
			cssChanger(6);
			cssChanger(38);
			cssChanger(39);
			cssChanger(40);
			cssChanger(41);
			cssChanger(42);
		}
		if (currentIndex == 4) {
			this.dates.splice(0,6,30);
			this.dates.splice(31,6,31,1,2,3);
			var May = this.dates.slice(0);
		}
		if (currentIndex == 5) {
			this.dates.unshift(28,29);
			this.dates.splice(3,0,31);
			this.dates.splice(34,4,1);
			var June = this.dates.slice(0);
			cssChanger(1);
			cssChanger(2);
			cssChanger(4);
		}
		if (currentIndex == 6) {
			this.dates.splice(3,1);
			this.dates.unshift(25,26,27);
			this.dates.pop();
			this.dates.splice(37,6,31,1,2,3,4,5);
			var July = this.dates.slice(0);
			cssChanger(1);
			cssChanger(2);
			cssChanger(3);
			cssChanger(38);
			cssChanger(39);
			cssChanger(40);
			cssChanger(41);
			cssChanger(42);
		}
		if (currentIndex == 7) {
			this.dates.splice(0,6,30,31);
			this.dates.splice(35,3);
			var August = this.dates.slice(0);
			cssChanger(2);
		}
		if (currentIndex == 8) {
			this.dates.unshift(27,28,29);
			this.dates.splice(35,3);
			var September = this.dates.slice(0);
			cssChanger(1);
			cssChanger(2);
			cssChanger(3);			
		}
		if (currentIndex == 9) {
			this.dates.splice(0,5);
			this.dates.splice(35,5,31,1,2,3,4);
			var October = this.dates.slice(0);
			cssChanger(32);
			cssChanger(33);
			cssChanger(34);
			cssChanger(35);
		}
		if (currentIndex == 10) {
			this.dates.unshift(29,30,31);
			this.dates.splice(33,5,1,2);
			var November = this.dates.slice(0);
			cssChanger(1);
			cssChanger(2);
			cssChanger(3);
		}
		if (currentIndex == 11) {
			this.dates.splice(2,1);
			this.dates.unshift(26,27,28);
			this.dates.splice(35,7,31,1,2,3,4,5,6);
			var December = this.dates.slice(0);
			cssChanger(1);
			cssChanger(2);
			cssChanger(3);
			cssChanger(39);
			cssChanger(40);
			cssChanger(41);
			cssChanger(42);
		}
		if (currentIndex == 0) {
			this.dates.splice(0,5);
			this.dates.splice(35,2);
			var January = this.dates.slice(0);
		}
		
    };
};

ko.applyBindings(ViewModel);







