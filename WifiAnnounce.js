// WifiAnnouce.js

// Announces network status of white-listed (desired) SSIDs

var TextView = Packages.android.widget.TextView;
var JsBroadcastReceiver = Packages.com.rbowman.scriptit.lang.JsBroadcastReceiver;
var IntentFilter = Packages.android.content.IntentFilter;
var Context = Packages.android.content.Context;
var WifiManager = Packages.android.net.wifi.WifiManager;
var TextToSpeech = Packages.android.speech.tts.TextToSpeech;
var Toast = Packages.android.widget.Toast;

var receiver = null;
var wifiManager = null;
var tts = null;
var tvBody = null;

// Place WiFi SSIDs into this array and as they will be announced
// as they come up and go down.
var whiteList = 
    ["Starbucks", 
    "BowmanNexus6"];

var WiFiDict = {};

var WIFI_DOWN = 0;      // Wifi down state
var WIFI_UP = 1;        // Wifi up state
var WIFI_STILL_UP = 2;  // Wifi is still up and don't announce.

function onCreate(bundle)
{
    tvBody = new TextView(Activity);

    tvBody.setText("\nScanning...");

    tvBody.setOnClickListener(function(view)
    {
        WiFiDict = {};
    });

    Activity.setContentView(tvBody);
    Activity.setTitle("Wifi Announce");

    tts = new TextToSpeech(Activity, function(status) {});

    wifiManager = Activity.getSystemService(Context.WIFI_SERVICE);
}

function onResume()
{
    WiFiDict = {};

    initReceiver();

    Activity.registerReceiver(receiver, 
        new IntentFilter(WifiManager.SCAN_RESULTS_AVAILABLE_ACTION));

    wifiManager.startScan();
}

function onPause()
{
    Activity.unregisterReceiver(receiver);
    receiver = null;
}

function onDestroy()
{
    if(tts != null)
    {
        tts.stop();
        tts.shutdown();
    }
} 

function initReceiver()
{
    receiver = new JsBroadcastReceiver();
    receiver.setOnReceiveHandler(function (context, intent) 
    {
        var wifiScanList = wifiManager.getScanResults();
        var txtStatus = "";

        for(var i = 0; i < wifiScanList.size(); i++)
        {
            var ssid = wifiScanList.get(i).SSID
            txtStatus += "\n" + ssid;
            
            if (inWhiteList(ssid))
                setWifiFound(ssid);
        }
        
        tvBody.setText("\nFound these " + wifiScanList.size()
            + " networks:\n" + txtStatus);
        
        wifiAnnounceChanges();
            
        delayThenRefresh();
   });
}

function delayThenRefresh()
{
    var Handler = Packages.android.os.Handler;

    (new Handler())
        .postDelayed(function ()
    {
        if (receiver != null)
        {
            tvBody.setText("\nScanning...");
            wifiManager.startScan();
        }
    }, 15000);    // delay 15 seconds.
}

function say(message)
{
    tts.speak(message, TextToSpeech.QUEUE_ADD, null);
    
    Toast.makeText(Activity, 
        message, 
        Toast.LENGTH_SHORT).show(); 
}

function setWifiFound(key)
{
    // if ssid exists then set as still-up
    if(WiFiDict.hasOwnProperty(key))
        WiFiDict[key] = WIFI_STILL_UP;
    else
        WiFiDict[key] = WIFI_UP;
}

function inWhiteList(key)
{
    // ignore empty ssids
    if (key.trim().length == 0)
        return false;
        
    for	(i = 0; i < whiteList.length; i++)
    {
        if (whiteList[i].indexOf(key) != -1)
            return true;
    }
    
    return false;
}

function wifiAnnounceChanges()
{
    for(key in WiFiDict)
    {
        if (WiFiDict[key] == WIFI_UP)
            say("access point " + key + " is up");
        else if (WiFiDict[key] == WIFI_DOWN)
        {
            // announce and remove from wifi-dictionary
            say("access point " + key + " is down");
            delete WiFiDict[key];
        }
    }    

    // existing wifi ssids are set as down.
    for(key in WiFiDict)
            WiFiDict[key] = WIFI_DOWN;
}
