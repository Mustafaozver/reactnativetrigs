// Self.js - calls itself passing a bundle containing the 
// level (numeric value between 0 - 9) and displays another 
// title and text. 

// Also see: Parent.js, Child.js and GranChild.js

var TextView = Packages.android.widget.TextView;
var Menu = Packages.android.view.Menu;
var Toast = Packages.android.widget.Toast;
var Intent = Packages.android.content.Intent;
var Bundle = Packages.android.os.Bundle;

var bundleKey = "LEVEL";
var levelList = [ "FIRST", "SECOND", "THIRD", "FOURTH", 
    "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH" ];
    
var level = 0;

var optionsMenu;

function onCreate(bundle)
{
    // retrieve bundle indicating level
    level = Activity.getIntent().getExtras().getInt(bundleKey);
    Toast.makeText(Activity, "onCreate: level: " + level, Toast.LENGTH_SHORT).show();

    // build menu dynamically, last item only has quit action
    optionsMenu = (level < levelList.length -1) 
        ? [["Run " + levelList[level + 1] + " Activity", function() { startActivity(); }],
          ["Quit", function() { Activity.finish(); }]] 
        : [["Quit", function() { Activity.finish(); }]];
    
    var tvBody = new TextView(Activity);
    tvBody.setText( "\n"+ levelList[level] +" activity (see menu for options)." );
    
    Activity.setContentView(tvBody);
    Activity.setTitle("Self - " + levelList[level]);
}

function onActivityResult (requestCode, resultCode, data)
{
    Toast.makeText(Activity, 
        "onActivityResult: returned from " 
        + levelList[requestCode] + ", requestCode= " 
        + requestCode, 
        Toast.LENGTH_SHORT).show();
}

function onPrepareOptionsMenu(menu)
{
    menu.clear();

    for (var item = 0; item < optionsMenu.length; item++)
        menu.add(Menu.NONE,
            Menu.FIRST + item,
            Menu.NONE,
            optionsMenu[item][0]);

    return true;
}

function onOptionsItemSelected(item)
{
    optionsMenu[ item.getItemId() 
        - Menu.FIRST ][1]();

    return true;
}

function startActivity()
{
    var intent = new Intent();
    intent.setClassName(Activity, "com.rbowman.scriptit.lang.JsEval");
    intent.putExtra("Url", "scriptit://Samples/Self.js");

    var bundle = new Bundle();
    bundle.putInt(bundleKey, level + 1);
    intent.putExtras(bundle);
    
    Activity.startActivityForResult(intent, level + 1);
    
    // uncommenting the next line and resaving the script  
    // destroys the THIRD activity  while going to the 
    // FOURTH. Returns to SECOND activity.
//    if (level == 2) Activity.finish();
}

