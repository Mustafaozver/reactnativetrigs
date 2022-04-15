// AlertDir.js - print ScriptIt/Samples 

// Originally Directory.js, now directs output to 
// an alert dialog

var File = Packages.java.io.File;
var JsUrl = Packages.com.rbowman.scriptit.lang.JsUrl;

function getDirectory(path)
{
    var result = "";
    var files = new File(path).listFiles().sort();

    result += "PATH: " + path + " - FILES: " + files.length;

    for (var i = 0; i < files.length; i++)
        result += "\n" + ((files[i].isDirectory()) ? "[d] " : "[f] " ) 
            + files[i].getName();
            
    return result;
}

alert (getDirectory(JsUrl.toPath("scriptit://Samples")));
