var results = 2;

function renderUD(r, word) {
  console.log(r);
  console.log(r.list[0].definition);
  var newH5 = $("<h5>");
  var w = word.toUpperCase();
  $(newH5).text(w);
  $(newH5).addClass("dictH5");
  $("#urbanDictionary").append(newH5);
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
    var userInput = $("#textarea1").val().trim();
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
    searchUD(userInput);
    $("#textarea2").val("");
    $("#labelTwo").removeClass("active");
  });
