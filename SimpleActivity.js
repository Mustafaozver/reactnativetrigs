// SimpleActivity.js uses load command to
// establish references to Android packages

load ("scriptit://Modules/Widgets.js");

var TAG = "JS_ACTIVITY";

function onCreate(bundle)
{
    var TEXT = "\nThis simple activity loads Android"
        + " package references using the load() command";

    var tvBody = new TextView(Activity);

    with (tvBody)
    {
        setTextSize(16);
        setTextColor(Color.WHITE);
        setText(TEXT);
    }

    Activity.setContentView(tvBody);
    Activity.setTitle("Simple Activity");

    Log.i(TAG, "Activity.onCreate");
}


function onDestroy()
{
    Log.i(TAG, "Activity.onDestroy");
}
 
var OPTIONS = 
    [["About", function() { about(); }],
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

function about()
{
    var TEXT = "Description of what this program "
        + "does, the authors name, etc.";

    with (new AlertDialog.Builder(Activity))
    {
        setTitle("About");
        setMessage(TEXT);
        setPositiveButton("OK", function() { });
        show();
    }
}

