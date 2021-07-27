// The popup works. Display shows 0.0001 sometimes
// because the array hasn't been sorted at that particular moment.
// Therefore, the newest entry is always first, or in array[0][1].

let sortedDict = JSON.parse(localStorage.getItem('sortedWebDict'));

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('siteOne').innerHTML = sortedDict[0][0];
    document.getElementById('timeOnSiteOne').innerHTML = sortedDict[0][1];

    document.getElementById('siteTwo').innerHTML = sortedDict[1][0];
    document.getElementById('timeOnSiteTwo').innerHTML = sortedDict[1][1];

    document.getElementById('siteThree').innerHTML = sortedDict[2][0];
    document.getElementById('timeOnSiteThree').innerHTML = sortedDict[2][1];
 });