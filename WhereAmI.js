// WhereAmI.js

var Location = Packages.android.location.Location;
var Context = Packages.android.content.Context;
var Criteria = Packages.android.location.Criteria;
var Geocoder = Packages.android.location.Geocoder;
var Locale = Packages.java.util.Locale;

locationManager = Activity.getSystemService(Context.LOCATION_SERVICE);
var criteria = new Criteria();
provider = locationManager.getBestProvider(criteria, false);
var location = locationManager.getLastKnownLocation(provider);

if (location != null)
{
    lat = location.getLatitude();
    lng = location.getLongitude();

    var text = "\n---------------------------" 
        + "\nCoordinates:"
        + "\nlatitude: " + lat
        + "\nlongitude: " + lng;
            
    // reverse geocode lat/long to street-address
    var geocoder = new Geocoder(Activity, Locale.getDefault());
    var addresses = geocoder.getFromLocation(lat, lng, 1);

    if ((addresses != null) && (addresses.size() > 0))
    {
        var address = addresses.get(0);
        
        text = text + "\n\nAddress:\n" + (address.getMaxAddressLineIndex() > 0 ? address.getAddressLine(0) : "")
            + ", " + address.getLocality()
            + ", " + address.getCountryName();
    }
    
    print (text);
}
else
    print ("No location available.");
