// Bluetooth.js

// Monitors state, paired devices and available devices.

var TextView = Packages.android.widget.TextView;
var JsBroadcastReceiver = Packages.com.rbowman.scriptit.lang.JsBroadcastReceiver;
var IntentFilter = Packages.android.content.IntentFilter;
var BluetoothDevice = Packages.android.bluetooth.BluetoothDevice;
var BluetoothAdapter = Packages.android.bluetooth.BluetoothAdapter;
var Toast = Packages.android.widget.Toast;

var receiver = null;
var tvBody = null;
var bBluetoothEnabled;
var bluetoothAdapter = null;

var txtHeader  = "\nMonitors Bluetooth state, paired devices and available devices. Click here to refresh.\n\n";
var txtStatus = "";
var txtPairedDevices = "";
var txtFoundDevices = "";
var txtDiscoveryStatus = "";

function onCreate(bundle)
{
    tvBody = new TextView(Activity);
    tvBody.setOnClickListener(function(view)
    {
        getBluetoothInfo(); 
        bluetoothAdapter.startDiscovery();
    });

    Activity.setContentView(tvBody);
    Activity.setTitle("Bluetooth Example");

    getBluetoothInfo()
}

function onResume()
{
    if ((receiver != null) 
        && (bluetoothAdapter != null) 
        && (bBluetoothEnabled))
    {
        var filterIntent = new IntentFilter(BluetoothDevice.ACTION_FOUND);
        filterIntent.addAction(BluetoothAdapter.ACTION_DISCOVERY_STARTED);
        filterIntent.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);

        Activity.registerReceiver(receiver, filterIntent);

        bluetoothAdapter.startDiscovery();
    }
}

function onPause()
{
    if (receiver != null)
    {   
        if (bluetoothAdapter.isDiscovering())
            bluetoothAdapter.cancelDiscovery();

        Activity.unregisterReceiver(receiver);
    }
}

function getBluetoothInfo()
{
    bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

    if(bluetoothAdapter == null)
    {
        // bluetooth service not available, were done!
        txtStatus = "Bluetooth device: Status not supported.\n";
    } 
    else 
    {
        // bluetooth service available, is service enabled?
        bBluetoothEnabled = bluetoothAdapter.isEnabled();

        txtStatus = "Bluetooth service is " 
            + ((bBluetoothEnabled) ? "Enabled" : "Disabled") 
            + "\n\n"

        if (bBluetoothEnabled)
        {
            // bluetooth service enabled, get paired devices.
            txtPairedDevices = "Paired Devices:\n";

            for (var device in Iterator(bluetoothAdapter.getBondedDevices()))
                txtPairedDevices += "Name: " + device.getName()
                    + ", Mac Address: " + device.getAddress()
                    + "\n"

            if (bluetoothAdapter.isDiscovering())
                bluetoothAdapter.cancelDiscovery();

            if (receiver == null)
                initReceiver();
        }
    }

    tvBody.setText(txtHeader 
        + txtStatus
        + txtPairedDevices);
}

function initReceiver()
{
    receiver = new JsBroadcastReceiver();
    receiver.setOnReceiveHandler(function (context, intent) 
    {
        var action = intent.getAction();

        if (BluetoothDevice.ACTION_FOUND.equals(action)) 
        {
            device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);

            if (txtFoundDevices.length == 0)
                txtFoundDevices = "\nFound devices:\n";

            txtFoundDevices += "Name: " + device.getName()
                + ", Mac Address: " + device.getAddress()
                + "\n"
        }
        else if (BluetoothAdapter.ACTION_DISCOVERY_STARTED.equals(action))
        {
            //Toast.makeText(Activity, "Bluetooth discovery started...", Toast.LENGTH_SHORT).show();
            txtFoundDevices = "";
            txtDiscoveryStatus = "\nDiscovering...";
        }
        else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action))
        {
            //Toast.makeText(Activity, "Bluetooth discovery ENDED...", Toast.LENGTH_SHORT).show();
            txtDiscoveryStatus = "\nDiscovery finished.";
        }

        tvBody.setText(txtHeader 
            + txtStatus
            + txtPairedDevices
            + txtFoundDevices 
            + txtDiscoveryStatus);
    });
}

