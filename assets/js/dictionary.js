$("#startSearch").click(function(e) {
    e.preventDefault();

    var userInput = $("#textarea1").val().trim();

var apiKEY = "72594bc0-4725-41da-8a59-a971cbb8960b"

    var queryURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${userInput}?key=${apiKEY}`;

$.ajax ({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
});
});