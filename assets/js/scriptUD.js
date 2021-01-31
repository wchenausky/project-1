$("#startSearch").click(function(e) {
    e.preventDefault();  
    $("#pageOne").addClass("fade-out");
    setTimeout(function() {
      $("#pageOne").hide();
      $("#pageTwo").show();
      $("#pageTwo").removeClass("fade-out");
    }, 1000);
    var userInput = $("#textarea1").val().trim();
    localStorage.setItem("history",userInput);
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
      console.log(response);
    });
  });

  $("#textarea1").keypress(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#startSearch").click();
    }
  });
  $(".secondSearch").on("click",function(searchHistory){
    searchHistory.preventDefault();
    var userInput2=$("#textarea2").val().trim();
    localStorage.setItem("history",userInput2);
    console.log("this function works");
    $(".history").val(localStorage.getItem(history));
  });
  searchHistory();