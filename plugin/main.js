const {google} = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);


client.authorize(function(err){

    if(err) {
        console.log(err);
        return;
    } else {
        console.log('Connected!');
        gsrun(client);
    }

});


async function gsrun(cl){

    const gsapi = google.sheets({version: 'v4', auth: cl });

    const opt = {
        spreadsheetId: '1RyHsNcYuVSbcAahR0ugzujrBQKA92rZlZMjQG-4TZrE',
        range: 'A2:B5'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;
    let newDataArray = dataArray.map(function(r) {
        r.push(r[0] + '-' + r[1]);
        return r;
    });

    const updateOptions = {
        spreadsheetId: '1RyHsNcYuVSbcAahR0ugzujrBQKA92rZlZMjQG-4TZrE',
        range: 'E2',
        valueInputOption: 'USER_ENTERED',
        resource: { values: newDataArray }
    };

    let res = await gsapi.spreadsheets.values.update(updateOptions);

    console.log(res);


}