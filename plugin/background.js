var sortedWebDict = [];

// Resets data every seven, or more, days
let currentDate = new Date();
if (localStorage.getItem('lastReset')) {
    let lastReset = JSON.parse(localStorage.getItem('lastReset'));
    if (currentDate >= lastReset.date + 7) {
        localStorage.clear();
        lastReset.date = new Date();
        localStorage.setItem('lastReset', JSON.stringify(lastReset));
        console.log('Last reset was more than a week ago');
    } else {
        console.log('Last reset was less than a week ago');
    }
} else {
    let lastReset = {
        date: new Date()
    }
    localStorage.setItem('lastReset', JSON.stringify(lastReset));
    console.log('A reset date does not exist');
}

// Checks to see if an object to collect the website data exists
if (localStorage.getItem('websiteDict')) {
    var websiteDict = JSON.parse(localStorage.getItem('websiteDict'));
    console.log('websiteDict does exist');
} else {
    var websiteDict = {};
    console.log('websiteDict does not exist');
};

// Detects when user clicks off of window
chrome.windows.onFocusChanged.addListener(function(windowId){
    if (windowId == chrome.windows.WINDOW_ID_NONE){
        processSiteChange();
        console.log('not active');
    }
    else {
        processSiteChange();
        console.log('active');
    }
});

// Detects when user changes sites within a tab
chrome.tabs.onUpdated.addListener(function() {
    processSiteChange();
});

// Detects when user changes tabs within a window
chrome.tabs.onActivated.addListener(processSiteChange);

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

            // Storing the website data
            localStorage.setItem('websiteDict', JSON.stringify(websiteDict));

            // Sorting the array based on their values (time spent on a site)
            //sortData(websiteDict);

            // Storing the array so popup.js can use it. Find more efficient way?
            localStorage.setItem('sortedWebDict', JSON.stringify(sortedWebDict));

            //localStorage.clear();
    });
};

// Needs to be updated
function sortData(unsortedDict) {
    sortedWebDict = Object.keys(unsortedDict).map(function (key) {
        return [key, unsortedDict[key]];
    });
    sortedWebDict.sort(function(first, second) {
        return second[1] - first[1];
    });
    console.log(sortedWebDict);
};