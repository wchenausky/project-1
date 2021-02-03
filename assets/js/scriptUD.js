var results = 2;
var historyArray =[]; //add this !!!!!i need!!!! 1

function renderUD(r, word) {
  console.log(r);
  console.log(r.list[0].definition);
  var newH5 = $("<h5>");
  var w = word.toUpperCase();
  $(newH5).text(w);
  $(newH5).addClass("dictH5");
  $("#urbanDictionary").append(newH5); //delete next 2 lines PLZ which is wrong( var user; localStorage) 2.
  for (var i = 0; i < results + 1; i++) {
    var udDefinition = r.list[i].definition;    // new?
    var udDefinitionSTR = JSON.stringify(udDefinition);  // sb add these 2 lines???
    var newDef = udDefinitionSTR.replace(/\\r\\n/g, '<br>');
    console.log(newDef);
    var newP = $("<p>");
    $(newP).html((i+1) + ": " + "<br>"  + newDef);
    $(newP).addClass("dictPara");
    $("#urbanDictionary").append(newP);
  }
}

function searchUD(userInput) {  // add some NEW !!!! u should copy my this whole function!  3.
  var savedHistory = JSON.parse(localStorage.getItem("history")); // NEW !!!
  console.log(userInput);   //NEW!!!
  historyArray=savedHistory;     //NEW!!!
  $("#history").empty();   // NEW
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
      $("#history").append(a)  // NEW
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
  }     // NEW !!! 3.

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
    }, 1000);  //AFTER 1000); All new  !!!DELETE those 9 lines and copy this new! 4.
    var userInput = $("#textarea1").val().trim();// NEW
    searchUD(userInput);
  }); //NEW yes just copy this 3 lines plz

  $("#textarea1").keypress(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#startSearch").click();
    }
  });

  $("#startSearchTwo").click(function(e) {
    e.preventDefault();
    $("#urbanDictionary").empty();
    var userInput = $("#textarea2").val().trim(); //delete 1 line:(localStorage) PLZ 5.
    searchUD(userInput);  //only this
    $("#labelTwo").removeClass("active"); //only this 2 lines left !  Hey sweety !i changed the img webhome.png resolve that 6.
  });

  $("#history").on("click", "li", function() {
    var returnWord = $(this).text();
    $("#urbanDictionary").empty();
    searchUD(returnWord);
    // console.log(returnWord)
});