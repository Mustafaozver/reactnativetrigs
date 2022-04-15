// MultipleChoice.js - show dialog which offers a 
// multiple-choice selection list.

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

    tvBody.setText("\nFrom the menu, select \"Multiple Choice\".");
    Activity.setTitle("Multiple Choice");
}

var OPTIONS = 
    [["Multiple Choice ...", function() { multipleChoice('Please select Colors', choiceList, choices); }],
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

var choicesDialog = null;

// default values: yellow is checked.
var choices = [false, false, true, false, false, false];
var decisions;

var choiceList = 
    ["Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Purple"];

function multipleChoice(title, listOfItems, selectedItems)
{
    // example: multipleChoice('Please select Colors', choiceList, choices);

    var decisions = selectedItems.slice(0);     // clone array.
        
    var AlertDialog = Packages.android.app.AlertDialog;

    with (new AlertDialog.Builder(Activity))
    {
        setTitle(title);
        setMultiChoiceItems(listOfItems, selectedItems, function(dialog, which, isChecked)
        {
            decisions[which] = isChecked;
        });
        
        setPositiveButton("OK", function() 
        { 
            choices = decisions;
            choicesDialog.dismiss(); 
        });
        
        choicesDialog = show();
    } 
}
