$("#startSearch").click(function(e) {
  e.preventDefault();  
  $("#pageOne").addClass("fade-out");
  setTimeout(function() {
    $("#pageOne").hide();
    $("#pageTwo").show();
    $("#pageTwo").removeClass("fade-out");
  }, 1000);
  var savedHistory = localStorage.getItem("history"); //57-63 local storage !Don't change!
  var userInput = $("#textarea1").val().trim();
  var a=$("<li>");
  a.text(savedHistory);
  a.addClass("info");
  $("#history").prepend(a);
  localStorage.setItem("history",userInput);//Don't change 
  searchUD(userInput);
  searchD(userInput);
});

$("#textarea1").keypress(function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#startSearch").click();
  }
});

$("#textarea2").keypress(function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#startSearchTwo").click();
  }
});

$("#startSearchTwo").click(function(e) {
  e.preventDefault();
  var userInput = $("#textarea2").val().trim();
  localStorage.setItem("history",userInput);
  $("#urbanDictionary").empty();
  $("#labelTwo").removeClass("active");
  $("#dictionary").empty();
  $("#textarea2").val("");
  $("#labelTwo").removeClass("active");
  searchUD(userInput);
  searchD(userInput);
});

$("#history").on("click", "li", function(e) {
  var returnWord = $(this).text();
  $("#urbanDictionary").empty();
  $("#dictionary").empty();
  searchUD(returnWord);
  searchD(returnWord);
});

$("#wordOfDay").click(function() {
  var a = $(this).text();
  $("#pageOne").addClass("fade-out");
  setTimeout(function() {
  $("#pageOne").hide();
  $("#pageTwo").show();
  $("#pageTwo").removeClass("fade-out");
  }, 1000);
  searchUD(a);
  searchD(a);
  });

init();