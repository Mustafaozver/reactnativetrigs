// Ugly code - try using the edit/format 
// option. First review the ugly-code before
// reformatting.

// After reformatting, choose file/revert 
// and see how this script was originally 
// formatted. 

var EditText = Packages.android.widget.EditText;
var Gravity = Packages.android.view.Gravity;
var Button = Packages.android.widget.Button;
var Toast = Packages.android.widget.Toast;
var LinearLayout = Packages.android.widget.LinearLayout;
var LayoutParams = Packages.android.widget.LinearLayout.LayoutParams;
var AlertDialog = Packages.android.app.AlertDialog;
var DialogInterface = Packages.anroid.content.DialogInterface;
var android_R_style = Packages.android.R.style;
var ListView = Packages.android.widget.ListView;
var ArrayAdapter = Packages.android.widget.ArrayAdapter;
var Arrays = Packages.java.util.Arrays;

var alertdialog = null;

var FRUITS = [      "Apple",
"Avocado", 
           "Banana",
"Blueberry", "Cherry", "Coconut", "Cranberry",
            "Durian", "Grape", "Guava", "Kiwifruit",
"Jackfruit", "Mango", "Olive", "Peach", "Pear", 
"Pumpkin", "Sugar-apple", "Strawberry"
];

function onCreate(bundle) 
{
Activity.setTitle("Ugly.js");

var editText = new EditText(Activity);
editText.setLayoutParams(new LayoutParams(
LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT, 1));
editText.setGravity(Gravity.TOP);
editText.setTextSize(14);
editText.setText("ListView example - Press the \"Show List\" button");

// Button that starts a server for a remote editText.
var buttonList = new Button(Activity);
buttonList.setLayoutParams(new LayoutParams(
LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT, 1));
buttonList.setText("Show List");
buttonList.setOnClickListener(function () { showList(); });

var buttonLayout = new LinearLayout(Activity);
buttonLayout.setOrientation(LinearLayout.HORIZONTAL);
buttonLayout.setLayoutParams(new LayoutParams(
LayoutParams.FILL_PARENT,  LayoutParams.WRAP_CONTENT, 0));
buttonLayout.addView(buttonList);

var containerLayout = new LinearLayout(Activity);
containerLayout.setOrientation(LinearLayout.VERTICAL);
containerLayout.setLayoutParams(new LayoutParams(
LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));
containerLayout.addView(editText);
containerLayout.addView(buttonLayout);

Activity.setContentView(containerLayout);
}

function showList()
{
var listview = new ListView(Activity);
listview.setAdapter(new ArrayAdapter(
Activity,
Packages.android.R.layout.simple_list_item_1, 
Arrays.asList(FRUITS))
);

listview.setOnItemClickListener(function (parent, view, position, id) { 
toast("You Selected " + FRUITS[position]);
alertdialog.dismiss();
});

// show dialog with Holo-them
var dialog = new AlertDialog.Builder(Activity);

dialog.setTitle("List of Fruits");
dialog.setView(listview);
alertdialog = dialog.show();
}

function toast(text)
{
Toast.makeText(
Activity,
text,
Toast.LENGTH_SHORT).show();
}

function whatever(message)
{
if(message == "this") 
{
message = "that";
if(message == "this")
message = "most";
}
else
{
message = "this";
}
}

