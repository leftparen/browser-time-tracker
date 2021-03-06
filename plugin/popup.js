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

    btn.onclick = function () {
        console.log('Tips and motivation randomized');
        let tipsIndex = Math.floor(Math.random() * tipsList.length);
        let quotesIndex = Math.floor(Math.random() * quotesList.length);

        output1.innerHTML = tipsList[tipsIndex];
        output2.innerHTML = quotesList[quotesIndex];
    };

    // let sOne = document.getElementById('siteOne').innerHTML = sortedDict[0][0];
    // let sTwo = document.getElementById('siteTwo').innerHTML = sortedDict[1][0];
    // let sThree = document.getElementById('siteThree').innerHTML = sortedDict[2][0];
    // let sFour = document.getElementById('siteFour').innerHTML = sortedDict[3][0];

    // let dOne = document.getElementById('timeOnSiteOne').innerHTML = convertTime(sortedDict[0][1]);
    // let dTwo = document.getElementById('timeOnSiteTwo').innerHTML = convertTime(sortedDict[1][1]);
    // let dThree = document.getElementById('timeOnSiteThree').innerHTML = convertTime(sortedDict[2][1]);
    // let dFour = document.getElementById('timeOnSiteFour').innerHTML = convertTime(sortedDict[3][1]);

    // let labels1 = [sOne, sTwo, sThree, sFour]
    // let data1 = [dOne, dTwo, dThree, dFour]

});

function convertTime(secondsPassed) {
    let hours = Math.round(Math.floor(secondsPassed / 3600));
    secondsPassed %= 3600;
    let minutes = Math.round(Math.floor(secondsPassed / 60));
    let seconds = Math.round(secondsPassed % 60);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return hours + ":" + minutes + ":" + seconds;
};

let labels = ['YES', 'NO']
let data = [10, 90]
let colors = ['#49A9EA', '#36CAAB']

let myChart = document.getElementById("myChart").getContext('2d');

let chart = new Chart(myChart, {
    type: 'doughnut',
    data: {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: colors
        }]
    },
    options: {
        title: {
            text: "Most Visited Apps",
            display: true
        }
    }
});