// SetTheme.js

// Force theme to android.R.style.Theme_Holo_Light
//
// Also see: BlackOnWhite.js

var TextView = Packages.android.widget.TextView;
var Android_R = Packages.android.R;

function onCreate(bundle)
{
    Activity.setTheme(Android_R.style.Theme_Holo_Light);

    var tvBody = new TextView(Activity);
    tvBody.setText("\nBlack text on a white background.");

    Activity.setContentView(tvBody);

    Activity.setTitle("SetTheme");
}
