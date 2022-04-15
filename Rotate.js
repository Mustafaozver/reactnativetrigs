// Rotate.js

// Rotate screen 90 degrees when touched

var TextView = Packages.android.widget.TextView;
var Context = Packages.android.content.Context;
var ActivityInfo = Packages.android.content.pm.ActivityInfo;

// when orientation is 0 - portrait, next orienation
// is 1 - landscape ...
var nextOrientation = [ 
    ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE,
    ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT,
    ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE,
    ActivityInfo.SCREEN_ORIENTATION_PORTRAIT];

function onCreate(bundle)
{
    var tvBody = TextView(Activity);
    
    tvBody.setText("\nClick to Rotate 90 degrees.");
    tvBody.setOnClickListener(function(view) { rotate(); });
    
    Activity.setContentView(tvBody);
    Activity.setTitle("Rotate Example");
}

function rotate()
{
    Activity.setRequestedOrientation(nextOrientation[
        Activity.getSystemService(Context.WINDOW_SERVICE)
            .getDefaultDisplay()
            .getOrientation()
    ]);
}

