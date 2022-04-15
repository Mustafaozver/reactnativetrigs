// HasTelephony.js

var Context = Packages.android.content.Context;
var TelephonyManager = Packages.android.telephony.TelephonyManager

function hasTelephony () {

    var ts = Activity.getSystemService(Context.TELEPHONY_SERVICE);
    if(ts.getPhoneType() == TelephonyManager.PHONE_TYPE_NONE){
        return false;
    }
    return true;
}    	

print ("Telephony: " + hasTelephony());

