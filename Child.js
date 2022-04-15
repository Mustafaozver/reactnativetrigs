// Child.js - calls GrandChild.js

// Also see: Self.js

var TextView = Packages.android.widget.TextView;
var Color = Packages.android.graphics.Color;
var Menu = Packages.android.view.Menu;
var Toast = Packages.android.widget.Toast;
var Log = Packages.android.util.Log;
var Intent = Packages.android.content.Intent;

var TAG = "JS_PARENT";

function onCreate(bundle)
{
    var TEXT = "\nChild-activity calls grandchild-activity (see menu)."; 

    var tvBody = new TextView(Activity);
    
    with (tvBody)
    {
        setTextSize(16);
        setTextColor(Color.WHITE);
        setText(TEXT);
    }
    Activity.setContentView(tvBody);

    Activity.setTitle("Child Activity");

    Log.i(TAG, "Child - Activity.onCreate");
}


function onActivityResult (requestCode, resultCode, data)
{
    if (requestCode == 7890)
        Toast.makeText(Activity, "Child - GrandChild Returned - requestCode=" + requestCode, Toast.LENGTH_SHORT).show();
}

var OPTIONS = 
    [["Run GrandChild Activity", function() { startActivity(); }],
    ["Quit", function() { Activity.finish(); }]];

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


function startActivity()
{
    var intent = new Intent();
    intent.setClassName(Activity, "com.rbowman.scriptit.lang.JsEval");
    intent.putExtra("Url", "scriptit://Samples/GrandChild.js");
    Activity.startActivityForResult(intent, 7890);
}


