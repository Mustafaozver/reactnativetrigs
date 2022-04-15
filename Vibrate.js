// Vibrate.js

var TextView = Packages.android.widget.TextView;
var Context = Packages.android.content.Context;
var Vibrator = Packages.android.os.Vibrator;
var Toast = Packages.android.widget.Toast;

var vibrator = null;

function onCreate(bundle)
{
    var text = "\nVibrate example - exit to cancel vibrating";

    var tvBody = new TextView(Activity);
    tvBody.setTextSize(16);
    tvBody.setText(text);

    Activity.setContentView(tvBody);
    Activity.setTitle("Vibrate");
}

var vibration_pattern = [ 0, 200, 500 ];

function onResume()
{
    vibrator = Activity.getSystemService(Context.VIBRATOR_SERVICE);
    vibrator.vibrate(vibration_pattern, 0);
    Toast.makeText(Activity, "Vibration pattern= " + vibration_pattern, Toast.LENGTH_LONG).show();
}

function onPause()
{
    vibrator.cancel();
    Toast.makeText(Activity, "Vibration cancelled!!", Toast.LENGTH_LONG).show();
}
