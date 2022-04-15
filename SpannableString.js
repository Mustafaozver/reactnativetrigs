// SpannableString.js - EditText with SpannableString 
// of italic, highlighted and bold

var EditText = Packages.android.widget.EditText;
var Gravity = Packages.android.view.Gravity;
var Spannable = Packages.android.text.Spannable;
var SpannableString = Packages.android.text.SpannableString;
var StyleSpan = Packages.android.text.style.StyleSpan;
var BackgroundColorSpan = Packages.android.text.style.BackgroundColorSpan;
var ForegroundColorSpan = Packages.android.text.style.ForegroundColorSpan;
var Typeface = Packages.android.graphics.Typeface;
var Color = Packages.android.graphics.Color;

var etBody = null;

function onCreate(bundle) 
{
    etBody = new EditText(Activity);
    etBody.setGravity(Gravity.TOP);
    etBody.setTextSize(30);

    Activity.setContentView(etBody); 
    Activity.setTitle("SpannableString");

    // individual strings, and text    
    var ITALIC = "Italic";
    var HIGHLIGHTED = "Highlighted"
    var BOLD = "Bold"
    var TEXT = ITALIC + ", " + 
        HIGHLIGHTED + ", " + 
        BOLD;

    var str = new SpannableString(TEXT);
    
    with (str)
    {
        // Set italic text-style
        setSpan(
            new StyleSpan(
                Typeface.ITALIC), 
            TEXT.indexOf(ITALIC), 
            TEXT.indexOf(ITALIC) + ITALIC.length, 
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

        // Set red-on-blue background        
        setSpan(
            new ForegroundColorSpan(Color.RED),
            TEXT.indexOf(HIGHLIGHTED),
            TEXT.indexOf(HIGHLIGHTED) + HIGHLIGHTED.length,
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
            
        setSpan(
            new BackgroundColorSpan(Color.BLUE),
            TEXT.indexOf(HIGHLIGHTED),
            TEXT.indexOf(HIGHLIGHTED) + HIGHLIGHTED.length,
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        
        // Set bold text-style
        setSpan(
            new StyleSpan(
                Typeface.BOLD),
            TEXT.indexOf(BOLD),
            TEXT.indexOf(BOLD) + BOLD.length,
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
    }
    etBody.setText(str);
}


