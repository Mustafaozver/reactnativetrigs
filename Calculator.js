// Calculator.js

var Button = Packages.android.widget.Button;
var TextView = Packages.android.widget.TextView;
var LinearLayout = Packages.android.widget.LinearLayout;
var LayoutParams = Packages.android.widget.LinearLayout.LayoutParams;
var Gravity = Packages.android.view.Gravity;
var TableLayout = Packages.android.widget.TableLayout;
var TableLayoutParams = Packages.android.widget.TableLayout.LayoutParams;
var TableRow = Packages.android.widget.TableRow;
var TableRowLayoutParams = Packages.android.widget.TableRow.LayoutParams;
var Space = Packages.android.widget.Space;
var Toast = Packages.android.widget.Toast;

var KEYPAD = [
    ["?", "C", "Del", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["", "0", ".", "="]];

var textView = null;
var balance = null;
var value = "0";
var operator = null;
var lastKeyOperator = false;

function onCreate(bundle)
{
    textView = new TextView(Activity);
    with (textView)
    {
        setLayoutParams(new LayoutParams(
            LayoutParams.MATCH_PARENT, 
            LayoutParams.WRAP_CONTENT, 0.2));
        setText(value.toString() + " ");
        setTextSize(40);
        setGravity(Gravity.CENTER_VERTICAL | Gravity.RIGHT);
    }

    var containerLayout = new LinearLayout(Activity);
    with (containerLayout)
    {
        setOrientation(LinearLayout.VERTICAL);
        setLayoutParams(new LayoutParams(
            LayoutParams.MATCH_PARENT, 
            LayoutParams.MATCH_PARENT, 1));
        setWeightSum(1.0);
        addView(textView);
        addView(createTableLayout());
    }

    Activity.setContentView(containerLayout);
    Activity.setTitle("Calculator");
}

function createTableLayout()
{
    var tableLayout = TableLayout(Activity);
    tableLayout.setLayoutParams(new LayoutParams(
        LayoutParams.MATCH_PARENT, 
        LayoutParams.WRAP_CONTENT, 0.8));
    tableLayout.setWeightSum(1.0);

    for (var row = 0; row < KEYPAD.length; row++)
    {
        var tableRow = new TableRow(Activity);
        tableRow.setLayoutParams(new TableLayoutParams(
            TableLayoutParams.MATCH_PARENT, 
            TableLayoutParams.MATCH_PARENT, 
            1.0 / KEYPAD.length));

        for (var col = 0; col < KEYPAD[row].length; col++)
        {
            var widget = (KEYPAD[row][col] == "") 
                ? new Space(Activity) 
                : new Button(Activity);

            with (widget)
            {
                setLayoutParams(new TableRowLayoutParams(
                    TableRowLayoutParams.MATCH_PARENT, 
                    TableRowLayoutParams.MATCH_PARENT, 
                    1.0 / KEYPAD[row].length));

                if (KEYPAD[row][col] != "")
                {
                    setText(KEYPAD[row][col]);
                    setTextSize(24);
                    setOnClickListener(function(view) { click(view); });
                }
            }
            tableRow.addView(widget);
        }
        tableLayout.addView(tableRow);
    }
    return tableLayout; 
}

function click(view)
{
    var key = view.getText();

    if (key == "?")
        Toast.makeText(Activity, "ScriptIt - Calculator example", 
            Toast.LENGTH_SHORT).show();

    if (key == "C")
        clear();

    if (key == "Del")
        deleteDigit();
    
    // keys 0 to 9
    if (key.charCodeAt(0) >= "0".charCodeAt(0) && key.charCodeAt(0) <= "9".charCodeAt(0))
        appendDigit(key);

    if (key == ".")
        appendDigit(key);

    if (key == "=" || key == "/" || key == "*" || key == "-" || key == "+")
        setOperator(key);
}

function appendDigit(key)
{
    if (key == "." && value == "0") ;
    else if (key != "." && (value == "0" || lastKeyOperator))
        value = "";

    lastKeyOperator = false;

    if (key == "." && value.indexOf(key) != -1)
        return;

    value += key;
    textView.setText(value + " ");
}

function deleteDigit()
{
    if (value == "0" || lastKeyOperator)
        return;

    value = value.slice(0, -1);
    if (value == "")
        value = "0";

    lastKeyOperator = false;
    textView.setText(value + " ");
}

function setOperator(key)
{
    if (lastKeyOperator)
        return;

    if (operator != null && balance != null)
    {
        balance = (eval(balance + operator + value)).toString();
        value = "0";
        operator = null;
        textView.setText(balance + " ");
    } 
    else if (operator == null && balance == null)
    {
        balance = value;
        value = "0";
    }

    if (key != "=")
    {
        operator = key;
        lastKeyOperator = true;
    }
    else
        lastKeyOperator = false;
}

function clear()
{
    lastKeyOperator = false;
    value = "0";
    balance = null;
    operator = null;
    textView.setText(value + " ");
}
