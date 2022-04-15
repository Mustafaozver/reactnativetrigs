// Directory.js - print root and ScriptIt/Samples 
// directories. Also see FileList.js

var File = Packages.java.io.File;
var FileUtils = Packages.com.rbowman.scriptit.utilities.FileUtils;

function printDirectory(path)
{
    var files = new File(path).listFiles().sort();

    print("PATH: " + path + " - FILES: " + files.length);

    for (var i = 0; i < files.length; i++)
    {
        print (((files[i].isDirectory()) ? "[d] " : "[f] " ) 
            + files[i].getName());
    }
}

printDirectory(FileUtils.getRootDirectory());    // ScriptIt filesystem
print("-----------------------------------------------");
printDirectory(FileUtils.getRootDirectory() + File.separator + "Samples");
