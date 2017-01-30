var ViewModel, between, changeMonthText, colorChanger, createCSSChangeArray, cssDefault, cssEvents, cssNotCurrentMonth, cssRemove, cssSelectedDate, cssSelection, 
currentMonth, currentMonthIndex, currentTimeIndex, currentYear, d, dateArrayConverter, dateList, dateSelection, eventLength, loadJanuary2017, loadNextMonth, m, 
monthEnd, monthStart, months, populateDays, pre_post_Dates, returnUserDate, returnUserYear, selectIndex, y, z;

//INITIALIZE CURRENT MONTH
d = new Date;
m = d.getMonth();
y = d.getFullYear();
z = y * 12 + m + 1 - 24205;

loadJanuary2017 = function() {
  document.getElementById('past').click();
};

loadNextMonth = function() {
  var i;
  i = 0;
  while (i < z) {
    document.getElementById('future').click();
    i++;
  }
};

window.onload = loadJanuary2017();

//VARIABLE DECLARATIONS
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
currentMonthIndex = 1;
currentYear = 2017;
currentTimeIndex = 24205;
currentMonth = months[currentMonthIndex];
dateList = [];
pre_post_Dates = [];
selectIndex = 0;

//FUNCTIONS
returnUserYear = function() {
  return this.userYear();
};

returnUserDate = function() {
  return this.userDate();
};

eventLength = function() {
  return this.eventList().length;
};

//Changes CSS style if date not in current month
cssNotCurrentMonth = function(num) {
  document.querySelector('ul:nth-child(3) > li:nth-child(' + num + ')').style.backgroundColor = 'gray';
};

//Changes CSS style if date is selected
cssSelectedDate = function(num) {
  document.querySelector('ul:nth-child(3) > li:nth-child(' + num + ')').style.outlineColor = 'red';
  document.querySelector('ul:nth-child(3) > li:nth-child(' + num + ')').style.outlineWidth = '2px';
  document.querySelector('ul:nth-child(3) > li:nth-child(' + num + ')').style.outlineStyle = 'solid';
};

//Changes CSS style if date is an event day
cssEvents = function(num) {
  document.querySelector('ul:nth-child(3) > li:nth-child(' + num + ')').innerHTML = dateSelection + '<span id = "eventDot' + selectIndex + '">&#149;</span>';
  selectIndex += 1;
};

//Removes event dot
cssDefault = function(num) {
  document.querySelector('ul:nth-child(3) > li:nth-child(' + num + ')').innerHTML = dateSelection;
};

//Removes CSS changes
cssRemove = function(num) {
  document.querySelector('ul:nth-child(3) > li:nth-child(' + num + ')').style.outlineColor = 'white';
  document.querySelector('ul:nth-child(3) > li:nth-child(' + num + ')').style.outlineWidth = '0px';
  document.querySelector('ul:nth-child(3) > li:nth-child(' + num + ')').style.outlineStyle = 'solid';
};

//Changes colors of event dots
colorChanger = function() {
  var i;
  i = 0;
  while (i < userIndexes().length) {
    if (userIndexes()[i] === currentTimeIndex) {
      document.getElementById('eventDot' + i).style.color = userColorArray()[i];
    }
    i++;
  }
};

//Creates array of prepended and postpended days for style change
createCSSChangeArray = function() {
  var i;
  var i;
  var i;
  
  i = 0;
  while (i < dateList.length) {
    if (dateList[i] > 14 && dateList.indexOf(dateList[i]) < 14) {
      pre_post_Dates.push(dateList.indexOf(dateList[i]));
    }
    i++;
  }
  
  i = 0;
  while (i < dateList.length) {
    if (dateList[i] < 20 && dateList.lastIndexOf(dateList[i]) > 30) {
      pre_post_Dates.push(dateList.lastIndexOf(dateList[i]));
    }
    i++;
  }
  
  i = 0;
  while (i < pre_post_Dates.length) {
    pre_post_Dates[i] = pre_post_Dates[i] + 1;
    i++;
  }
};

