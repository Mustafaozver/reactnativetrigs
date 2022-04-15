// Global.js

// Demonstrates using the global hashtable
// which persists until ScriptIt is unloaded.
//
// Ideal for storing data persisting between 
// activities.
// 
// global access methods
// 
// global.put(key, value) - adds/update key with value
// global.get(key) - returns value
// global.contains(key) - returns true if key exists
// global.keySet() - returns a keyset
// global.remove(key) - removes key/value 
// global.clear() - clears global hashmap
// global.size() - returns number elements in hashmap
// global.isEmpty() - returns true if empty

var Toast = Packages.android.widget.Toast;
var Menu = Packages.android.view.Menu;

var etKey = null;
var etValue = null;

function initContentView() 
{
    // Lab1 layout, edit at your own risk. 
    // Note: tvBody, llEdits, et1, et2, llButtons
    // bt1, bt2, bt3 and bt4 are globally scoped.

    var R = Packages.com.rbowman.scriptit.R;
    var LinearLayout = Packages.android.widget.LinearLayout;
    var TextView = Packages.android.widget.TextView;
    var EditText = Packages.android.widget.EditText;
    var Button = Packages.android.widget.Button;

    Activity.setContentView(R.layout.lab1);
    tvBody = TextView(Activity.findViewById(R.id.tv_body));
    llEdits =  LinearLayout(Activity.findViewById(R.id.ll_edits));
    et1 = EditText(Activity.findViewById(R.id.et1));
    et2 = EditText(Activity.findViewById(R.id.et2));
    llButtons =  LinearLayout(Activity.findViewById(R.id.ll_buttons));
    bt1 = Button(Activity.findViewById(R.id.bt1));
    bt2 = Button(Activity.findViewById(R.id.bt2));
    bt3 = Button(Activity.findViewById(R.id.bt3));
    bt4 = Button(Activity.findViewById(R.id.bt4));
}

function onCreate(bundle)
{
    initContentView();

    // convenience nicer-named variables - also
    // could have modified in the initContentView
    // but if that method is ever changed via the
    // layout command then all edits are lost.
    etKey = et1;
    etValue = et2;

    etKey.setHint("Key");
    etKey.setText("");

    etValue.setHint("Value");
    etValue.setText("");

    bt1.setText("Put");
    bt1.setOnClickListener(function(view)
    { 
        if (etKey.getText().length() == 0)
        { 
            Toast.makeText(Activity, "No key specified", Toast.LENGTH_SHORT).show();
            return
        }

        if (etValue.getText().length() == 0) 
        {
            Toast.makeText(Activity, "No value specified", Toast.LENGTH_SHORT).show();
            return
        }

        global.put(etKey.getText(), etValue.getText());
        printGlobals();
    });

    bt2.setText("Remove");
    bt2.setOnClickListener(function(view)
    { 
        if (etKey.getText().length() == 0)
        {
            Toast.makeText(Activity, "No key specified", Toast.LENGTH_SHORT).show();
            return
        }

        global.remove(etKey.getText());
        printGlobals();
    });

    bt3.setText("Find");
    bt3.setOnClickListener(function(view)
    { 
        if (etKey.getText().length() == 0) 
        {
            Toast.makeText(Activity, "No key specified", Toast.LENGTH_SHORT).show();
            return
        }

        Toast.makeText(Activity, "global does " 
            + ((global.containsKey(etKey.getText())) ? "" : "NOT ")
            + " have the key \"" + etKey.getText() + "\"", Toast.LENGTH_SHORT).show();
    });

    bt4.setText("Clear All");
    bt4.setOnClickListener( function(view)
    { 
        global.clear();
        printGlobals();
    });


    Activity.setTitle("Global");

    printGlobals();    
}

function printGlobals()
{
    if (global.size() == 0)
    {
        tvBody.setText("\nglobal is empty.\n\nSelect options menu and choose Populate to places items into global.");
    }
    else 
    {
        var keySet = global.keySet().toArray().sort();
        var data = "";
        
        for (var i = 0; i < keySet.length; i++)
        {
            data += "\n[" + keySet[i] + "] = " + global.get(keySet[i]);   
        }
       tvBody.setText(data);
    }
}

var options = 
    [["Populate", function() { populateGlobal(); }]];

function onPrepareOptionsMenu(menu)
{
    menu.clear();

    for (var item = 0; item < options.length; item++)
        menu.add(Menu.NONE, 
            Menu.FIRST + item, 
            Menu.NONE, 
            options[item][0]);

    return true;
}

function onOptionsItemSelected(item)
{
    options[ item.getItemId() 
        - Menu.FIRST ][1]();

    return true;
}

function populateGlobal()
{
    global.put("splash", "loaded with errors");
    global.put("user", "alice");
    global.put("password", "dontAskTheWhiteRabbit");
    global.put("days", "monday, tuesday ...");
    global.put("abbrev", "etc. vic. sic.");
    global.put("abbrev", "etc. vic. sic.");
    global.put("first", "item #1");
    global.put("second", "item #2");
    global.put("third", "item #3");
    global.put("fourth", "item #4");
    global.put("fifth", "item #5");
    global.put("sixth", "item #6");

    printGlobals();
}

