// PlayRadio.js - originally PlayAudio.js

var MediaPlayer = Packages.android.media.MediaPlayer;
var Toast = Packages.android.widget.Toast;

var audioSource = "http://samcloud.spacial.com/api/listen?sid=72935&m=sc";
var mediaPlayer = new MediaPlayer();

try 
{
    mediaPlayer.setDataSource(audioSource);
    mediaPlayer.prepare();
    mediaPlayer.start();
}
catch (exception) 
{
    Toast.makeText(Activity, "Error: " + exception.message, 
        Toast.LENGTH_LONG).show();            
}