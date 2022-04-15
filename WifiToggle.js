// WifiToggle.js

var Context = Packages.android.content.Context;

var wifiManager = Activity.getSystemService(Context.WIFI_SERVICE);

if (wifiManager.isWifiEnabled())
    wifiManager.setWifiEnabled(false);
else
    wifiManager.setWifiEnabled(true);
