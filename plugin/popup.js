let sortedDict = JSON.parse(localStorage.getItem('sortedWebDict'));

let tipsList = [
    "Turn your computer off for an hour.",
    "Put your computer out of sight.",
    "Take a nap to rest your eyes.",
    "Pick up a new or old hobby."
];

let quotesList = [
    "Strive for greatness.",
    "All limitations are self-imposed.",
    "Impossible is for the unwilling.",
    "What we think, we become."
];

document.addEventListener('DOMContentLoaded', function () {
    if (sortedDict[0][0]) {
        document.getElementById('siteOne').innerHTML = sortedDict[0][0];
        document.getElementById('timeOnSiteOne').innerHTML = convertTime(sortedDict[0][1]);
    }
    if (sortedDict[1][0]) {
        document.getElementById('siteTwo').innerHTML = sortedDict[1][0];
        document.getElementById('timeOnSiteTwo').innerHTML = convertTime(sortedDict[1][1]);
    }
    if (sortedDict[2][0]) {
        document.getElementById('siteThree').innerHTML = sortedDict[2][0];
        document.getElementById('timeOnSiteThree').innerHTML = convertTime(sortedDict[2][1]);
    }
    if (sortedDict[3][0]) {
        document.getElementById('siteFour').innerHTML = sortedDict[3][0];
        document.getElementById('timeOnSiteFour').innerHTML = convertTime(sortedDict[3][1]);
    }

    let btn = document.getElementById('btn');
    let output1 = document.getElementById('output1');
    let output2 = document.getElementById('output2');

    btn.onclick = function() {
        console.log('Tips and motivation randomized');
        let tipsIndex = Math.floor(Math.random() * tipsList.length);
        let quotesIndex = Math.floor(Math.random() * quotesList.length);
    
        output1.innerHTML = tipsList[tipsIndex];
        output2.innerHTML = quotesList[quotesIndex];
    };
});

function convertTime(secondsPassed){
    let hours = Math.round(Math.floor(secondsPassed / 3600));
    secondsPassed %= 3600;
    let minutes = Math.round(Math.floor(secondsPassed / 60));
    let seconds = Math.round(secondsPassed % 60);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return hours + ":" + minutes + ":" + seconds;
};