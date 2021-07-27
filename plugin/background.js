var websiteDict = {};
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
        let url = tabs[0].url;
        let urlObject = new URL(url);
        let hostName = urlObject.hostname;
        console.log(hostName);
        if (!(hostName in websiteDict)){
            websiteDict[hostName] = 0;
        }

        // If there was a last website, program gets it. If not, program stores current site as the last website
        if (localStorage.getItem('lastWebsite') != null) {
            let lastWebsite = JSON.parse(localStorage.getItem('lastWebsite'));
            if (!(lastWebsite.website in websiteDict)){
                websiteDict[lastWebsite.website] = 0;
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
    });
}