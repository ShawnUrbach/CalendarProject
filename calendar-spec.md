# Front End Code Challenge (phase 1)

### The Goal: 
A simple, pageable calendar from written from scratch, sitting on top of Knockout.JS

### The Requirements:
- Display 1 month at a time
- Be able to page through months
- Display the month and year currently being viewed
- Show the days of the month in a grid of 7 column rows (M, Tu, W, Th, F, Sa, Su)
- Indicate day of the week column headers
- Prepend any days from the previous month to account for empty days of the week leading up to the starting day of the viewing month in the calendars first row. 

   **Ex:** June 1st 2016 is a Wednesday, thus when viewing June 2016, the first row should show Mon. 30th, and Tue. 31st of May 2016

- Needs to append any days from the next month to make sure the last row of the calendar is filled out completely. 

   **Ex:** June 30th 2016 ends on a Thursday, thus to fill out the rest of the row for that month's calendar view, we want to show Friday the 1st, Saturday the 2nd and Sunday the 3rd of July 2016.

- Any filler days displayed in the calendar that aren't of the month being viewed need to be grayed out (see above two requirements as the source of filler days)

- No libraries, plugins or others snippets can be used to aide this process other than the standard JS date library. 

### Assessment Criteria

We will be judging all solutions on the elegance and sophistication of the code involved, proper tuilization of Knockout.js, completion of all specified requirements and consideration of permutations surrounding working with date data. Lack of visual aesthetics will NOT be scored against your solution as this is not explicitly a trial for designers. 

Markup of solution needs to be written in HTML/CSS (or any derivative technology) and display clean, strong, concise patterns. 

The code behind the UI can be JS or CoffeeScript.

Solutions should run in Chrome. Cross browser compatibility is not being judged nor is responsive adherence. 