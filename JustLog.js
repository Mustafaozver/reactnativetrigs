// JustLog.js

var Log = Packages.android.util.Log;
var Toast = Packages.android.widget.Toast;

var TAG = "JS_JUSTLOG";

Log.i(TAG, "--------------------------");
Log.i(TAG, "      JUSTLOG");
Log.i(TAG, "--------------------------");

Toast.makeText(Activity, "Please check the log", Toast.LENGTH_SHORT).show();

