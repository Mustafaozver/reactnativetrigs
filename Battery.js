// Battery.js - Monitors battery state changes

var TextView = Packages.android.widget.TextView;
var Toast = Packages.android.widget.Toast;
var Intent = Packages.android.content.Intent;
var IntentFilter = Packages.android.content.IntentFilter;
var BatteryManager = Packages.android.os.BatteryManager;
var JsBroadcastReceiver = Packages.com.rbowman.scriptit.lang.JsBroadcastReceiver;

var receiver = null;
var tvBody = null;

function onCreate(bundle)
{
    tvBody = new TextView(Activity);
    Activity.setContentView(tvBody);
    Activity.setTitle("Battery");
    
    initReceiver();
}

function onResume()
{
    Activity.registerReceiver(receiver, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
}

function onPause()
{
    Activity.unregisterReceiver(receiver);
}

health_status = ["",
    "unknown",
    "good",
    "overheat",
    "dead",
    "over voltage",
    "unspecified failure",
    "cold"];

plugged_status = ["",
    "AC",
    "USB"];

battery_status = ["",
    "unknown",
    "charging",
    "discharging",
    "not charging",
    "full"];

function initReceiver()
{
    receiver = new JsBroadcastReceiver();
    receiver.setOnReceiveHandler(function (context, intent) 
    {
        var health = intent.getIntExtra(BatteryManager.EXTRA_HEALTH,0);
        var level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL,0);
        var plugged = intent.getIntExtra(BatteryManager.EXTRA_PLUGGED,0);
        var isPresent = intent.getExtras().getBoolean(BatteryManager.EXTRA_PRESENT); 
        var scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE,0);
        var status = intent.getIntExtra(BatteryManager.EXTRA_STATUS,0);
        var technology = intent.getExtras().getString(BatteryManager.EXTRA_TECHNOLOGY);
        var temperature = intent.getIntExtra(BatteryManager.EXTRA_TEMPERATURE,0);
        var voltage = intent.getIntExtra(BatteryManager.EXTRA_VOLTAGE,0);
        
        tvBody.setText( 
            "\n Health:  " + health_status[health]
            + "\n Level:  " + level
            + "\n Plugged:  " + plugged_status[plugged]
            + "\n Present:  " + isPresent
            + "\n Scale:  " + scale
            + "\n Status:  " + battery_status[status]
            + "\n Technology:  " + technology
            + "\n Temperature:  " + parseFloat(temperature) / 10.0 + " ºC"
            + "\n Voltage:  " + parseFloat(voltage) / 1000.0 + " V");
        
        Toast.makeText(Activity, "Battery info updated",  Toast.LENGTH_SHORT).show();
    });
}
