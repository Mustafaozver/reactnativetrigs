// SendSms.js

var Toast = Packages.android.widget.Toast;
var SmsManager = Packages.android.telephony.SmsManager;

function sendSms(phoneNum, message)
{
    try 
    {
        var smsManager = SmsManager.getDefault();
        smsManager.sendTextMessage(phoneNum, null, message, null, null);
        Toast.makeText(Activity, "SMS Sent message \"" + message + "\" to \"" + phoneNum + "\"", Toast.LENGTH_LONG).show();    
    } 
    catch (exception) 
    {
        Toast.makeText(Activity, exception.message + "SMS faild, please try again later!", Toast.LENGTH_LONG).show();
    }
}

sendSms("8005551212", "hello world");
