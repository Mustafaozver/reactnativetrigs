// KeyEvents.js

// Handles short/long presses of volume up/down keys

var TextView = Packages.android.widget.TextView;
var Toast = Packages.android.widget.Toast;
var KeyEvent = Packages.android.view.KeyEvent;
 
function onCreate(bundle)
{
    var tvBody = new TextView(Activity);

    tvBody.setText("\nHandles onKeyDown, onKeyUp, onKeyLongPress"
        + "\n\nNote: Try short and long presses on volume up/down keys");

    Activity.setContentView(tvBody);
    Activity.setTitle("KeyEvents");
}

function onKeyDown(keycode, event)
{
    if (keycode === KeyEvent.KEYCODE_VOLUME_UP || keycode === KeyEvent.KEYCODE_VOLUME_DOWN)
    {
        if (event.getRepeatCount() == 0)
            event.startTracking();
        return true;
    }
    return false;
}

function onKeyUp(keycode, event)
{
    if (!event.isCanceled())
    {
        if (keycode === KeyEvent.KEYCODE_VOLUME_UP)
        {
            Toast.makeText(Activity, "Volume Up - Short Press", Toast.LENGTH_SHORT).show();
            return true;
        }
        else if (keycode === KeyEvent.KEYCODE_VOLUME_DOWN)
        {
            Toast.makeText(Activity, "Volume Down - Short Press", Toast.LENGTH_SHORT).show();
            return true;
        }
    }
    return false;
}

function onKeyLongPress(keycode, event)
{
    if(keycode === KeyEvent.KEYCODE_VOLUME_UP) 
    {
        Toast.makeText(Activity, "Volume Up - Long Press", Toast.LENGTH_SHORT).show();
        return true;
    }
    else if(keycode == KeyEvent.KEYCODE_VOLUME_DOWN)
    {
        Toast.makeText(Activity, "Volume Down - Long Press", Toast.LENGTH_SHORT).show();
        return true;
    }
    return false;
}
