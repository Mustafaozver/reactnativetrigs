// Dialer.js

var TextView = Packages.android.widget.TextView;

function onCreate(bundle)
{        
    var tvBody = new TextView(Activity);
    tvBody.setText("\nTouch the screen to run dialer.");

    tvBody.setOnClickListener(function(view)
    {
        toDialer("tel://8009991212");
    });
    
    Activity.setContentView(tvBody);
    Activity.setTitle("Dialer");
}

function toDialer(phoneNumberUri) 
{
    // example toDialer("tel://8009991212");

    var Intent = Packages.android.content.Intent;
    var Uri = Packages.android.net.Uri;

    var intent = new Intent(Intent.ACTION_DIAL);
    intent.setData(Uri.parse(phoneNumberUri));
    Activity.startActivity(intent);
}
