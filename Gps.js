// Gps.js - get latitude and longitude 
// reverse geocode to street-address

var TextView = Packages.android.widget.TextView;
var Menu = Packages.android.view.Menu;
var Toast = Packages.android.widget.Toast;
var Location = Packages.android.location.Location;
var LocationManager = Packages.android.location.LocationManager;
var Context = Packages.android.content.Context;
var Criteria = Packages.android.location.Criteria;
var Geocoder = Packages.android.location.Geocoder;
var Locale = Packages.java.util.Locale;
var ClipData = Packages.android.content.ClipData;

var tvBody = null;
var locationManager = null;
var provider = null;
var lat = null;
var lng = null;
var updateCount = 0;

function onCreate(bundle)
{
    var text = "\nFinding current location ...";

    tvBody = new TextView(Activity);
    tvBody.setTextSize(16);
    tvBody.setText(text);
    tvBody.setOnClickListener(function(view) { copyToClipboard(); });
    
    Activity.setContentView(tvBody);

    Activity.setTitle("GPS");
    
    locationManager = Activity.getSystemService(Context.LOCATION_SERVICE);
    var criteria = new Criteria();
    provider = locationManager.getBestProvider(criteria, false);
    var location = locationManager.getLastKnownLocation(provider);
}

function onResume() 
{
    locationManager.requestLocationUpdates(provider, 400, 1, Activity);
}

function onPause() 
{
    locationManager.removeUpdates(Activity);
}

function onLocationChanged(location) 
{
    lat = location.getLatitude();
    lng = location.getLongitude();
    updateCount++;
    
    var text = "\nCoordinates:"
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
    
    text = text + "\n\nUpdateCount: " + updateCount
        + "\n\n[Touch to copy]\n";
    
    tvBody.setText(text);
}

function copyToClipboard()
{
    var clipboardManager = Activity.getSystemService(Context.CLIPBOARD_SERVICE); 
    var clip = ClipData.newPlainText("GPS data", tvBody.getText());
    clipboardManager.setPrimaryClip(clip);
    
    Toast.makeText(Activity, "Information copied to Clipboard.", Toast.LENGTH_SHORT).show();
}