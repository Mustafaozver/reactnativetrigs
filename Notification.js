// Notification.js

var TextView = Packages.android.widget.TextView;
var Context = Packages.android.content.Context;
var Intent = Packages.android.content.Intent;
var Bundle = Packages.android.os.Bundle;
var Notification = Packages.android.app.Notification; 
var NotificationManager = Packages.android.app.NotificationManager; 
var PendingIntent = Packages.android.app.PendingIntent; 
var System = Packages.java.lang.System;
var R = Packages.com.rbowman.scriptit.R;

var tvBody = null;
var bundleKey = "LAST_MESSAGE";
var NOTIFY_ID = 1234;
var count = 0;

function onCreate(bundle)
{
    tvBody = new TextView(Activity);

    // check if script invoked from a notification
    var notificationMessage = Activity.getIntent()
        .getExtras().getString(bundleKey);

    if (notificationMessage == null)
    {
        // not started from notification, so clear any 
        // existing notifications
        Activity.getSystemService(Context.NOTIFICATION_SERVICE)
            .cancel(NOTIFY_ID);

        tvBody.setText("\nClick to create a notification");

        tvBody.setOnClickListener(function()
        {
            count++;
            makeNotification("ScriptIt", "Hello World " + count);
        });
    }
    else
    {
        // started from notification - only display message.
        tvBody.setText("\nLast notification \"" 
            + notificationMessage + "\"");
    }

    Activity.setContentView(tvBody);
    Activity.setTitle("Notification");
}

function makeNotification(title, message) 
{
    var intent = new Intent();
    intent.setClassName(Activity, "com.rbowman.scriptit.lang.JsEval");
    intent.putExtra("Url", "scriptit://Samples/Notification.js");

    // also add the message to the intent. Later, this
    // can be used to display.
    var bundle = new Bundle();
    bundle.putString(bundleKey, message);
    intent.putExtras(bundle);

    var notificationManager = Activity
        .getSystemService(Context.NOTIFICATION_SERVICE);

    var notification = new Notification(R.mipmap.ic_launcher, 
        message, System.currentTimeMillis()); 

    var pIntent = PendingIntent.getActivity(Activity, 0, 
        intent, PendingIntent.FLAG_UPDATE_CURRENT); 
    notification.setLatestEventInfo(Activity, title, message, pIntent);

    notification.flags |= Notification.FLAG_AUTO_CANCEL;
    notificationManager.notify(NOTIFY_ID, notification);
}

