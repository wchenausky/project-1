$("#startSearch").click(function(e) {
  e.preventDefault();  
  $("#pageOne").addClass("fade-out");
  setTimeout(function() {
    $("#pageOne").hide();
    $("#pageTwo").show();
    $("#pageTwo").removeClass("fade-out");
  }, 1000);
  var userInput = $("#textarea1").val().trim();
  $("#textarea1").val("");
  searchUD(userInput);
  searchD(userInput);
  storage(userInput);
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
  $("#urbanDictionary").empty();
  $("#labelTwo").removeClass("active");
  $("#dictionary").empty();
  $("#textarea2").val("");
  $("#labelTwo").removeClass("active");
  searchUD(userInput);
  searchD(userInput);
  storage(userInput);
});

$("#history").on("click", "li", function(e) {
  var returnWord = $(this).text();
  $("#urbanDictionary").empty();
  $("#dictionary").empty();
  searchUD(returnWord);
  searchD(returnWord);
  storage(returnWord);
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
  storage(a);
  });

init();