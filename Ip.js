// Ip.js

var TextView = Packages.android.widget.TextView;
var Context = Packages.android.content.Context;
var Formatter = Packages.android.text.format.Formatter;
var ConnectivityManager = Packages.android.net.ConnectivityManager;

function onCreate(bundle)
{        
    var tvBody = new TextView(Activity);
    tvBody.setText(getIp());
    
    Activity.setContentView(tvBody);
    Activity.setTitle("IP");
}

function getIp() 
{
    var netInfo = Activity
        .getSystemService(Context.CONNECTIVITY_SERVICE)
        .getActiveNetworkInfo();

    var isConnected = (netInfo != null && netInfo.isConnected());

    if (!isConnected)
        return "\nInternet not available.";

    var wifiNetInfo = Activity
        .getSystemService(Context.CONNECTIVITY_SERVICE)
        .getNetworkInfo(ConnectivityManager.TYPE_WIFI);

    if(!wifiNetInfo.isAvailable())
        return "\nWifi not available.";

    return "\nWifi IP: "
        + Formatter.formatIpAddress(Activity
            .getSystemService(Context.WIFI_SERVICE)
            .getConnectionInfo()
            .getIpAddress());
}

