var months = ['January 2017', 'February 2017', 'March 2017', 'April 2017', 'May 2017', 'June 2017', 'July 2017', 'August 2017',
'September 2017', 'October 2017', 'November 2017', 'December 2017']
var currentIndex = 0;
var previousIndex = 0;
var forward;
var currentMonth = months[currentIndex];
var dayslist = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,
	16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	
function range(start, count) {
      return Array.apply(0, Array(count))
        .map(function (element, index) { 
          return index + start;  
      });
}

var January = range(1,31);
var February = range(1,28);
	
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
	forward = true;
	alert(forward);
});

document.getElementById('past').addEventListener("click", function(){
	if (currentIndex == 0){
		currentIndex = 12;
	}
	previousIndex = currentIndex;
	currentIndex-=1;
	currentMonth = months[currentIndex];
	document.getElementById("current").innerHTML = 
	"&nbsp;&nbsp;"
	+ currentMonth
	+ "&nbsp;&nbsp;"
	forward = false;
	alert(forward);
	
});

var rotate = function (arr, n) {
  var L = arr.length;
  return arr.slice(L - n).concat(arr.slice(0, L - n));
};


	
var ViewModel = function() {
    this.dates = ko.observableArray(January);
	this.days = ko.observableArray(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
	this.shiftDays = function() {
		if (currentIndex == 1 && forward == true) {
			this.dates.unshift(29,30,31);
			this.dates.splice(31,32);
			this.dates.push(1,2,3,4);
		}
		
		if (currentIndex == 2 && forward == true) {
			this.dates.splice(0,3,26,27,28);
			this.dates.splice(31,4,29,30,31,1);
		}
		
		if (currentIndex == 3 && forward == true) {
			this.dates.splice(3,0,29,30,31);
			this.dates.push(1,2,3,4);
			this.dates.splice(36,6,1,2,3,4,5,6);
		}
		if (currentIndex == 4) {
			this.dates.splice(0,6,30);
			this.dates.splice(31,6,31,1,2,3);
		}
		if (currentIndex == 5) {
			this.dates.unshift(28,29);
			this.dates.splice(3,0,31);
			this.dates.splice(34,4,1);
		}
		if (currentIndex == 6) {
			this.dates.splice(3,1);
			this.dates.unshift(25,26,27);
			this.dates.pop();
			this.dates.splice(37,6,31,1,2,3,4,5);
		}
		if (currentIndex == 7) {
			this.dates.splice(0,6,30,31);
			this.dates.splice(35,3);
		}
		if (currentIndex == 8) {
			this.dates.unshift(27,28,29);
			this.dates.splice(35,3);	
		}
		if (currentIndex == 9) {
			this.dates.splice(0,5);
			this.dates.splice(35,5,31,1,2,3,4)
		}
		if (currentIndex == 10) {
			this.dates.unshift(29,30,31);
			this.dates.splice(33,5,1,2);
		}
		if (currentIndex == 11) {
			this.dates.splice(2,1);
			this.dates.unshift(26,27,28);
			this.dates.splice(35,7,31,1,2,3,4,5,6);
		}
		if (currentIndex == 0) {
			this.dates.splice(0,5);
			this.dates.splice(35,2);
		}	
    };
	this.shiftDays2 = function() {
		if (currentIndex == 1) {
			this.dates.unshift(29,30,31);
			this.dates.splice(31,32);
			this.dates.push(1,2,3,4);
			February = this.dates.slice(0);
		}		
    };
};

ko.applyBindings(new ViewModel());





