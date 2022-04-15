// Parent script

// parent-activity starts child-activity which starts
// grandchild-activity.

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
    var TEXT = "\nParent-activity calls child-activity (see menu)."; 

    var tvBody = new TextView(Activity);
    
    with (tvBody)
    {
        setTextSize(16);
        setTextColor(Color.WHITE);
        setText(TEXT);
    }
    Activity.setContentView(tvBody);

    Activity.setTitle("Parent Activity");

    Log.i(TAG, "Parent - Activity.onCreate");
}


function onActivityResult (requestCode, resultCode, data)
{
    if (requestCode == 1234)
        Toast.makeText(Activity, "Parent - Child Returned - requestCode=" + requestCode, Toast.LENGTH_SHORT).show();
}

var OPTIONS = 
    [["Run Child Activity", function() { startActivity(); }],
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
    intent.putExtra("Url", "scriptit://Samples/Child.js");
    Activity.startActivityForResult(intent, 1234);
}

