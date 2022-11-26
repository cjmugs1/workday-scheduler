// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


// Global Variables
var schedule = $("#schedule");
var workHours = 8;
var currentTime = dayjs().format('h');
var currentMilitaryTime = dayjs().format('H');



// setting the current date in the header
function setHeaderDate(){
  var headerDateEl = $("#current-day");
  var headerCurrentDate = dayjs().format('dddd, MMM D[th]');
  headerDateEl.text(headerCurrentDate);

}
setHeaderDate();


// CREATING THE SCHEDULE:

// create the hour block divs, html and css
function createHourBlocks() {
  var hourBlock = $("<div id='hour-block' class='row time-block inactive-block'></div>")

  var hour = $("<div class='col-2 col-md-1 hour text-center py-3'></div>")
  hourBlock.append(hour)

  var scheduleItem = $("<textarea class='col-8 col-md-10 description' rows='3'></textarea>");
  hourBlock.append(scheduleItem)

  var saveBtn = $("<button class='btn saveBtn col-2 col-md-1' aria-label='save'></button>");
  var saveIcon = $("<i class='fas fa-save' aria-hidden='true'></i>");
  saveBtn.append(saveIcon);
  hourBlock.append(saveBtn);

  schedule.append(hourBlock);
}

// create an hour block for each hour of the day
function createWorkDay() {
  for (i=0; i <= workHours; i++){
    createHourBlocks();
  }
}
createWorkDay();

// set the time for each hour block dynamically. First, we will set the description be based on the 12 hour clock.
// then, we will set a data-attribute that gives the time in military time. We will use this data attribute to set our styling for past, present, and future.
function setHourBlockTime() {
  var thisHour;
  var morningStart = 8;
  var afternoonStart = 0;
  var militaryDayStart = 8;

  for (let i=0; i <= workHours; i++) {

    var hourBlock = $("#schedule").children()[i];

    if (morningStart <= 11) {
      morningStart++
      thisHour = morningStart
      $(hourBlock).find('div').text(thisHour + " AM");
    } else {
      afternoonStart++;
      thisHour = afternoonStart
      $(hourBlock).find('div').text(thisHour + " PM");
    };

    militaryDayStart++

    $(hourBlock).attr('data-work-hour', militaryDayStart);
  };
}
setHourBlockTime();


console.log(parseInt(currentTime));

console.log($("#schedule").children()[1].dataset.workHour);

// set the past, present, and future block styles, using the military time data attribute
// that we set in setHourBlockTimeData
function setPastPresentFuture(){
  var nonWorkingHours = [18,19,20,21,22,23,0,1,2,3,4,5,6,7];
  // var workingHours = [9,10,11,12,1,2,3,4,5];

  if (!nonWorkingHours.includes(parseInt(currentMilitaryTime))) {

    for (i=0; i <= workHours; i++) {
      var hourBlock = $("#schedule").children()[i];
      var hourBlockTimeData = $(hourBlock).attr("data-work-hour");

      if (parseInt(hourBlockTimeData) < parseInt(currentMilitaryTime)) {
        $(hourBlock).removeClass('present')
        $(hourBlock).removeClass('future')
        $(hourBlock).addClass('past')
      } else if (parseInt(hourBlockTimeData) === parseInt(currentMilitaryTime)){
        $(hourBlock).removeClass('past')
        $(hourBlock).removeClass('future')
        $(hourBlock).addClass('present');
      } else if(parseInt(hourBlockTimeData) > parseInt(currentMilitaryTime)){
        $(hourBlock).removeClass('past')
        $(hourBlock).removeClass('present')
        $(hourBlock).addClass('future');
      } else if (parseInt(currentMilitaryTime) >= 18) {
        $(hourBlock).removeClass('past');
      }
      }
  }
  }

setPastPresentFuture();





var saveButton = $('button')
$(saveButton).click(function (event) {
  event.preventDefault();
  var element = event.target;
  var textArea = $(element).parent().find('textarea');

  // see if there is an array in local storage, if not create one that contains an array containing empty objects

  // if there is, dont create and just push data based on the index of the hour block child element related to the schedule.
  // so, if the clicked button was inside child 0 of the schedule, then push the value of the text area to index 0 of the array in local storage

  console.log($(element).parent());

  // localStorage.setItem("task", textarea);
})

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.



// set the time until the next day in the footer

// function setTimeUntilTomorrow() {
//   const relativeTime = window.dayjs_plugin_relativeTime;
//   dayjs.extend(relativeTime)

  


//   var footer = $('#footer')
//   var footerTimer = $("<p></p>");

//   var startOfTomorrow = dayjs().startOf('d');

//   startOfTomorrow = dayjs(startOfTomorrow).format('h mm');
//   console.log(startOfTomorrow);

//   $(footerTimer).text(startOfTomorrow.diff(currentMilitaryTime));
//   footer.append(footerTimer);
// }

// setTimeUntilTomorrow()