var allTags = document.querySelectorAll('.week td');;
	var i;
	for (i = 0; i < allTags.length; i++) {
		if (i <= 30) {
			allTags[i].innerHTML = i+1
		}
		if (i > 30) {
			allTags[i].innerHTML = i-30
			allTags[i].style.color = "grey";
		}
	}
	
self.dates.reverse();

self.fullName = function(num) {
		return num*3;
    };
	self.fullStuff = function() {
		self.dates().map(self.fullName);
	}