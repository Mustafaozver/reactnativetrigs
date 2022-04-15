// Packages.js - Display Installed Packages

var Window = Packages.android.view.Window;
var AlertDialog = Packages.android.app.AlertDialog;
var DialogInterface = Packages.anroid.content.DialogInterface;
var android_R_style = Packages.android.R.style;
var ListView = Packages.android.widget.ListView;
var ArrayAdapter = Packages.android.widget.ArrayAdapter;
var Arrays = Packages.java.util.Arrays;
var R_drawable = Packages.com.rbowman.scriptit.R.drawable;
var PackageManager = Packages.android.content.pm.PackageManager;

function onCreate(bundle) 
{
    Activity.requestWindowFeature(Window.FEATURE_NO_TITLE);
    showList();
}

function showList()
{
    var androidPackages = Activity.getPackageManager().getInstalledPackages(0);

    var listview = new ListView(Activity);
    listview.setAdapter(new ArrayAdapter(
        Activity, 
        Packages.android.R.layout.simple_list_item_1,
      androidPackages)
    );
    
    var dialog = new AlertDialog.Builder(Activity);
    
    with (dialog)
    {
        setIcon(R_drawable.library);
        setTitle("Packages Installed (" + androidPackages.size() +")");
        setView(listview);
        setNegativeButton("Close", function() {});
        
        alertdialog = show();
        
        alertdialog.setOnDismissListener(function(dialog) {
            Activity.finish();
        });
    }
}

