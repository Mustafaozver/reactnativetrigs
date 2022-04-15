// PickImage.js

// will make user select an image and
// scale down (downsample) the image to 
// avoid memory errors.

var Intent = Packages.android.content.Intent;
var Bitmap = Packages.android.graphics.Bitmap;
var BitmapFactory = Packages.android.graphics.BitmapFactory;
var ImageView = Packages.android.widget.ImageView;

var SELECT_PHOTO = 100;
var ivBody = null;

function onCreate(bundle)
{
    ivBody = new ImageView(Activity);
    Activity.setContentView(ivBody);

    Activity.setTitle("Select an image");
    
    pickImage(SELECT_PHOTO);
}

function onActivityResult (requestCode, resultCode, data)
{
    if (requestCode == SELECT_PHOTO)
    {
        var selectedImage = data.getData();
        Activity.setTitle("Image " + selectedImage);
        ivBody.setImageBitmap(downSampleImage(selectedImage));
    }
}

function pickImage(requestCode)
{
    var photoPickerIntent = new Intent(Intent.ACTION_PICK);
    photoPickerIntent.setType("image/*");
    Activity.startActivityForResult(photoPickerIntent, requestCode);  
}

// Avoid OutOfMemory errors by down sampling
function downSampleImage(selectedImage)
{
    // Decode image size
    o = new BitmapFactory.Options();
    o.inJustDecodeBounds = true;
    BitmapFactory.decodeStream(Activity.getContentResolver().openInputStream(selectedImage), null, o);

    // The new size we want to scale to 140 x 140
    var REQUIRED_SIZE = 140;

    // Find the correct scale value. It should be the power of 2.
    var width_tmp = o.outWidth; 
    var height_tmp = o.outHeight;
    var scale = 1;
        
    while (true) 
    {
        if (width_tmp / 2 < REQUIRED_SIZE || height_tmp / 2 < REQUIRED_SIZE) 
            break;
            
        width_tmp /= 2;
        height_tmp /= 2;
        scale *= 2;
    }

    Activity.setTitle("Image " + selectedImage + ", SampleSize = " + scale + " (" + width_tmp + " x " + height_tmp + ")");

    // Decode with inSampleSize
    o2 = new BitmapFactory.Options();
    o2.inSampleSize = scale;
    return BitmapFactory.decodeStream(Activity.getContentResolver().openInputStream(selectedImage), null, o2);
}


