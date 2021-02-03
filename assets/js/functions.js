var wordOptions = ["Bamboozle", "Durk", "Knocking", "Tight", "Dope", "Ratchet", "Poop", "Novel", "Bucket", "lol", "Like", "Twit"];
// var randWord = [];
var displayWord = [];
var results = 2;

function init() {
  var i = Math.floor(Math.random() * wordOptions.length);
  var newItem = $("<li>");
  newItem.text(wordOptions[i]);
  $("#wordOfDay").append(newItem);
};

function renderUD(r, word) {
  var newH5 = $("<h5>");
  var w = word.toUpperCase();
  $(newH5).text(w);
  $(newH5).addClass("dictH5");
  $("#urbanDictionary").append(newH5);
  var userInput = $("#textarea1").val().trim();
  localStorage.setItem("history", userInput);
  for (var i = 0; i < results + 1; i++) {
    var udDefinition = r.list[i].definition;
    var newP = $("<p>");
    $(newP).text((i + 1) + ": " + udDefinition);
    $(newP).addClass("dictPara");
    $("#urbanDictionary").append(newP);
  }
}

function searchUD(userInput) {
  var savedHistory = localStorage.getItem("history");//21-25 local storage !Don't change!
  var savedHistory = JSON.parse(localStorage.getItem("history")); // NEW !!!.....
  historyArray=savedHistory;     
  $("#history").empty();  
  if (savedHistory !== null){   //if local storage is not empty 
    historyArray.push(userInput);
    localStorage.setItem("history",JSON.stringify(historyArray));
     for (var i=1;i<6;i++){
      j=historyArray.length-i
      var a=$("<li>")
      a.text(historyArray[j])
      a.addClass("info")
      $("#history").append(a)  
     }
  }
  else {     //if its  empty
    var historyArray =[];
    historyArray.push(userInput);
    localStorage.setItem("history",JSON.stringify(historyArray));
     for (var i=1;i<6;i++){
      j=historyArray.length-i
      var a=$("<li>")
      a.text(historyArray[j])
      a.addClass("info")
      $("#history").append(a)
     }
  }     // ........NEW !!! 3.
  var q = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${userInput}`;
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `${q}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "a81dca7536msh6bc3d3699a87596p1ae89bjsn3961fc20945c",
      "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
    },
    error: function () {
      alert("Please enter valid search term!");
      location.reload();
    },
  };
  $.ajax(settings).done(function (response) {
    renderUD(response, userInput);
  });
};


//function to grab api
function searchD(userInput) {
  var apiKEY = "72594bc0-4725-41da-8a59-a971cbb8960b";
  var queryURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${userInput}?key=${apiKEY}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var audioFileURL;
    displayDef(userInput, response);
    playAudio(response, audioFileURL);
  });
};

// function to display definition of user inputted word
function displayDef(userInput, response,) {
  // vars to grab info from api
  var defLength = response[0].shortdef.length
  var def = response[0].shortdef
  var wordClass = response[0].fl
  //creates div to display user input
  var defEntry = $("<div>");
  var h5 = $("<h5>");
  $(h5).attr("id", "icon");
  //creates h5 to display user input word
  $(h5).addClass("dictH5");
  h5.text(userInput + "; " + wordClass + " ");
  $(defEntry).append(h5);
  //creates paragraph to display user input definition
  var newP = $("<p>");
  var hw = response[0].hwi.hw;
  var mw = response[0].hwi.prs[0].mw;
  $(newP).text(hw + "|" + mw);
  $(defEntry).append(newP);
  $("#dictionary").append(defEntry);
  for (var i = 0; i < defLength; i++) {
    var para = $("<p>")
    $(para).addClass("dictPara");
    para.text((i + 1) + ": " + def[i])
    $(defEntry).append(para);
  };
};

//create var to grab first letter of user input
function playAudio(response, audioFileURL) {
  var subDirec = "";
  var file = response[0].hwi.prs[0].sound.audio;
  var firstThree = "";
  var gg = firstThree.slice(0, 2)
  var specialCharacters = ["@","%","+","\\",",","/","'","!","#","$","^","?",":",",",")","(","}","{","]","[","~","-","_",".",];
  for (var i = 0; i < 3; i++) {
    var char = file.charAt(i);
    firstThree += char;
  };
  //check string in audio for bix
  var x = 0
  do {
    if (firstThree == "bix") {
      subDirec = "bix";
      x = 1;
    }
    if (gg == "gg") {
      subDirec = "gg";
      x = 1;
    }
    for (var i = 0; i < specialCharacters.legth; i++) {
      var a = file.slice(0, 1)
      if (a = specialCharacters[i]) {
        i = specialCharacters.length;
        subDirec = "number";
        x = 1;
      };

    };
    subDirec = file.slice(0, 1);
    x = 1;
  }
  while (x = 0);
  // make audio var with the sound URL from the api
  audioFileURL = `https://media.merriam-webster.com/audio/prons/en/us/wav/${subDirec}/${file}.wav`
  var icon = $("<i>");
  $(icon).addClass("small material-icons");
  $(icon).html("play_circle_outline");
  $(icon).attr("id", "audioPlayer");
  $(icon).attr("data-URL", audioFileURL);
  $(icon).attr("onclick", "playSound()");
  $("#icon").append(icon);
};

// click function to play audio
function playSound() {
  var URL = $("#audioPlayer").attr("data-URL")
  new Audio(URL).play();
};

function renderUD(r, word) {
  var newH5 = $("<h5>");
  var w = word.toUpperCase();
  $(newH5).text(w);
  $(newH5).addClass("dictH5");
  $("#urbanDictionary").append(newH5);
  var userInput = $("#textarea1").val().trim();
  localStorage.setItem("history", userInput);
  for (var i = 0; i < results + 1; i++) {
    var udDefinition = r.list[i].definition;
    var udDefinitionSTR = JSON.stringify(udDefinition);
    var newDef = udDefinitionSTR.replace(/\\r\\n/g, '<br>');
    var newP = $("<p>");
    $(newP).html((i + 1) + ": " + "<br>" + newDef);
    $(newP).addClass("dictPara");
    $("#urbanDictionary").append(newP);
  }
}

