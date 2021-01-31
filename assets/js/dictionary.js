function displayDef(userInput, response) {
  var defLength = response[0].shortdef.length
  var def = response[0].shortdef
  var noun =response[0].fl
  var defEntry = $("<div>");
  var h5 = $("<h5>");
   $(h5).addClass("dictH5");
  h5.text(userInput + "; " + noun);
  $(defEntry).append(h5);
  $("#dictionary").append(defEntry);
  for (var i =0; i < defLength; i++){
    var para = $("<p>")
    $(para).addClass("dictPara");
    para.text((i+1) + ": "+ def[i] ) 
    $(defEntry).append(para);
   };
};

function searchD(userInput) {
  var apiKEY = "72594bc0-4725-41da-8a59-a971cbb8960b";
  var queryURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${userInput}?key=${apiKEY}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    displayDef(userInput, response)
  });
};

$("#startSearch").click(function (e) {
  e.preventDefault();
  var userInput = $("#textarea1").val().trim();
  searchD(userInput);
});

$("#startSearchTwo").click(function (e) {
  e.preventDefault();
  var userInput = $("#textarea2").val().trim();
  searchD(userInput);
  $("#dictionary").empty();
  $("#textarea2").val("");
  $("#labelTwo").removeClass("active");
});