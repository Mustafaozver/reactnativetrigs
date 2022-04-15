// Temporary activity, temporary destination when hooking
// up activities via toActivity.

function initContentView() 
{
    // splash2 - Auto-generated, edit at your own risk. 
    // The following variables are globally scoped:
    // tvHeader, ivImage and tvFooter.

    var R = Packages.com.rbowman.scriptit.R;
    var TextView = Packages.android.widget.TextView;
    var ImageView = Packages.android.widget.ImageView;
    var Window = Packages.android.view.Window;

    Activity.getWindow().requestFeature(Window.FEATURE_NO_TITLE);

    Activity.setContentView(R.layout.splash2);
    tvHeader = TextView(Activity.findViewById(R.id.tv_header));
    ivImage = ImageView(Activity.findViewById(R.id.iv_image));
    tvFooter = TextView(Activity.findViewById(R.id.tv_footer));
}

function onCreate(bundle)
{
    initContentView();

    var View = Packages.android.view.View;

    tvHeader.setVisibility(View.GONE);
    tvFooter.setText("This is a temporary landing activity");

    ivImage.setImageBitmap(
        loadBitmap("scriptit://resources/temporary.png"));
}

function loadBitmap(fileUrl)
{
    var BitmapFactory = Packages.android.graphics.BitmapFactory;
    var JsUrl = Packages.com.rbowman.scriptit.lang.JsUrl;
    var Toast = Packages.android.widget.Toast;

    if (JsUrl.exists(fileUrl))
    {
        return BitmapFactory.decodeFile(JsUrl.toPath(fileUrl));
    }
    else
    {
        Toast.makeText(Activity, "File " + JsUrl.toPath(fileUrl) 
            + " does not exist!", Toast.LENGTH_SHORT).show();
        return null;
    }
}

