var sortedWebDict = [];

// Detects when user clicks off of window
chrome.windows.onFocusChanged.addListener(processSiteChange);
// Detects when user changes sites within a tab
chrome.tabs.onUpdated.addListener(processSiteChange);
// Detects when user changes tabs within a window
chrome.tabs.onActivated.addListener(processSiteChange);

// Resets data every Sunday or every seven, or more, days
if (localStorage.getItem('lastReset')) {
    let currentDate = new Date();
    let lastReset = JSON.parse(localStorage.getItem('lastReset'));
    let lastResetDate = new Date(lastReset.date);
    if (currentDate > addDays(lastResetDate, 7) || (currentDate.getDay() == 0 && !datesAreOnSameDay(lastResetDate, currentDate))) {
        localStorage.clear();
        lastReset.date = currentDate;
        localStorage.setItem('lastReset', JSON.stringify(lastReset));
        console.log('Last reset was more than a week ago');
    } else {
        console.log('Last reset was less than a week ago');
    }
} else {
    let weekStart = new Date();
    weekStart.setHours(0,0,0,0);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    let lastReset = {
        date: weekStart
    }
    localStorage.setItem('lastReset', JSON.stringify(lastReset));
    console.log('New reset day: ' + weekStart);
}

// Checks to see if an object to collect the website data exists
if (localStorage.getItem('websiteDict')) {
    var websiteDict = JSON.parse(localStorage.getItem('websiteDict'));
    console.log('websiteDict exists');
} else {
    var websiteDict = {};
    console.log('websiteDict does not exist');
}

// Process current site
function processSiteChange() {

    // Gets url and hostname everytime user changes websites
    chrome.tabs.query({"active": true}, function(tabs) {
            if (tabs[0]) {
                let url = tabs[0].url;
                try {
                    let urlObject = new URL(url);
                    var hostName = urlObject.hostname;
                    console.log(hostName);
                } catch(e) {
                    console.log('could not construct a url');
                }
            }
            if (!(hostName in websiteDict)) {
                websiteDict[hostName] = [0,0,0,0,0,0,0];
            }
            // If there was a last website, program gets it. If not, program stores current site as the last website
            if (localStorage.getItem('lastWebsite') != null) {
                let lastWebsite = JSON.parse(localStorage.getItem('lastWebsite'));
                if (!(lastWebsite.website in websiteDict)) {
                    websiteDict[lastWebsite.website] = [0,0,0,0,0,0,0];
                }

                let secondsPassed = (Date.now() - lastWebsite.timeStamp) / 1000;
                console.log(secondsPassed);
                const currentDate = new Date();
                const dayOfTheWeek = currentDate.getDay();
                websiteDict[lastWebsite.website][dayOfTheWeek] = secondsPassed + websiteDict[lastWebsite.website][dayOfTheWeek];

                // Data for time offline is deleted
                if (typeof lastWebsite.website == 'undefined') {
                    delete websiteDict[lastWebsite.website];
                }

                lastWebsite = {
                    website: hostName,
                    timeStamp: Date.now()
                }
                localStorage.setItem('lastWebsite', JSON.stringify(lastWebsite));
            } else {
                let lastWebsite = {
                    website: hostName,
                    timeStamp: Date.now()
                }
                localStorage.setItem('lastWebsite', JSON.stringify(lastWebsite));
            }
            // Sorting the array based on their values (time spent on a site)
            sortData(websiteDict);

            // Storing the website data
            localStorage.setItem('websiteDict', JSON.stringify(websiteDict));
            
            // Storing the array so popup.js can use it. Find more efficient way?
            localStorage.setItem('sortedWebDict', JSON.stringify(sortedWebDict));
    });
    //localStorage.clear();
};

function sortData(unsortedDict) {
    sortedWebDict = Object.keys(unsortedDict).map(function(key) {
        return [key, unsortedDict[key].reduce((a, b) => a + b, 0)];
    });
    sortedWebDict.sort(function(first, second) {
        return second[1] - first[1];
    });
};

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

function datesAreOnSameDay(first, second) {
    return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
};