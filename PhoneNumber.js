// PhoneNumber.js

// This method is not reliable

var TelephonyManager = Packages.android.telephony.TelephonyManager;
var Context = Packages.android.content.Context;

function getPhoneNumber() 
{
    return Activity.getSystemService(Context.TELEPHONY_SERVICE)
        .getDefault()
        .getLine1Number();
}

print ("phone number: " + getPhoneNumber());

