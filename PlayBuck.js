// PlayBuck.js - originally PlayVideo.js  

var Window = Packages.android.view.Window;
var JsSurfaceView = Packages.com.rbowman.scriptit.lang.JsSurfaceView;
var SurfaceHolder = Packages.android.view.SurfaceHolder;
var MediaPlayer = Packages.android.media.MediaPlayer;
var Toast = Packages.android.widget.Toast;

var videoSource = null;

function onCreate(bundle) 
{
    Activity.requestWindowFeature(Window.FEATURE_NO_TITLE);

    videoSource = "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov";
    var surfaceView = createSurfaceView();
    Activity.setContentView(surfaceView);
}

function createSurfaceView()
{
    var mediaplayer = null;
    var surface = new JsSurfaceView(Activity);

    surface.setSurfaceCreatedListener(function(holder)
    {
        try
        {
            mediaplayer = new MediaPlayer();
            mediaplayer.setDataSource(videoSource);
            mediaplayer.setDisplay(holder);
            mediaplayer.prepare();
        
        }
        catch (exception) 
        {
            Toast.makeText(Activity, "Video: " + videoFile + " not found", Toast.LENGTH_LONG).show();            
            mediaplayer.release();
            mediaplayer = null; 
        } 
    });

    surface.setSurfaceDestroyedListener(function(holder)
    {
        if (mediaplayer != null)
        {
            mediaplayer.stop();
            mediaplayer.release();
            mediaplayer = null; 
        }
    });

    surface.setSurfaceChangedListener(function(holder, format, w, h)
    {
        if (mediaplayer != null)
            mediaplayer.start();
    });

    surface.getHolder().setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
    return surface;
}

