// function to display definition of user inputted word
function displayDef(userInput, response,) {
  // vars to grab info from api
  var defLength = response[0].shortdef.length
  var def = response[0].shortdef
  var wordClass =response[0].fl
  //creates div to display user input
  var defEntry = $("<div>");
  var h5 = $("<h5>");
  $(h5).attr("id", "icon");
  //creates h5 to display user input word
   $(h5).addClass("dictH5");
  h5.text(userInput + "; " + wordClass);
  $(defEntry).append(h5);
  //creates paragraph to display user input definition
  var newP = $("<p>");
  var hw = response[0].hwi.hw;
  var mw = response[0].hwi.prs[0].mw;
  $(newP).text(hw + "|" + mw);
  $(defEntry).append(newP);
  $("#dictionary").append(defEntry);
  for (var i =0; i < defLength; i++){
    var para = $("<p>")
    $(para).addClass("dictPara");
    para.text((i+1) + ": "+ def[i] ) 
    $(defEntry).append(para);
   };
};
//function to grab api
function searchD(userInput) {
  var apiKEY = "72594bc0-4725-41da-8a59-a971cbb8960b";
  var queryURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${userInput}?key=${apiKEY}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
   var audioFileURL;
    displayDef(userInput, response);
    playAudio(response, audioFileURL);
   
  });
};

//create var to grab first letter of user input
function playAudio(response, audioFileURL){
  var subDirec = "";
  var file = response[0].hwi.prs[0].sound.audio;
  console.log(file)
  var  firstThree = "";
  var gg = firstThree.slice(0,2)
  var specialCharacters = [
    "@",
    "%",
    "+",
    "\\",
    ",",
    "/",
    "'",
    "!",
    "#",
    "$",
    "^",
    "?",
    ":",
    ",",
    ")",
    "(",
    "}",
    "{",
    "]",
    "[",
    "~",
    "-",
    "_",
    ".",
  ];
for(var i = 0; i < 3; i++){
var char = file.charAt(i);
firstThree += char;
};
//check string in audio for bix
var x = 0
do{
  if(firstThree == "bix"){
    subDirec = "bix";
    x = 1;
  }
  if(gg == "gg") {
    subDirec = "gg";
    x = 1;
  }
    for(var i = 0; i < specialCharacters.legth; i++) {
      var a = file.slice(0,1)
      if(a = specialCharacters[i]){
        i = specialCharacters.length;
        subDirec = "number";
        x = 1;
      };
      
    };
subDirec = file.slice(0,1);
x = 1;
}
while(x = 0);

// make audio var with the sound URL from the api
  audioFileURL = `https://media.merriam-webster.com/audio/prons/en/us/wav/${subDirec}/${file}.wav`
  console.log(file.slice(0))
  console.log(audioFileURL)
  var icon = $("<i>");
  $(icon).addClass("small material-icons");
  $(icon).html("play_circle_outline");
  $(icon).attr("id", "audioPlayer");
  $(icon).attr("data-URL", audioFileURL);
  console.log(audioFileURL)
  $(icon).attr("onclick", "playSound()");
  $("#icon").append(icon);
};

// click function to play audio
function playSound(){
  var URL = $("#audioPlayer").attr("data-URL")
new Audio(URL).play();

console.log(URL)
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

$("#history").on("click", "li", function() {
  var returnWord = $(this).text();
  $("#dictionary").empty();
  searchD(returnWord);
  // console.log(returnWord)
});