// Timer
var theTimer  = '';
let t = 0;

function startTimer(){
  theTimer = setInterval(function () {
    t++;
    document.getElementById("dem").innerHTML = t;
  }, 1000);
}

startTimer();

// Storage mockup
window.onload = function() {
  document.getElementById('save').onclick = function() {
    var value = document.getElementById('saveLine').value;
    //alert(value);

    // Storing user input
    chrome.storage.sync.set({'myLine': value}, function() {
      alert('Success!');
    });
  }

  // Retrieving user input
  document.getElementById('get').onclick = function() {
    chrome.storage.sync.get('myLine', function(data) {
      alert(data.myLine);
    })
  }
}