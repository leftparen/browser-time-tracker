// The popup works. Display shows 0.0001 sometimes
// because the array hasn't been sorted at that particular moment.
// Therefore, the newest entry is always first, or in array[0][1].

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
    document.getElementById('siteOne').innerHTML = sortedDict[0][0];
    document.getElementById('timeOnSiteOne').innerHTML = convertTime(sortedDict[0][1]);

    document.getElementById('siteTwo').innerHTML = sortedDict[1][0];
    document.getElementById('timeOnSiteTwo').innerHTML = convertTime(sortedDict[1][1]);

    document.getElementById('siteThree').innerHTML = sortedDict[2][0];
    document.getElementById('timeOnSiteThree').innerHTML = convertTime(sortedDict[2][1]);

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
    let minutesPassed = secondsPassed / 60;
    if (minutesPassed < 1){
        return Math.round(secondsPassed) + ' sec';
    }
    else if (minutesPassed < 60) {
        return Math.round(minutesPassed) + ' mins';
    }
    else {
        return Math.round(minutesPassed / 60) + ' hrs';
    };
};