// Brightness.js

// Displays current brightness level (in quarters). When 
// the user makes a choice the brightness is changed.
// Note: max brightness is 255.

var System = Packages.android.provider.Settings.System;

var contentResolver = Activity.getContentResolver();

var brightness = Math.round(System.getInt(contentResolver, 
    System.SCREEN_BRIGHTNESS) / (255/4));

var LEVEL = [
    "0%",
    "25%",
    "50%",
    "75%",
    "100%"];

var result = choice("Brightness Level?", LEVEL, brightness);

if (result != -1)
    System.putInt(contentResolver, System.SCREEN_BRIGHTNESS, 
        Math.round(result * (255/4)));
