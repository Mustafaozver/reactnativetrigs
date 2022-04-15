// SingleChoice.js - show dialog which offers a single-choice
// selection list.

function initContentView() 
{
    // Text1 layout, edit at your own risk. 
    // Note: tvBody variable is globally scoped.

    var R = Packages.com.rbowman.scriptit.R;
    var TextView = Packages.android.widget.TextView;

    Activity.setContentView(R.layout.text1);
    tvBody = TextView(Activity.findViewById(R.id.tv_body));
}

function onCreate(bundle)
{
    initContentView();

    tvBody.setText("\nFrom the menu, select \"Single Choice\".");

    Activity.setTitle("Single Choice");
}


 
var OPTIONS = 
    [["Single Choice...", function() { singleChoice('Please select a Color', choiceList, choice); }],
    ["Quit", function() { Activity.finish(); }]];

function onPrepareOptionsMenu(menu)
{
    var Menu = Packages.android.view.Menu;

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
    var Menu = Packages.android.view.Menu;

    OPTIONS[ item.getItemId() 
        - Menu.FIRST ][1]();

    return true;
}

var choice = 0;
var choiceDialog = null;

var choiceList = 
    ["Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Purple"];

function singleChoice(title, listOfItems, selected)
{
    // example: chooseItem("Please select a Color", choiceList, choice);
    
    var AlertDialog = Packages.android.app.AlertDialog;

    with (new AlertDialog.Builder(Activity))
    {
        setTitle(title);
        setSingleChoiceItems(listOfItems, selected, function(dialog, which)
        {
            choice = which;
            choiceDialog.dismiss();     
        });
        
        choiceDialog = show();
    } 
}
