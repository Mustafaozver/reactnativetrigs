// Contact List

var android_R_style = Packages.android.R.style;
var ListView = Packages.android.widget.ListView;
var ArrayAdapter = Packages.android.widget.ArrayAdapter;
var Arrays = Packages.java.util.Arrays;
var Menu = Packages.android.view.Menu;
var Toast = Packages.android.widget.Toast;

var Cursor = Packages.android.database.Cursor;
var Uri = Packages.android.net.Uri;
var ContactsContract = Packages.android.provider.ContactsContract;

function onCreate(bundle) 
{
    var listContactNames = [];
    var cursor = getContacts();

    while (cursor.moveToNext())
    {
        var displayName = cursor.getString(cursor.getColumnIndex(ContactsContract.Data.DISPLAY_NAME));
        listContactNames.push(displayName);
    }

    var listview = new ListView(Activity);
    listview.setAdapter(new ArrayAdapter(
        Activity,
        Packages.android.R.layout.simple_list_item_1,
        Arrays.asList(listContactNames))
    );

    // handle click selection here
    listview.setOnItemClickListener(function (parent, view, position, id) { 
        Toast.makeText(Activity, "Selected \"" + listContactNames[position] + "\"", Toast.LENGTH_SHORT).show();
    });

    Activity.setContentView(listview);

    Activity.setTitle("Contact List");
}

var OPTIONS =
    [["Quit", function() { Activity.finish(); }]];

function onPrepareOptionsMenu(menu)
{
    menu.clear();

    for (var item = 0; item < OPTIONS.length; item++)
        menu.add(Menu.NONE, 
            Menu.FIRST + item, 
            Menu.NONE, 
            OPTIONS[item][0]);

    return true;
}

function onOptionsItemSelected(item)
{
    OPTIONS[ item.getItemId()
        - Menu.FIRST ][1]();

    return true;
}

function toast (text)
{
    Toast.makeText(Activity, text, Toast.LENGTH_SHORT).show();
}

function getContacts() 
{
    var uri = ContactsContract.Contacts.CONTENT_URI;
    var projection = [ ContactsContract.Contacts._ID, ContactsContract.Contacts.DISPLAY_NAME ];
    var selection = ContactsContract.Contacts.IN_VISIBLE_GROUP + " = '" + ("1") + "'";
    var sortOrder = ContactsContract.Contacts.DISPLAY_NAME + " COLLATE LOCALIZED ASC";
    return Activity.managedQuery(uri, projection, selection, null, sortOrder);
}

