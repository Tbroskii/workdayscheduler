$(function () {

  if (localStorage.getItem("timeText") === null) // if local storage is empty initailze an object to store data
  {
    var dateTextObject = [
      {userText:"", hourID: 9},
      {userText:"", hourID: 10},
      {userText:"", hourID: 11},
      {userText:"", hourID: 12},
      {userText:"", hourID: 1},
      {userText:"", hourID: 2},
      {userText:"", hourID: 3},
      {userText:"", hourID: 4},
      {userText:"", hourID: 5}
    ]

   localStorage.setItem("timeText", JSON.stringify(dateTextObject));//make array a string to store the data in local storage
  }

var timeForm = $('.time-block');
timeForm.on('click', '.saveBtn', handleSaveText);

//this function is used to handle any click events that target any save button
function handleSaveText(event) {

  var btnClicked = $(event.target);//this gets the div for the button that was clicked
  var timeTextObject = JSON.parse(localStorage.getItem("timeText"));//parse out current localstorage back into array with objects
  var parentDiv = btnClicked.parent('div'); //this gets to the parent div from the button clicked
  var parentID = parentDiv.attr('id');//this is getting id of div
  var hour = parseInt(parentID.substring(5, parentID.length));//this is getting the hour of day by pulling a substring

  for (var i = 0; i < timeTextObject.length; i++) //this loops through until the correct hour is found withing the array
  {
    if (timeTextObject[i].hourID === hour)//once we have found the matching hour id to the hour we set the text of usertext to whatever is within the text area
    {
      timeTextObject[i].userText = parentDiv.children('textarea').val();
    }
  }

  localStorage.setItem('timeText', JSON.stringify(timeTextObject));//put updated array back into string and store into local storage
}

$(".time-block").each(function() { //for each element with class .time-block perform this function

  var timeBlockID = $(this).attr("id");//get the id of the current div
  var hour = parseInt(timeBlockID.substring(5, timeBlockID.length)); //get the time from the div
  var currentHour = dayjs().hour();//get the current time
  //convert times to military time so the can be compared
  if (hour === 1)
  {
    hour = 13
  }
  else if (hour === 2)
  {
    hour = 14
  }
  else if (hour === 3)
  {
    hour = 15
  }
  else if (hour === 4)
  {
    hour = 16
  }
  else if (hour === 5)
  {
    hour = 17;
  }

  var hourDayObj = dayjs().hour(hour);//convert the hour into a days object

  if (dayjs().isAfter(hourDayObj, 'h'))//set class depending on time of day
  {
    $(this).removeClass("present future").addClass("past")
  }
  else if (hour === currentHour)
  {
    $(this).removeClass("future past").addClass("present")
  }
  else
  {
    $(this).removeClass("present past").addClass("future")
  }

});

//this function is used to reload any saved data after the page is left or it has been reloaded
function getSavedData(){
  var loadSaves = JSON.parse(localStorage.getItem('timeText'));//get array from local storage string
  var hourIterator = 9; //get first hour of work day

  for (var i = 0; i < loadSaves.length; i++)//this loop is meant to go through and load all of the saved usertext in the array into the correct hour
  {
    var hourBlock = `hour-${hourIterator}`;// use template literal to allow for an iterable id
    hourIterator++; //iterate hour
    if (hourIterator === 13) //once hour hits 13 reset back down to one
    {
      hourIterator = 1;
    }
  var hourDivs = $("#" + hourBlock); //use iterated hour id to get each hour block
  hourDivs.children('textarea').val(loadSaves[i].userText); //put usertext into text area
  }
}

getSavedData();//call once whenever page is reloaded
  
  // TODO: Add code to display the current date in the header of the page.
  function getCurrentDay(){
    var currentDay = dayjs().format('dddd, MMMM DD') //format current day
    
    //add correct end depending on day
    if (dayjs().date() === 1)
    {
      currentDay = currentDay + "st";
    }
    else if (dayjs().date() === 2)
    {
      currentDay = currentDay + "nd";
    }
    else if (dayjs().date() === 3)
    {
      currentDay = currentDay + "rd";
    }
    else
    {
      currentDay = currentDay + "th";
    }

    //put formattted date into p
    $("#current-day").text(currentDay);
  }

  getCurrentDay();
});