//Changes current month text 
changeMonthText = function() {
  currentMonth = months[currentMonthIndex];
  document.getElementById('current').innerHTML = '&nbsp;&nbsp;' + currentMonth + '&nbsp;&nbsp;' + currentYear;
};

//Populates array of dates
populateDays = function() {
  var i;
  var i;
  
  i = 0;
  while (i < between.length) {
    dateList.push(between[i].getDate());
    i++;
  }
  dateList.reverse();
  dateList.shift();
  this.dates.removeAll();
  
  i = 0;
  while (i < 49) {
    this.dates.push(dateList[i]);
    i++;
  }
};

//Converts raw dates to date indexes
cssSelection = function(changeThis) {
  var findDate;
  findDate = function(element) {
    return element === changeThis;
  };
  dateSelection = dateList.find(findDate);
  if (dateSelection > 18) {
    cssEvents(dateList.lastIndexOf(dateSelection) + 1);
  }
  if (dateSelection <= 18) {
    cssEvents(dateList.indexOf(dateSelection) + 1);
  }
};

//Iterates over date array for conversion into cssSelection
dateArrayConverter = function() {
  var i;
  selectIndex = 0;
  
  i = 0;
  while (i < userIndexes().length) {
    if (userIndexes()[i] === currentTimeIndex) {
      cssSelection(userDateArray()[i]);
    }
    i++;
  }
};

//Converts observables to numbers instead of strings
ko.extenders.number = function(observable, opt) {
  return ko.computed({
    read: observable,
    write: function(value) {
      if (typeof value !== 'number') {
        value = parseFloat(value);
      }
      if (!isNaN(value)) {
        observable(value);
      }
    }
  });
};

