var sortedWebDict = [];

// Detects when user clicks off of window
chrome.windows.onFocusChanged.addListener(function(windowId){
    if (windowId == chrome.windows.WINDOW_ID_NONE){
        processSiteChange(false);
    }
    else{
        processSiteChange(true);
    }
});
// Detects when user changes sites within a tab
chrome.tabs.onUpdated.addListener(processSiteChange);
// Detects when user changes tabs within a window
chrome.tabs.onActivated.addListener(processSiteChange);

// Resets data every Sunday or every seven, or more, days
if (localStorage.getItem('lastReset')) {
    //localStorage.clear();
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
    console.log('New reset day is ' + weekStart);
}

// Checks to see if an object to collect the website data exists
if (localStorage.getItem('websiteDict')) {
    var websiteDict = JSON.parse(localStorage.getItem('websiteDict'));
    console.log('A websiteDict exists');
} else {
    var websiteDict = {};
    console.log('A new websiteDict was created');
}

// Process current site
function processSiteChange(isWindowActive) {
    // Gets url and hostname of current tab
    chrome.tabs.query({"active": true}, function(tabs) {
        if (tabs.length > 0 && tabs[0] != null && isWindowActive) {
            let url = tabs[0].url;
            try {
                let urlObject = new URL(url);
                var hostName = urlObject.hostname;
            } catch(e) {
                console.log('could not construct url');
            }
        } else {
            var hostName = 'undefined';
        }
        if (!(hostName in websiteDict)) {
            websiteDict[hostName] = [0,0,0,0,0,0,0];
        }
        // If there was a last website, program gets it. If not, program stores current site as the last website
        if (sessionStorage.getItem('lastWebsite') != null) {
            let lastWebsite = JSON.parse(sessionStorage.getItem('lastWebsite'));
            if (!(lastWebsite.website in websiteDict)) {
                websiteDict[lastWebsite.website] = [0,0,0,0,0,0,0];
            }
            let secondsPassed = (Date.now() - lastWebsite.timeStamp) / 1000;
            const currentDate = new Date();
            const dayOfTheWeek = currentDate.getDay();
            websiteDict[lastWebsite.website][dayOfTheWeek] = secondsPassed + websiteDict[lastWebsite.website][dayOfTheWeek];
            console.log(secondsPassed + ' added to ' + lastWebsite.website);

            // Data for time off of Chrome and on the time on a new tab is set to 0
            if (lastWebsite.website == 'undefined' || lastWebsite.website == 'newtab') {
                websiteDict[lastWebsite.website] = [0,0,0,0,0,0,0];
            }

            lastWebsite = {
                website: hostName,
                timeStamp: Date.now()
            }
            sessionStorage.setItem('lastWebsite', JSON.stringify(lastWebsite));
        } else {
            let lastWebsite = {
                website: hostName,
                timeStamp: Date.now()
            }
            sessionStorage.setItem('lastWebsite', JSON.stringify(lastWebsite));
        }
        // Sorting the array based on their values (time spent on a site)
        sortData(websiteDict);

        // Storing the website data
        localStorage.setItem('websiteDict', JSON.stringify(websiteDict));
        
        // Storing the array so popup.js can use it. Find more efficient way?
        localStorage.setItem('sortedWebDict', JSON.stringify(sortedWebDict));
    });
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