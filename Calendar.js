// Calendar.js 

// Creates a calendar event or retrieves all 
// calendar events in a ListView.

load ("scriptit://Modules/Widgets.js");

var GregorianCalendar = Packages.java.util.GregorianCalendar;
var CalendarContract = Packages.android.provider.CalendarContract;
var Events = Packages.android.provider.CalendarContract.Events;

var Cursor = Packages.android.database.Cursor;
var Uri = Packages.android.net.Uri;
var Arrays = Packages.java.util.Arrays;
var ArrayAdapter = Packages.android.widget.ArrayAdapter;
var R_drawable = Packages.com.rbowman.scriptit.R.drawable;

var tvBody = null;

function onCreate(bundle)
{
    var TEXT = "\nRead calendar or create a recurring event.";

    tvBody = new TextView(Activity);

    with (tvBody)
    {
        setTextSize(16);
        setTextColor(Color.WHITE);
        setText(TEXT);
    }

    Activity.setContentView(tvBody);
    Activity.setTitle("Calendar");
}

var OPTIONS = 
    [["Create Calendar Event", function() { onCalendarCreate(); }],
    ["Read Calendar Events", function() { showCalendarEvents(); }],
    ["Quit", function() { Activity.finish(); }]];

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

function onCalendarCreate()
{
    var intent = new Intent(Intent.ACTION_INSERT);
    intent.setType("vnd.android.cursor.item/event");
    intent.putExtra(Events.TITLE, "Script It");
    intent.putExtra(Events.EVENT_LOCATION, "home");
    intent.putExtra(Events.DESCRIPTION, "Training Session");

    // Setting dates
    var calDate = new GregorianCalendar();
    intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME,
      calDate.getTimeInMillis());
    intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME,
      calDate.getTimeInMillis());

    // Make it a full day event
    intent.putExtra(CalendarContract.EXTRA_EVENT_ALL_DAY, true);

    // Make it a recurring Event
    intent.putExtra(Events.RRULE, "FREQ=WEEKLY;COUNT=2;WKST=SU;BYDAY=TU,TH");

    // Making it private and shown as busy
    intent.putExtra(Events.ACCESS_LEVEL, Events.ACCESS_PRIVATE);
    intent.putExtra(Events.AVAILABILITY, Events.AVAILABILITY_BUSY);

    intent.setData(CalendarContract.Events.CONTENT_URI);
    Activity.startActivity(intent);
}

function showCalendarEvents()
{
    // Events.TITLE
    var cursor = Activity.getContentResolver()
        .query(Uri.parse("content://com.android.calendar/events"),
            [ "calendar_id", Events.TITLE, Events.DESCRIPTION, "dtstart", "dtend", Events.EVENT_LOCATION ], null, null, null);

    var listCalendarEvents = [];

    while (cursor.moveToNext()) 
        listCalendarEvents.push("calendar:" + cursor.getString(0) + ", " + cursor.getString(1) + ", " + cursor.getString(2) + " - " + cursor.getString(3));

    var listview = new ListView(Activity);
    listview.setAdapter(new ArrayAdapter(
        Activity,
        Packages.android.R.layout.simple_list_item_1,
        Arrays.asList(listCalendarEvents))
    );
    
    var dialog = new AlertDialog.Builder(Activity);
    
    with (dialog)
    {
        setIcon(R_drawable.library);
        setTitle("Calendar Events (" + listCalendarEvents.length +")");
        setView(listview);
        setNegativeButton("Close", function() {});
        
        alertdialog = show();
        
        alertdialog.setOnDismissListener(function(dialog) {
            Activity.finish();
        });
    }
}