//VIEWMODEL
ViewModel = function() {

  //VIEWMODEL FUNCTIONS
  var applyCSSToPrePost, i, month, setNewDate, startingDate1, startingDate2, year;
  this.userYear = ko.observable().extend({
    number: true
  });
  this.userMonth = ko.observable().extend({
    number: true
  });
  this.userDate = ko.observable().extend({
    number: true
  }); 
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
  this.yearIndex = ko.computed((function() {
    return this.userYear() * 12;
  }), this);
  
  //Month index (0-11)
  this.monthIndex = ko.computed((function() {
    return this.userMonth();
  }), this);
  
  //Year index & month index combined
  this.userTimeIndex = ko.computed((function() {
    return this.yearIndex() + this.monthIndex();
  }), this);
  
  this.prevDates = ko.observableArray();
  
  //Loads user selected date for view or event add
  this.loadUserDate = function() {
    var i;
    var findDate, i;
	
    findDate = function(element) {
      return element === userDate();
    };
	
    this.userTimeChange = ko.computed((function() {
      return currentTimeIndex - this.userTimeIndex();
    }), this);
	
    if (userTimeIndex() !== currentTimeIndex) {
      if (userTimeChange() > 0) {
        i = 0;
        while (i < Math.abs(userTimeChange())) {
          document.getElementById('past').click();
          i++;
        }
      }
      if (userTimeChange() < 0) {
        i = 0;
        while (i < Math.abs(userTimeChange())) {
          document.getElementById('future').click();
          i++;
        }
      }
    }
	
	//Converts raw dates to date indexes
    dateSelection = dateList.find(findDate);
    if (prevDates().length > 0) {
      cssRemove(prevDates.pop());
    }
    if (dateSelection > 18) {
      cssSelectedDate(dateList.lastIndexOf(dateSelection) + 1);
      prevDates.push(dateList.lastIndexOf(dateSelection) + 1);
    }
    if (dateSelection <= 18) {
      cssSelectedDate(dateList.indexOf(dateSelection) + 1);
      prevDates.push(dateList.indexOf(dateSelection) + 1);
    }
  };
  
  //Add Event button on click
  this.addEvent = function() {
    var eventOccurences, i, items, search, ul;
	
	//User date input converted to string for event list
    search = ' ' + (userMonth() + 1).toString() + '/' + userDate().toString() + '/' + userYear().toString();
	
	//Number of times user event added on same day
    eventOccurences = eventList().filter(function(val) {
      return val === search;
    }).length;
	
    if (eventOccurences < 2) {
	  //Adds user selected date to associated arrays
      eventList.push(' ' + (userMonth() + 1).toString() + '/' + userDate().toString() + '/' + userYear().toString());
      userDateArray.push(userDate());
      userColorArray.push(userColor());
      userIndexes.push(userTimeIndex());
	  
	  //If user selected date is in current month, display
      if (userTimeIndex() === currentTimeIndex) {
        cssSelection(userDate());
      }
      colorChanger();
	  
	  //Changes event list item color
      ul = document.getElementById('eventList');
      items = ul.getElementsByTagName('li');
	  
      i = 0;
      while (i < items.length) {
        items[i].style.color = userColorArray()[i];
        i++;
      }
    }
	
    if (eventOccurences === 2) {
      alert('Can not add more than two events on the same day.');
    }
  };
  
  //Remove Event button on click
  this.removeEvent = function() {
	//Removes user selected date from associated arrays
    eventList.remove(' ' + (userMonth() + 1).toString() + '/' + userDate().toString() + '/' + userYear().toString());
    userDateArray.splice(userIndexes().indexOf(userTimeIndex()), 1);
    userColorArray.splice(userIndexes().indexOf(userTimeIndex()), 1);
    userIndexes.remove(userTimeIndex());
    dateArrayConverter();
    if (userTimeIndex() === currentTimeIndex) {
      cssSelection(userDate());
    }
    colorChanger();
  };
  
  //Changes current date array
  setNewDate = function() {
    var day;
    monthEnd = new Date(2017, 2, startingDate1);
    monthStart = new Date(2017, 0, startingDate2);
    between = [monthEnd];
    while (monthStart <= monthEnd) {
      day = monthEnd.getDate();
      monthEnd = new Date(monthEnd.setDate(--day));
      between.push(monthEnd);
    }
  };
  
  //Applies cssNotCurrentMonth function to pre/postpend array
  applyCSSToPrePost = function() {
    var i;
    i = 0;
    while (i < pre_post_Dates.length) {
      cssNotCurrentMonth(pre_post_Dates[i]);
      i++;
    }
  };
  
  //SET INITIAL OBSERVABLE CALENDAR VALUES
  month = 1;
  year = 2017;
  startingDate1 = 19;
  startingDate2 = 30;
  setNewDate();
  dateList = [];
  
  //Sets initial calendar array
  i = 0;
  while (i < between.length) {
    dateList.push(between[i].getDate());
    i++;
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
    currentMonthIndex += 1;
    currentTimeIndex += 1;
    if (currentMonthIndex === 12) {
      currentMonthIndex = 0;
      currentYear += 1;
    }
    changeMonthText();
	
	//After Decemeber, increment year +1
    month += 1;
    if (month === 12) {
      month = 0;
      year += 1;
    }
	
	//Go forward 4 weeks
    startingDate1 += 28;
    startingDate2 += 28;
	
	//If 1st of month is after 6th index, shift forward one week
    if (dates().indexOf(1) > 6) {
      startingDate1 += 7;
      startingDate2 += 7;
    }
    setNewDate();
    dateList = [];
	
	//POPULATE NEXT MONTH
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
    currentMonthIndex -= 1;
    currentTimeIndex -= 1;
    if (currentMonthIndex === -1) {
      currentMonthIndex = 11;
      currentYear -= 1;
    }
    changeMonthText();
	
	//After Decemeber, decrement year -1
    month -= 1;
    if (month === -1) {
      month = 11;
      year -= 1;
    }
	
	//Go backward 4 weeks
    startingDate1 -= 28;
    startingDate2 -= 28;
	
	//If 1st of month is before 7th index, shift backward one week
    if (dates().indexOf(1) < 7) {
      startingDate1 -= 7;
      startingDate2 -= 7;
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

loadNextMonth();
document.getElementById('past').click();
