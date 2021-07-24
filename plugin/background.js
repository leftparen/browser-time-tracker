var previousTab = '';

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
        //console.log(hostName);
        console.log(new Date());
        previousTab = hostName;
        console.log(previousTab)
    });
}