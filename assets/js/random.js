var wordOptions = ["Bamboozle", "Durk", "Knocking", "Tight", "Dope", "Ratchet", "nick1", "nick2", "nick3", "shu1", "shu2", "shu3"];
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
        var a = $(this)
        $("#pageOne").addClass("fade-out");
    setTimeout(function() {
      $("#pageOne").hide();
      $("#pageTwo").show();
      $("#pageTwo").removeClass("fade-out");
    }, 1000);
    var userInput = ($(a).text()); 
    var q = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${userInput}`; 
    console.log(q);
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
      console.log(response);
    });
    });



