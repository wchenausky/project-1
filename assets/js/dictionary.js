$("#startSearch").click(function (e) {
  e.preventDefault();

  var userInput = $("#textarea1").val().trim();

  var apiKEY = "72594bc0-4725-41da-8a59-a971cbb8960b";

  var queryURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${userInput}?key=${apiKEY}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
   var defLength = response[0].shortdef.length
   var def = response[0].shortdef
  displayDef(defLength, userInput, def)
  console.log(response)
  console.log(defLength[0])
  });
});

function displayDef(defLength, userInput, def) {
  console.log(defLength[0])
  var defEntry = $("<div>");
  var h5 = $("<h5>");
  h5.text(userInput);
  $(defEntry).append(h5);
  $("#dictionary").append(defEntry);
  for (var i =0; i < defLength; i++){
    var para = $("<p>")
    para.text((i+1) + ": " + def[i] )
  
    $(defEntry).append(para);
    //console.log(response[0].shortdef[i]);
    
    

   };
};