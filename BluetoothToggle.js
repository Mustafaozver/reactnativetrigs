// BluetoothToggle.js

var bluetoothAdapter = Packages.android.bluetooth
    .BluetoothAdapter.getDefaultAdapter();

if (bluetoothAdapter.isEnabled())
    bluetoothAdapter.disable();
else
    bluetoothAdapter.enable();
