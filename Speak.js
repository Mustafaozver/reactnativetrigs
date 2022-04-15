// Speak.js

var TextView = Packages.android.widget.TextView;
var TextToSpeech = Packages.android.speech.tts.TextToSpeech;

var tts = null;

function onCreate(bundle)
{        
    var tvBody = new TextView(Activity);
    tvBody.setText("\nTouch the screen to speak.");

    tvBody.setOnClickListener(function()
    { 
        say("You just touched the screen.");
    });
    
    Activity.setContentView(tvBody);
    Activity.setTitle("Speak");
    
    tts = new TextToSpeech(Activity, function(status)
    {
        say("Ready. Touch the screen to speak",
            TextToSpeech.QUEUE_FLUSH, null);
    });
}

function onDestroy()
{
    if(tts != null)
    {
        tts.stop();
        tts.shutdown();
    }
} 

function say(message)
{
    tts.speak(message, TextToSpeech.QUEUE_FLUSH, null);
}
