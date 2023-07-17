// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

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

   localStorage.setItem("timeText", JSON.stringify(dateTextObject));
  }

var timeForm = $('.time-block');
timeForm.on('click', '.saveBtn', handleSaveText);

//this function is used to handle any click events that target any save button
function handleSaveText(event) {

  var btnClicked = $(event.target);
  var timeTextObject = JSON.parse(localStorage.getItem("timeText"));
  var parentDiv = btnClicked.parent('div');
  console.log(parentDiv.children('textarea').val());
  var parentID = parentDiv.attr('id');
  var hour = parseInt(parentID.substring(5, parentID.length));

  for (var i = 0; i < timeTextObject.length; i++)
  {
    if (timeTextObject[i].hourID === hour)
    {
      timeTextObject[i].userText = parentDiv.children('textarea').val();
    }
  }

  localStorage.setItem('timeText', JSON.stringify(timeTextObject));
}


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

//this function is used to reload any saved data after the page is left or it has been reloaded
function getSavedData(){
  var loadSaves = JSON.parse(localStorage.getItem('timeText'));
  var hourIterator = 9;

  for (var i = 0; i < loadSaves.length; i++)
  {
    var hourBlock = `hour-${hourIterator}`;
    hourIterator++;
    if (hourIterator === 13)
    {
      hourIterator = 1;
    }
  var hourDivs = $("#" + hourBlock);
  hourDivs.children('textarea').val(loadSaves[i].userText);
  }
}

getSavedData();
  
  // TODO: Add code to display the current date in the header of the page.
});
