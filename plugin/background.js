// Checks to see if an object to collect the website data
// already exists. If not, an object is created.
if (localStorage.getItem('websiteDict')) {
    var websiteDict = JSON.parse(localStorage.getItem('websiteDict'));
    console.log('websiteDict does exist');
} else {
    var websiteDict = {};
    console.log('websiteDict does not exist');
};

var sortedWebDict = [];

// Detects when user clicks off of window
chrome.windows.onFocusChanged.addListener(function(windowId){
    if (windowId == chrome.windows.WINDOW_ID_NONE){
        processSiteChange();
        console.log('not active');
    }
    else{
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
                let urlObject = new URL(url);
                var hostName = urlObject.hostname;
                console.log(hostName);
            };
            if (!(hostName in websiteDict)) {
                websiteDict[hostName] = 0;
            }
            // If there was a last website, program gets it. If not, program stores current site as the last website
            if (localStorage.getItem('lastWebsite') != null) {
                let lastWebsite = JSON.parse(localStorage.getItem('lastWebsite'));
                if (!(lastWebsite.website in websiteDict)) {
                    websiteDict[lastWebsite.website] = 0;
                }
                // When user closes Chrome, program attempts to put
                // the amount of time the user is off into something.
                // This if statement removes it from the dictionary.
                if (typeof lastWebsite.website == 'undefined') {
                    delete websiteDict[lastWebsite.website];
                }
                let secondsPassed = (Date.now() - lastWebsite.timeStamp) / 1000;
                console.log(secondsPassed);
                websiteDict[lastWebsite.website] = secondsPassed + websiteDict[lastWebsite.website];
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
            sortedWebDict = Object.keys(websiteDict).map(function (key) {
                return [key, websiteDict[key]];
            });
            sortedWebDict.sort(function(first, second) {
                return second[1] - first[1];
            });
            console.log(sortedWebDict);

            // Storing array so popup.js can use it. Find more efficient way?
            localStorage.setItem('sortedWebDict', JSON.stringify(sortedWebDict));
            //localStorage.clear();
    });
};