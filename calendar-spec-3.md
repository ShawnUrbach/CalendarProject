# Front End Code Challenge (phase 3)

### The Goal:
Now lets add some colored task to your calendar. In this phase we will add the ability to add multiple task/events and show them on your calendar. All we will do here is have a simple list of "events" that have a date and a color (can even just be a hex string if you want) associated with them. These events then need to show up on your calendar when the month containing them is in view. 

This list should use a date input like pase 2 to add a new event and associated color to the list. Again, the color can be as simple as a input that takes in a hex value. No need to add a color picker or other component unless you want to show off, which is also totally cool. 

The event list is global and should show the events for months that are out of view even though those events will not be visible on the calendar. 

### The Requirements:
- Be able to add "events" consisting of dates and colors to the event list
- Be able to show events on the calendar as appropriately colored dots within days. (Multiple events could reside on a single day but don't stress about making the dots look great inside the day. The code should be able to technically handle as many days as its feed on a day but stylistically only worry about 2)