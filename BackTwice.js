// BackTwice.js

// Handles back key

var TextView = Packages.android.widget.TextView;
var Toast = Packages.android.widget.Toast;
var KeyEvent = Packages.android.view.KeyEvent;

var count = 0;

function onCreate(bundle)
{
    var tvBody = new TextView(Activity);

    tvBody.setText("\nHandles onBackPressed which controls exiting.");

    Activity.setContentView(tvBody);
    Activity.setTitle("BackTwice");
}

function onBackPressed()
{
    if (count == 0)
    {
        Toast.makeText(Activity, "Press BACK again to exit", Toast.LENGTH_SHORT).show();
        count++;
        return true;
    }
    return false;
}

