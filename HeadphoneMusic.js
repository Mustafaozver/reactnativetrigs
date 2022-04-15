// HeadphoneMusic.js

// Wait until a headphone is plugged-in then run 
// Google Play Music and start playing a song. Next, 
// it waits until the headphone is unplugged, stops 
// playing music and has no user-interface.

var KeyEvent = Packages.android.view.KeyEvent;

var audioManager = Activity.getSystemService(
    Packages.android.content.Context.AUDIO_SERVICE);

// wait until headphone is plugged-in
while (!audioManager.isWiredHeadsetOn());

Activity.startActivity(
    Activity.getPackageManager()
        .getLaunchIntentForPackage("com.google.android.music"));

audioManager.dispatchMediaKeyEvent(
    new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_MEDIA_PLAY));
audioManager.dispatchMediaKeyEvent(
    new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_MEDIA_PLAY));

// wait until headphone is unplugged.
while (audioManager.isWiredHeadsetOn());

audioManager.dispatchMediaKeyEvent(
    new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_MEDIA_STOP));
audioManager.dispatchMediaKeyEvent(
    new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_MEDIA_STOP));
