$("#startSearch").click(function (e) {
  e.preventDefault();
  var userInput = $("#textarea1").val().trim();
  if (userInput !== "") {
    $("#pageOne").addClass("fade-out");
    $("#wodOne").addClass("fade-out");
  setTimeout(function () {
    $("#pageOne").hide();
    $("#pageTwo").show();
    $("#pageTwo").removeClass("fade-out");
    $("#wodOne").hide();
    $("#wodTwo").show();
    $("#wodTwo").removeClass("fade-out");
  }, 1000);
  $("#textarea1").val("");
  randomDWord(newItem);
  $("#wordOfDayTwo").append(newItem);
  searchUD(userInput);
  searchD(userInput);
  storage(userInput);
  } else {
    OpenModal();
  }
});

$("#textarea1").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#startSearch").click();
  }
});

$("#textarea2").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#startSearchTwo").click();
  }
});

$("#startSearchTwo").click(function (e) {
  e.preventDefault();
  var userInput = $("#textarea2").val().trim();
  if (userInput !== "") {
    $("#urbanDictionary").empty();
    $("#labelTwo").removeClass("active");
    $("#dictionary").empty();
    $("#textarea2").val("");
    $("#labelTwo").removeClass("active");
    randomDWord(newItem);
    $("#wordOfDayTwo").append(newItem);
    searchUD(userInput);
    searchD(userInput);
    storage(userInput);
  } else {
    OpenModal();
  }
  
});

$("#history").on("click", "li", function (e) {
  var returnWord = $(this).text();
  $("#urbanDictionary").empty();
  $("#dictionary").empty();
  searchUD(returnWord);
  searchD(returnWord);
  storage(returnWord);
});

$("#wordOfDay").click(function () {
  var a = $(this).text().trim();
  $('html, body').animate({ scrollTop: 0 }, 'fast');
  $("#pageOne").addClass("fade-out");
  setTimeout(function () {
    $("#pageOne").hide();
    $("#pageTwo").show();
    $("#pageTwo").removeClass("fade-out");
    $("#wodOne").hide();
    $("#wodTwo").show();
    $("#wodTwo").removeClass("fade-out");
  }, 1000);
  randomDWord(newItem);
  $("#wordOfDayTwo").append(newItem);
  searchUD(a);
  searchD(a);
  storage(a);
});

$("#wordOfDayTwo").click(function () {
  var a = $(this).text().trim();
  console.log(a);
  $('html, body').animate({ scrollTop: 0 }, 'fast');
  $("#urbanDictionary").empty();
  $("#dictionary").empty();
  randomDWord(newItem);
  $("#wordOfDayTwo").append(newItem);
  searchUD(a);
  searchD(a);
  storage(a);
});

$("#clearHistory").click(function (e) {
  e.preventDefault();
  localStorage.clear();
  $("#history").empty();
});

init();