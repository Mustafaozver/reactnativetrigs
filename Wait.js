// Wait.js

// Performs wait(milliseconds) command which blocks
// execution until time expires. 
//
// Note: wait command will not cause an Android
// Non-Response (ANR) as it implements the
// handler/runnable/looper pattern.

function zeroPad(str) { return ("0" + str).slice(-2); } 

function getDatetime()
{
    var date = new Date();
    return date.getFullYear()
        + "-"
        + zeroPad((date.getMonth() + 1).toString())
        + "-"
        + zeroPad(date.getDate().toString())
        + " "
        + zeroPad(date.getHours().toString())
        + ":"
        + zeroPad(date.getMinutes().toString())
        + ":"
        + zeroPad(date.getSeconds().toString()); 
}

function getElapsedSeconds (dt) { return (new Date() - dt) /1000.0; }

var now = new Date();

print(getDatetime() + " ------------------");
wait(2000);
print(getDatetime() + " after 2 second wait");
wait(4000);
print(getDatetime() + " after 4 second wait");

print (getDatetime() + " elapsed: " + getElapsedSeconds(now) + " seconds");

