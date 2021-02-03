var results = 2;
var historyArray =[]; //add this !!!!  NEW 1.

function renderUD(r, word) {
  console.log(r);
  console.log(r.list[0].definition);
  var newH5 = $("<h5>");
  var w = word.toUpperCase();
  $(newH5).text(w);
  $(newH5).addClass("dictH5");
  $("#urbanDictionary").append(newH5); // I deleted 2 lines  this !!!!NEW 2.
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

function searchUD(userInput) {  // add NEW !!!! u should copy paste this whole function !  3.
  var savedHistory = JSON.parse(localStorage.getItem("history")); // NEW !!!.....
  console.log(userInput); 
  historyArray=savedHistory;     
  $("#history").empty();  
  if (savedHistory !== null){   //if local storage is not empty 
    historyArray.push(userInput);
    localStorage.setItem("history",JSON.stringify(historyArray));
    console.log(historyArray);
     for (var i=1;i<6;i++){
      j=historyArray.length-i
      var a=$("<li>")
      a.text(historyArray[j])
      console.log(j,historyArray[j])
      a.addClass("info")
      $("#history").append(a)  
     }
  }
  else {     //if its  empty
    var historyArray =[];
    historyArray.push(userInput);
    localStorage.setItem("history",JSON.stringify(historyArray));
    console.log(historyArray);
     for (var i=1;i<6;i++){
      j=historyArray.length-i
      var a=$("<li>")
      a.text(historyArray[j])
      console.log(j,historyArray[j])
      a.addClass("info")
      $("#history").append(a)
     }
  }     // ........NEW !!! 3.

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
    }, 1000);  //AFTER 1000); All // NEW !!!!!
    var userInput = $("#textarea1").val().trim();// NEW
    searchUD(userInput); // // NEW
  }); //NEW 

  $("#textarea1").keypress(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#startSearch").click();
    }
  });

  $("#startSearchTwo").click(function(e) {
    e.preventDefault();
    $("#urbanDictionary").empty();
    var userInput = $("#textarea2").val().trim(); //i deleted 1 line  NEW 5.
    searchUD(userInput);  // NEW !!! 
    $("#labelTwo").removeClass("active"); // NEW !!! 6.
  });

  $("#history").on("click", "li", function() {
    var returnWord = $(this).text();
    $("#urbanDictionary").empty();
    searchUD(returnWord);
});