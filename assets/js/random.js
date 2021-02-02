var wordOptions = ["Bamboozle", "Durk", "Knocking", "Tight", "Dope", "Ratchet", "Poop", "Novel", "Bucket", "lol", "Like", "Twit"];
// var randWord = [];
var displayWord = [];

init();

function init() {
    var i = Math.floor(Math.random() * wordOptions.length);
    var newItem = $("<li>");
    newItem.text(wordOptions[i]);
    $("#wordOfDay").append(newItem);
    console.log(wordOptions[i])
};

    $("#wordOfDay").click(function() {
        var a = $(this).text();
        console.log(a);
        $("#pageOne").addClass("fade-out");
    setTimeout(function() {
      $("#pageOne").hide();
      $("#pageTwo").show();
      $("#pageTwo").removeClass("fade-out");
    }, 1000);
    searchUD(a);
    searchD(a);
  });

  function renderUD(r, word) {
    // console.log(r);
    // console.log(r.list[0].definition);
    var newH5 = $("<h5>");
    var w = word.toUpperCase();
    $(newH5).text(w);
  
    $(newH5).addClass("dictH5");
    $("#urbanDictionary").append(newH5);
    var userInput = $("#textarea1").val().trim();
    localStorage.setItem("history",userInput);
  
    for (var i = 0; i < results + 1; i++) {
      var udDefinition = r.list[i].definition;
      var newP = $("<p>");
      $(newP).text((i+1) + ": " + udDefinition);
      $(newP).addClass("dictPara");
      $("#urbanDictionary").append(newP);
    }
  }

    function searchUD(userInput) {
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
    };
    $.ajax(settings).done(function (response) {
      console.log(userInput);
      renderUD(response, userInput);
    });
  };
  
    function searchD(userInput) {
      var apiKEY = "72594bc0-4725-41da-8a59-a971cbb8960b";
      var queryURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${userInput}?key=${apiKEY}`;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        displayDef(userInput, response)
      });
    };

    function displayDef(userInput, response) {
      var defLength = response[0].shortdef.length
      var def = response[0].shortdef
      var noun =response[0].fl
      var defEntry = $("<div>");
      var h5 = $("<h5>");
       $(h5).addClass("dictH5");
      h5.text(userInput + "; " + noun);
      $(defEntry).append(h5);
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
    // $("#startSearch").click(function (e) {
    //   e.preventDefault();
    //   var userInput = $("#textarea1").val().trim();
    //   searchD(userInput);
    // });

