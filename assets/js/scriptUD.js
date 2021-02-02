var results = 2;

function renderUD(r, word) {
  console.log(r);
  console.log(r.list[0].definition);
  var newH5 = $("<h5>");
  var w = word.toUpperCase();
  $(newH5).text(w);
  $(newH5).addClass("dictH5");
  $("#urbanDictionary").append(newH5);
  var userInput = $("#textarea1").val().trim();
  localStorage.setItem("history",userInput);
  for (var i = 0; i < results + 1; i++) {
    var udDefinition = r.list[i].definition;
    var udDefinitionSTR = JSON.stringify(udDefinition);
    var newDef = udDefinitionSTR.replace(/\\r\\n/g, '<br>');
    console.log(newDef);
    var newP = $("<p>");
    $(newP).html((i+1) + ": " + "<br>"  + newDef);
    $(newP).addClass("dictPara");
    $("#urbanDictionary").append(newP);
  }
}

function searchUD(userInput) {
  var savedHistory = localStorage.getItem("history");//21-25 local storage !Don't change!
  var a=$("<li>")
  a.text(savedHistory)
  a.addClass("info")
  $("#history").prepend(a) //Don't change 
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
    error: function(){
      alert("Please enter valid search term!");
      location.reload();
    },
  };
  $.ajax(settings).done(function (response) {
    renderUD(response, userInput);
  });
}


 
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
    var a=$("<li>")
    a.text(savedHistory)
    a.addClass("info")
    $("#history").prepend(a)
    localStorage.setItem("history",userInput);//Don't change 
    searchUD(userInput);
  });

  $("#textarea1").keypress(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#startSearch").click();
    }
  });

  $("#startSearchTwo").click(function(e) {
    e.preventDefault();
    $("#urbanDictionary").empty();
    var userInput = $("#textarea2").val().trim();
    localStorage.setItem("history",userInput);
    searchUD(userInput);
    $("#labelTwo").removeClass("active");
  });

  $("#history").on("click", "li", function() {
    var returnWord = $(this).text();
    $("#urbanDictionary").empty();
    searchUD(returnWord);
    // console.log(returnWord)
});
