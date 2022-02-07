function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    let objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );

    // Create an array to hold our data. Give the array
    // a default empty first row.
    let arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    let arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        let strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        let strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

function generateDates(currentSchedule) {
    let todaysClasses = [];

    const today = new Date();
        //console.log(currentSchedule)
    for (let i = 0; i< currentSchedule.length; i++){
        todaysClasses.push([currentSchedule[i][0], new Date(today.getFullYear(), today.getMonth(), today.getDate() + dateModifier(currentSchedule[i][3], today.getDay()) , currentSchedule[i][2].split(':')[0], currentSchedule[i][2].split(':')[1])])

    }
    return todaysClasses;
}

function dateModifier(targetDay, currentDay){
    //console.log(targetDay - currentDay)
    if (targetDay < currentDay) {
        return ( targetDay - currentDay + 7)
    } else {
        return (targetDay - currentDay)
    }
}


function updateGoalDate(todaysClasses){
    const today = new Date();
    let currentSoonest = Number.MAX_SAFE_INTEGER;
    let currentSoonestReturn;
    for (let i = 0; i < todaysClasses.length; i++) {
        if (((todaysClasses[i][1] - today.getTime()) > 0) && ((todaysClasses[i][1] - today.getTime()) < currentSoonest)) {
            currentSoonestReturn = todaysClasses[i];
            currentSoonest = (todaysClasses[i][1] - today.getTime())
        }
    }
    return currentSoonestReturn;
}

function getModule(todaysClasses){
    alert(updateGoalDate(todaysClasses)[0])
}


var currentSchedule = (CSVToArray('CM20315,09:15,10:05,1\n' +
'CM20314,14:15,16:05,1\n' +
'CM20316,16:15,17:05,1\n' +
'CM20314,10:15,11:05,2\n' +
'CM20315,11:15,12:05,2\n' +
'CM20316,14:15,15:05,2\n' +
'CM20317,11:15,12:05,3\n' +
'CM20314,09:15,10:05,4\n' +
'CM20315,10:15,11:05,4\n' +
'CM20316,13:15,14:05,4\n' +
'CM20317,14:15,15:05,4\n' +
'CM20317,09:15,11:05,5'))

    




let todaysClasses = generateDates(currentSchedule);
const year = new Date().getFullYear();
// countdown
let moduleDateArray;
setInterval(function() {

    // get today's date
    const today = new Date().getTime();

    if (moduleDateArray == null){
        moduleDateArray = updateGoalDate(generateDates(currentSchedule))
    }
    // get the difference
    let diff = moduleDateArray[1] - today;

    if (diff < 0) {
        moduleDateArray = updateGoalDate(generateDates(currentSchedule))
        diff = moduleDateArray[1] - today;
    }
    //console.log(moduleDateArray)
    // math
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // display
    document.getElementById("days").innerHTML=days;
    document.getElementById("hours").innerHTML=hours;
    document.getElementById("minutes").innerHTML=minutes;
    document.getElementById("seconds").innerHTML=seconds;
}, 1);
