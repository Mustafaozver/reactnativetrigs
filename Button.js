// Button.js

var Button = Packages.android.widget.Button;
var Toast = Packages.android.widget.Toast;

function onCreate(bundle)
{
    var button = new Button(Activity);

    button.setText("the button");
    button.setOnClickListener(function(view)
    { 
        Toast.makeText(Activity, "Clicked", 
            Toast.LENGTH_SHORT).show();
    });

    Activity.setContentView(button);
    Activity.setTitle("Simple Button");
}

