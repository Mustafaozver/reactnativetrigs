// JsonTest.js

// performs https get using query-string and
// returning a JSON string, which is parsed and
// discrete properities are printed.

var JsUrl = Packages.com.rbowman.scriptit.lang.JsUrl;

function initContentView() 
{
    // Text1 layout, edit at your own risk. 
    // Note: tvBody variable is globally scoped.

    var R = Packages.com.rbowman.scriptit.R;
    var TextView = Packages.android.widget.TextView;

    Activity.setContentView(R.layout.text1);
    tvBody = TextView(Activity.findViewById(R.id.tv_body));
}

function onCreate(bundle)
{
    initContentView();

    tvBody.setText("\nRetreiving data ...");
    
    Activity.setTitle("JsonTest");
    
    getIp();
    getDate();
}

function getIp ()
{
    JsUrl.asyncReadString("http://ip.jsontest.com/", function (retCode, data)
    {
        if (retCode == "OK")
        {
            var jsonObj = JSON.parse(data);

            tvBody.setText("\nquery = ip.jsontest.com"
                + "\nJSON reply = " + data
                + "\nip = " + jsonObj.ip);
        }
        else
        {
            // Error
            tvbody.setText(retCode + ", data= " + data);
        }
    });
}

function getDate ()
{
    JsUrl.asyncReadString("http://date.jsontest.com/", function (retCode, data)
    {
        if (retCode == "OK")
        {
            var jsonObj = JSON.parse(data);

            var text = tvBody.getText();

            tvBody.setText(text + "\n\nquery = http://date.jsontest.com"
                + "\nJSON reply = " + data
                + "\ntime = " + jsonObj.time
                + "\nmilliseconds_since_epoch = " + jsonObj.milliseconds_since_epoch
                + "\ndate = " + jsonObj.date);
        }
        else
        {
            // Error
            tvBody.setText(retCode + ", data= " + data);
        }
    });
}
