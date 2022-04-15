// Url_IO.js

// Demonstrates simple file input/output
// using JsUrl of readString, writeString
// toPath and exists. JsUrl extends URL
// protocols as in:
//
// scriptit:// - /storage/emulated/0/Scriptit
// tmp:// - /storage/emulated/0/Scriptit/Tmp
// file:// - absolute file system path
//
// Note: Android platform dictates where
// external storage resides and the above
// path is only an example.

var View = Packages.android.view.View;
var EditText = Packages.android.widget.EditText;
var Button = Packages.android.widget.Button;
var LinearLayout = Packages.android.widget.LinearLayout;
var LayoutParams = Packages.android.widget.LinearLayout.LayoutParams;
var Gravity = Packages.android.view.Gravity;
var ScrollingMovementMethod = Packages.android.text.method.ScrollingMovementMethod;
var JsUrl = Packages.com.rbowman.scriptit.lang.JsUrl;
var Toast = Packages.android.widget.Toast;

var editTextData = null;
var editTextFile = null;
var buttonLoad = null;
var buttonSave = null;

function onCreate(bundle)
{
    editTextData = new EditText(Activity);
    
    with (editTextData)
    {
        setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT, 1));
        setTextSize(16);
        setGravity(Gravity.TOP);
        setText("");
        setHint("type something here...");
    }

    editTextFile = new EditText(Activity);
    
    with (editTextFile)
    {
        setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT, 1));
        setTextSize(16);
        setGravity(Gravity.TOP);
        setText("");
        setHint("filename");
    }
    
    buttonLoad = new Button(Activity);
    
    with (buttonLoad)
    {
        setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT, 1));
        setText("Load");
        setOnClickListener(function(view)
        { 
            // read from the ScriptIt/Tmp directory
            var fileUrl = "tmp://" + editTextFile.getText();
            
            // does file actually exist? 
            if (JsUrl.exists(fileUrl))
            {
                editTextData.setText(JsUrl.readString(fileUrl));
            }
            else
            {
                // convert tmp://... url to physical path
                Toast.makeText(Activity, "File " + JsUrl.toPath(fileUrl) 
                    + " does not exist!", Toast.LENGTH_SHORT).show();
            }
        });
    }

    buttonSave = new Button(Activity);
    
    with (buttonSave)
    {
        setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT, 1));
        setText("Save");
        setOnClickListener(function(view)
        { 
            // create file in the ScriptIt/Tmp directory.
            var fileUrl = "tmp://" + editTextFile.getText();
            
            JsUrl.writeString(fileUrl, editTextData.getText());
        });
    }

    var buttonLayout = new LinearLayout(Activity);
    
    with (buttonLayout)
    {
        setOrientation(LinearLayout.HORIZONTAL);
        setLayoutParams(new LayoutParams(
            LayoutParams.MATCH_PARENT,  LayoutParams.WRAP_CONTENT, 0));
        addView(editTextFile);
        addView(buttonLoad);
        addView(buttonSave);
    }

    var containerLayout = new LinearLayout(Activity);
    
    with (containerLayout)
    {
        setOrientation(LinearLayout.VERTICAL);
        setLayoutParams(new LayoutParams(
            LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT, 0));
    
        addView(editTextData);
        addView(buttonLayout);
    }
                    
    Activity.setContentView(containerLayout);
    Activity.setTitle("URL Input/Output");
}

