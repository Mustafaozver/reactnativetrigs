// AudioInfo.js

var AudioManager = Packages.android.media.AudioManager;
var Context = Packages.android.content.Context;
var Build = Packages.android.os.Build;

device_type = [
    "unknown",
    "builtin earpiece",
    "builtin speaker",
    "wired headset",
    "wired headphones",
    "line analog",
    "line digital",
    "bluetooth sco",
    "bluetooth a2dp",
    "hdmi",
    "hdmi arc",
    "usb device",
    "usb accessory",
    "dock",
    "fm",
    "builtin mic",
    "fm tuner",
    "tv tuner",
    "telephony",
    "aux line",
    "ip"];

var audioManager = Activity.getSystemService(Context.AUDIO_SERVICE);

print("-------------------------------------")
print("BluetoothA2dpOn = " + audioManager.isBluetoothA2dpOn());
print("BluetoothScoAvailableOffCall = " + audioManager.isBluetoothScoAvailableOffCall());
print("BluetoothScoOn = " + audioManager.isBluetoothScoOn());
print("MicrophoneMute = " + audioManager.isMicrophoneMute());
print("MusicActive = " + audioManager.isMusicActive());
print("SpeakerphoneOn = " + audioManager.isSpeakerphoneOn());
print("VolumeFixed = " + audioManager.isVolumeFixed());
print("WiredHeadsetOn = " + audioManager.isWiredHeadsetOn());

if (Build.VERSION.SDK_INT >= 23)
{
    var devices = audioManager.getDevices(AudioManager.GET_DEVICES_ALL);
    print("\n" + devices.length + " Devices");
    
    for (var i = 0; i < devices.length; i++)
    {
        var device = devices[i];
        print(i + ": " + device.getProductName()
            + " - " + device_type[device.getType()]
            + ((device.isSource()) ? " - Source" : "")
            + ((device.isSink()) ? " - Sink" : ""));
    }
}
