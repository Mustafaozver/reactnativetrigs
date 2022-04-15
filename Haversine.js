// Demonstrates the JavaScript built-in Math library.

// Calculate distance from Los Angeles to Manhattan using
// the Haversine Formula

// Author: Andrew Hedges, andrew(at)hedges(dot)name

var Rm = 3961; // mean radius of the earth (miles) at 39 degrees from the equator

// Los Angeles, CA
var ca_lat = 34.0522300;
var ca_lon = -118.243680;

// Manhattan, NY
var ny_lat = 40.783435;
var ny_lon = -73.966249;

function calcDistance(lat1, lon1, lat2, lon2)
{
    // convert coordinates to radians
    lat1 = deg2rad(lat1);
    lon1 = deg2rad(lon1);
    lat2 = deg2rad(lat2);
    lon2 = deg2rad(lon2);

    // find the differences between the coordinates
    dlat = lat2 - lat1;
    dlon = lon2 - lon1;

    // here's the heavy lifting
    a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
    c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
    dm = c * Rm; // great circle distance in miles

    // round the results down to the nearest 1/1000
    mi = round(dm);

    return mi;		
}

// convert degrees to radians
function deg2rad(deg) {
    rad = deg * Math.PI/180; // radians = degrees * pi/180
    return rad;
}
	
// round to the nearest 1/1000
function round(x)
{
    return Math.round( x * 1000) / 1000;
}

print (
    "Distance from Los Angeles ("
    + ca_lat, ", " + ca_lon + ") to Manhattan ("
    + ny_lat, ", " + ny_lon + ") is "
    + calcDistance(ca_lat, ca_lon, ny_lat, ny_lon) + " miles");

// review output in console

