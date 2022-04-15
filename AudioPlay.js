// AudioPlay.js

var MediaPlayer = Packages.android.media.MediaPlayer;
var JsUrl = Packages.com.rbowman.scriptit.lang.JsUrl;
var Toast = Packages.android.widget.Toast;

var audioFile = JsUrl.toPath("tmp://audiorecordtest.3gp");
var mediaPlayer = new MediaPlayer();

try 
{
    mediaPlayer.setDataSource(audioFile);
    mediaPlayer.prepare();
    mediaPlayer.start();
}
catch (exception) 
{
    Toast.makeText(Activity, "Error: " + exception.message, 
        Toast.LENGTH_LONG).show();            
}