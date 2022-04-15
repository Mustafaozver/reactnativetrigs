// Versions.js

// print API level, Build date, version name, code etc.

var TextView = Packages.android.widget.TextView;
var Build = Packages.android.os.Build;

function onCreate(bundle)
{
    var text = "\nAndroid API Level: " + Build.VERSION.SDK_INT
        + "\n\nScriptIt Build: " + BUILD_DATE
        + "\nScriptIt Version Name: " + VERSION_NAME
        + "\nScriptIt Version Code: " + VERSION_CODE
        + "\n\nJavaScript Version: " + LANG_VERSION;
        
    var tvBody = new TextView(Activity);
    tvBody.setTextSize(16);
    tvBody.setText(text);

    Activity.setContentView(tvBody);

    Activity.setTitle("Versions");
}



