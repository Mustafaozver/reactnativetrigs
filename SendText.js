// SendText.js - Send SMS Text message

// Also see: HasTelephony.js

var EditText = Packages.android.widget.EditText;
var TextView = Packages.android.widget.TextView;
var InputType = Packages.android.text.InputType;
var Button = Packages.android.widget.Button;
var LinearLayout = Packages.android.widget.LinearLayout;
var LayoutParams = Packages.android.widget.LinearLayout.LayoutParams;
var Toast = Packages.android.widget.Toast;
var SmsManager = Packages.android.telephony.SmsManager;

function onCreate(bundle)
{
    var text = "\nDisclamers:\n1) This script demonstrates a sending an SMS text message -- please don't focus on the interface" 
        + "\n2) Only phones send SMS messages. This will not work on a tablet.";

    var textHeader = new TextView(Activity);

    with (textHeader)
    {
        setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT, 1));
        setTextSize(16);
        setText(text);
    }
    
    var editPhoneNum = new EditText(Activity);
    
    with (editPhoneNum)
    {
        setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT, 1));
        setTextSize(16);
        setText("");
        setInputType(InputType.TYPE_CLASS_NUMBER);
        setHint("Enter a Phone Number");
    }
    
    var editMsg = new EditText(Activity);
    
    with (editMsg)
    {
        setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT, 1));
        setTextSize(16);
        setText("");
        setHint("Enter a Text Message");
    }
    
    buttonSend = new Button(Activity);
    
    with (buttonSend)
    {
        setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT, 0));
        setText("Send Text Message");
        setOnClickListener(function(view)
        { 
            var phone = editPhoneNum.getText().toString();
            var msg = editMsg.getText().toString();
            sendText(phone, msg);
        });
    }
    
    var containerLayout = new LinearLayout(Activity);
    
    with (containerLayout)
    {
        setOrientation(LinearLayout.VERTICAL);
        setLayoutParams(new LayoutParams(
            LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));
        addView(textHeader);
        addView(editPhoneNum);
        addView(editMsg);
        addView(buttonSend);
    }
    
    Activity.setContentView(containerLayout);

    Activity.setTitle("Send Text");
}


function sendText(phoneNum, smsMsg)
{
    try
    {
        var smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage(phoneNum, null, smsMsg, null, null);
        Toast.makeText(Activity, "SMS Sent message \"" + smsMsg + "\" to \"" + phoneNum + "\"", Toast.LENGTH_LONG).show();    
    }
    catch (exception) 
    {
        Toast.makeText(Activity, exception.message + "SMS faild, please try again later!", Toast.LENGTH_LONG).show();
    }
}

