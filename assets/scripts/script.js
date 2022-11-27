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

  for (i=0; i <= workHours; i++) {

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
  var workingHours = [8,9,10,11,12,13,14,15,16,17];

  if (workingHours.includes(parseInt(currentMilitaryTime))) {

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

var storedTasks = [
  {
    hourBlock: 9,
    task:""
  },
  {
    hourBlock: 10,
    task:""
  },
  {
    hourBlock: 11,
    task:""
  },
  {
    hourBlock: 12,
    task:""
  },
  {
    hourBlock: 1,
    task:""
  },
  {
    hourBlock: 2,
    task:""
  },
  {
    hourBlock: 3,
    task:""
  },
  {
    hourBlock: 4,
    task:""
  },
  {
    hourBlock: 5,
    task:""
  },
]

$(saveButton).click(function (event) {
  event.preventDefault();

  var element = event.target;

  var textArea = $(element).parent().find('textarea');
  var textAreaInput = $(textArea).val();
  var textAreaIndex = $(element).parent().index();
 
   // see if there is an array in local storage. If not, then make one using the empty storedTasks array
  if (localStorage.getItem("storedTasks") === null) {
    storedTasks[textAreaIndex].task = $.trim(textAreaInput);
    localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
  // if there is a stored array, dont create one and just push data based on the index of the hour block child element related to the schedule.
  // so, if the clicked button was inside child 0 of the schedule, then push the value of the text area to index 0 of the array in local storage
  } else{
    storedTasks = JSON.parse(localStorage.getItem("storedTasks"));
    storedTasks[textAreaIndex].task = $.trim(textAreaInput);
    $(textArea).val(storedTasks[textAreaIndex].task);
    localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
  };
});

function getStoredTasks() {
  if (localStorage.getItem("storedTasks") !== null) {
  for (i=0; i <= workHours; i++) {
    var hourBlockTextarea = $("#schedule").children()[i];
    storedTasks = JSON.parse(localStorage.getItem("storedTasks"));

    $(hourBlockTextarea).find('textarea').val(storedTasks[i].task);
  };
};
};
getStoredTasks()

function clearStoredTasks() {
  if (localStorage.getItem("storedTasks") !== null) {
    storedTasks = [
      {
        hourBlock: 9,
        task: "",
      },
      {
        hourBlock: 10,
        task: "",
      },
      {
        hourBlock: 11,
        task: "",
      },
      {
        hourBlock: 12,
        task: "",
      },
      {
        hourBlock: 1,
        task: "",
      },
      {
        hourBlock: 2,
        task: "",
      },
      {
        hourBlock: 3,
        task: "",
      },
      {
        hourBlock: 4,
        task: "",
      },
      {
        hourBlock: 5,
        task: "",
      },
    ];
    localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
  };
  window.alert("You have not saved any tasks!");
};

function startNewWorkDay() {
  if (parseInt(currentMilitaryTime) === 1) {
    clearStoredTasks();
    location.reload();
  };
};
startNewWorkDay();

$('#clear-stored-tasks').click(function (event){
  event.preventDefault();
  var confirmClear = window.confirm("This will clear all of the tasks for today. To clear tasks for one hour, simply erase the task and save. Are you sure you want to continue?")
  if (confirmClear){
    clearStoredTasks();
    location.reload();
  }
  return;
});

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