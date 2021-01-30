$("#startSearch").click(function(e) {
   $("#firstpage").attr("style","display=none");
   $("#secondpage").removeAttr("style");
    e.preventDefault();
    $("#pageOne").addClass("fade-out");
    setTimeout(function() {
      $("#pageOne").hide();
      $("#pageTwo").show();
      $("#pageTwo").removeClass("fade-out");
    }, 1000);
    var userInput = $("#textarea1").val().trim();
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