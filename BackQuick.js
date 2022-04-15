// BackQuick.js

// The BACK key must be pressed twice and within 2 seconds. 

var TextView = Packages.android.widget.TextView;
var Toast = Packages.android.widget.Toast;
var KeyEvent = Packages.android.view.KeyEvent;

var canExit = false;

function onCreate(bundle)
{
    var tvBody = new TextView(Activity);

    tvBody.setText("\nthe BACK must be pressed twice and with 2 seconds.");

    Activity.setContentView(tvBody);
    Activity.setTitle("BackQuick");
}

function onBackPressed()
{
    if (!canExit)
    {
        Toast.makeText(Activity, "Press BACK again to exit", Toast.LENGTH_SHORT).show();
        canExit = true;
        expireCanExit();
        return true;
    }
    return false;
}

function expireCanExit()
{
    var Handler = Packages.android.os.Handler;

    (new Handler())
        .postDelayed(function ()
    {
        canExit = false;
    }, 2000);   // allow 2 seconds before canExit cancelled.
}
