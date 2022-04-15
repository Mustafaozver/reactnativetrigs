// BuildInfo.js - Reports ...

var TextView = Packages.android.widget.TextView;
var ScrollView = Packages.android.widget.ScrollView;
var Build = Packages.android.os.Build;
var TextUtils = Packages.android.text.TextUtils

function onCreate(bundle)
{
    var tvBody = new TextView(Activity);
    
    var text = "";
    
    // Support different API level 
    if (Build.VERSION.SDK_INT >= 23)
        text += "\n Build.VERSION.BASE_OS: " 
            + Build.VERSION.BASE_OS;
    
    text += "\n Build.VERSION.CODENAME: " 
        + Build.VERSION.CODENAME
        + "\n Build.VERSION.INCREMENTAL: " 
        + Build.VERSION.INCREMENTAL;

    if (Build.VERSION.SDK_INT >= 23)
        text += "\n Build.VERSION.PREVIEW_SDK_INT: " 
            + Build.VERSION.PREVIEW_SDK_INT;

    text += "\n Build.VERSION.RELEASE: " 
        + Build.VERSION.RELEASE
        + "\n Build.VERSION.SDK: " 
        + Build.VERSION.SDK
        + "\n Build.VERSION.SDK_INT: " 
        + Build.VERSION.SDK_INT;
        
    if (Build.VERSION.SDK_INT >= 23)
        text += "\n Build.VERSION.SECURITY_PATCH: " 
            + Build.VERSION.SECURITY_PATCH;
    
    text += "\n Build.UNKNOWN: " + Build.UNKNOWN
        + "\n Build.BOARD: " + Build.BOARD
        + "\n Build.BOOTLOADER: " + Build.BOOTLOADER
        + "\n Build.BRAND: " + Build.BRAND
        + "\n Build.CPU_ABI: " + Build.CPU_ABI
        + "\n Build.CPU_ABI2: " + Build.CPU_ABI2
        + "\n Build.DEVICE: " + Build.DEVICE
        + "\n Build.DISPLAY: " + Build.DISPLAY
        + "\n Build.FINGERPRINT: " + Build.FINGERPRINT
        + "\n Build.HARDWARE: " + Build.HARDWARE
        + "\n Build.HOST: " + Build.HOST
        + "\n Build.ID: " + Build.ID
        + "\n Build.MANUFACTURER: " + Build.MANUFACTURER
        + "\n Build.MODEL: " + Build.MODEL
        + "\n Build.PRODUCT: " + Build.PRODUCT
        + "\n Build.RADIO: " + Build.RADIO
        + "\n Build.SERIAL: " + Build.SERIAL;
        
    if (Build.VERSION.SDK_INT >= 21)
    text += "\n Build.SUPPORTED_32_BIT_ABIS: " 
        + toJsArray(Build.SUPPORTED_32_BIT_ABIS)
        + "\n Build.SUPPORTED_64_BIT_ABIS: " 
        + toJsArray(Build.SUPPORTED_64_BIT_ABIS);
        
    text += "\n Build.TAGS: " + Build.TAGS
        + "\n Build.TIME: " + Build.TIME
        + "\n Build.TYPE: " + Build.TYPE
        + "\n Build.USER: " + Build.USER;
        
    tvBody.setText(text);

    var sv = new ScrollView(Activity);
    sv.addView(tvBody);

    Activity.setContentView(sv);
    Activity.setTitle("Build Info");
}

// Convert a Java array to a JavaScript array
function toJsArray(javaArray)
{
    var jsArray = [];

    for (i = 0; i < javaArray.length; ++i)
        jsArray[i] = javaArray[i];

    return jsArray;
}
