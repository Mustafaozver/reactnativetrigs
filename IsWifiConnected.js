// IsWifiConnected.js

var Context = Packages.android.content.Context;

function isWifiConnected() {
    
    var cm = Activity.getSystemService(Context.CONNECTIVITY_SERVICE);
    var netInfo = cm.getActiveNetworkInfo();
    if (netInfo != null && netInfo.isConnected()) {
        print ("network type: " + netInfo.getType());
        return true;
    }
    return false;
}

print ("Wifi connected: " + isWifiConnected());

