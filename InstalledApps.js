// InstalledApps.js - Display Installed Packages

var ApplicationInfo = Packages.android.content.pm.ApplicationInfo;
var packages = Activity.getPackageManager().getInstalledPackages(0);

print("\nInstalled Apps ---------------");

for (var i = 0; i < packages.size(); i++)
{
    var package = packages.get(i);
    
    if (!(package.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM))
        print(package.applicationInfo.loadLabel(Activity.getPackageManager()));
}
