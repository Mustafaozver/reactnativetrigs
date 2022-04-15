// GrandChild.Js

// Also see: Self.js

var TextView = Packages.android.widget.TextView;
var Color = Packages.android.graphics.Color;
var Menu = Packages.android.view.Menu;
var Toast = Packages.android.widget.Toast;
var Log = Packages.android.util.Log;
var Intent = Packages.android.content.Intent;

var TAG= "JS_PARENT";

function onCreate(bundle)
{
    var TEXT = "\nGrandChild-activity - end of the line (see menu)."; 

    var tvBody = new TextView(Activity);
    with (tvBody)
    {
        setTextSize(16);
        setTextColor(Color.WHITE);
        setText(TEXT);
    }
    Activity.setContentView(tvBody);

    Activity.setTitle("GrandChild Activity");

    Log.i(TAG, "GrandChild - Activity.onCreate");
}


function onActivityResult (requestCode, resultCode, data)
{
}

var OPTIONS = 
    [["Quit", function() { Activity.finish(); }]];

function onPrepareOptionsMenu(menu)
{
    menu.clear();

    for (var item = 0; item < OPTIONS.length; item++)
        menu.add(Menu.NONE, 
            Menu.FIRST + item, 
            Menu.NONE, 
            OPTIONS[item][0]);

    return true;
}

function onOptionsItemSelected(item)
{
    OPTIONS[ item.getItemId() 
        - Menu.FIRST ][1]();

    return true;
}

