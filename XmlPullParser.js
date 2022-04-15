// XmlPullParser.js

// The XmlPullParser offers a simple API compared to 
// SAX and DOM and is fast and requires less memory than 
// the DOM API.model

var TextView = Packages.android.widget.TextView;
var Log = Packages.android.util.Log;

var XmlPullParserFactory = Packages.org.xmlpull.v1.XmlPullParserFactory;
var XmlPullParser = Packages.org.xmlpull.v1.XmlPullParser;
var StringReader = Packages.java.io.StringReader;

var tvBody = null;

var xml = "<foo>Hello World!</foo><fee>Welcome Back</fee>";

function onCreate(bundle)
{
    tvBody = new TextView(Activity);
    tvBody.setTextSize(16);
    tvBody.setText("...");
    Activity.setContentView(tvBody);

    Activity.setTitle("XmlPullParser");

    walkXml(xml);
}

function walkXml(xmlString)
{
    factory = XmlPullParserFactory.newInstance();
    factory.setNamespaceAware(true);
    xmlPullParser = factory.newPullParser();
    xmlPullParser.setInput(new StringReader (xmlString));
    var eventType = xmlPullParser.getEventType();
    
    var text = "";
    
    while (true)
    {
        if(eventType == XmlPullParser.START_DOCUMENT) 
        {
            text = text + "\nStart document";
        } 
        else if(eventType == XmlPullParser.END_DOCUMENT) 
        {
            text = text + "\nEnd document";
            break;
        } 
        else if(eventType == XmlPullParser.START_TAG) 
        {
            text = text + "\n    Start Tag: " + xmlPullParser.getName();
        } 
        else if(eventType == XmlPullParser.END_TAG) 
        {
            text = text + "\n    End Tag: " + xmlPullParser.getName();
        } 
        else if(eventType == XmlPullParser.TEXT) 
        {
            text = text + "\n        Text: " + xmlPullParser.getText();
        }
        eventType = xmlPullParser.next();
    }
    tvBody.setText(text);
}


