// FileList.js - Directory

var File = Packages.java.io.File;
var JsUrl = Packages.com.rbowman.scriptit.lang.JsUrl;

var files = new File(JsUrl.toPath("scriptit://Samples"))
    .listFiles().sort();

for (var i = 0; i < files.length; i++)
{
    print (((files[i].isDirectory()) ? "[d] " : "[f] " ) 
        + files[i].getName());
}
