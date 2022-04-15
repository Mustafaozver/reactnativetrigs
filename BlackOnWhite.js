// BlackOnWhite.js

// Also see: SetTheme.js

var TextView = Packages.android.widget.TextView;
var Color = Packages.android.graphics.Color;

function onCreate(bundle)
{
    var output = "\nBlack text on a white background."; 

    var tvBody = new TextView(Activity);

    with (tvBody)
    {
        setTextSize(16);
        setBackgroundColor(Color.WHITE);
        setTextColor(Color.BLACK);
        setText(output);
    }

    Activity.setContentView(tvBody);
    Activity.setTitle("Black on white");
}
