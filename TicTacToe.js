// TicTacToe.js

// Author: jsfiddle.net http://jsfiddle.net/5wKfF/15/
// Plus:   other small additions for winning logic.

var Toast = Packages.android.widget.Toast;
var android_R_color = Packages.android.R.color;

/*
 * Game board is represented in accending 
 * powers of 2. This reduces the board into
 * a nine-bit binary value. Winning sequences
 * are detected by checking the "wins" table.
 *
 *          1 |   2 |   4
 *       -----+-----+-----
 *          8 |  16 |  32
 *       -----+-----+-----
 *         64 | 128 | 256
 */
 
var wins = [
    1+2+4, 8+16+32, 64+128+256,
    1+8+64, 2+16+128, 4+32+256,
    1+16+256, 4+16+64];
/*
 * nearWins is two adjacent squares 
 * and the winning square. Use this table 
 * block or win against the opponent.
 */

var nearWins = [
    [1+2, 4], [1+4, 2], [1+16, 256],
    [1+256, 16], [1+8, 64], [1+64, 8],
    [2+4, 1], [2+1, 4], [2+16, 128],
    [2+128, 16],
    [4+2, 1], [4+16, 64], [4+64, 16],
    [4+32, 256], [4+256, 32],
    [8+64, 1], [8+16, 32], [8+32, 16],
    [32+16, 8], [32+256, 4],
    [64+16, 4], [64+128, 256],
    [64+256, 128],
    [128+16, 2]];

/*
 * when there are no wins or nearWins
 * then choose a preferred move.
 */

var preferredMoves = [
    16, 1, 4, 64, 256,
    2, 8, 32, 128];

var btns,
    score,
    moves,
    turn = "X",
    playComputer = true;

function initContentView()
{
    var R = Packages.com.rbowman.scriptit.R;
    var ImageButton = Packages.android.widget.ImageButton;

    Activity.setContentView(R.layout.board_3x3);
    btnRow1Col1 = ImageButton(Activity.findViewById(R.id.btn_row1_col1));
    btnRow1Col2 = ImageButton(Activity.findViewById(R.id.btn_row1_col2));
    btnRow1Col3 = ImageButton(Activity.findViewById(R.id.btn_row1_col3));
    btnRow2Col1 = ImageButton(Activity.findViewById(R.id.btn_row2_col1));
    btnRow2Col2 = ImageButton(Activity.findViewById(R.id.btn_row2_col2));
    btnRow2Col3 = ImageButton(Activity.findViewById(R.id.btn_row2_col3));
    btnRow3Col1 = ImageButton(Activity.findViewById(R.id.btn_row3_col1));
    btnRow3Col2 = ImageButton(Activity.findViewById(R.id.btn_row3_col2));
    btnRow3Col3 = ImageButton(Activity.findViewById(R.id.btn_row3_col3));
}

function onCreate(bundle)
{
    initContentView();

    Activity.setTitle("Tic Tac Toe");

    btns = {"1": btnRow1Col1, "2": btnRow1Col2, "4": btnRow1Col3,
        "8": btnRow2Col1, "16": btnRow2Col2, "32": btnRow2Col3,
        "64": btnRow3Col1, "128": btnRow3Col2, "256": btnRow3Col3};

    // assign each button click listener a unique key-value
    for (var key in btns)
    {
        btns[key].setTag(new Number(key));
        btns[key].setOnClickListener(function(view) { takeTurn(view); });
    }

    newGame();
}

function newGame()
{
    turn = "X";
    score = {"X": 0, "O": 0};
    moves = 0;

    for (var key in btns)
        clearImageButton(btns[key])
}

function clearImageButton(imageButton)
{
    imageButton.setClickable(true);
    imageButton.setImageResource(android_R_color.transparent)
}

function setImageButton(imageButton)
{
    var imageUrl = "scriptit://resources/" + ((turn == "X") ? "x.png" : "o.png");

    imageButton.setClickable(false);
    imageButton.setImageBitmap(loadBitmap(imageUrl));
}

function takeTurn(imageButton)
{
    var cell = imageButton.getTag();

    setImageButton(imageButton);

    score[turn] += cell;
    moves += 1;

    if (hasWon(score[turn]))
    {
        alert("Tic Tac Toe", turn + " wins!");
    } 
    else if (moves === 9)
    {
        alert("Tic Tac Toe", "Cat's game, tie!");
    }
    else 
    {
        turn = (turn === "X") ? "O" : "X";

        if (playComputer && turn ==="O")
        {
            delayThenAction(1000, function ()
            { 
                computerTurn();
            });
        }
    }
}

function computerTurn()
{
    humanTurn = (turn === "X") ? "O" : "X";

    // first, try to win
    for (var i = nearWins.length - 1; i >= 0; i--)
    {
        if (((nearWins[i][0] & score[turn]) === nearWins[i][0]) &&
            ((nearWins[i][1] & score[turn]) == 0) &&
            ((nearWins[i][1] & score[humanTurn]) == 0))
        {            
            takeTurn(btns[nearWins[i][1]], nearWins[i][1]);
            return;
        }
    }

    // next, try to block
    for (var i = nearWins.length - 1; i >= 0; i--)
    {
        if (((nearWins[i][0] & score[humanTurn]) === nearWins[i][0]) &&
            ((nearWins[i][1] & score[humanTurn]) == 0) &&
            ((nearWins[i][1] & score[turn]) == 0))
        {
            takeTurn(btns[nearWins[i][1]], nearWins[i][1]);
            return;
        }
    }

    // last, select an open square
    for (var i = 0 ; i < preferredMoves.length; i++)
    {
        if (((preferredMoves[i] & score[humanTurn]) == 0) &&
            ((preferredMoves[i] & score[turn]) == 0)) {

            takeTurn(btns[preferredMoves[i]], preferredMoves[i]);
            return;
        }
    }
}

function hasWon(score)
{
    for (var i = wins.length - 1; i >= 0; i--)
        if ((wins[i] & score) === wins[i])
            return true;

    return false;
}

function loadBitmap(fileUrl)
{
    var BitmapFactory = Packages.android.graphics.BitmapFactory;
    var JsUrl = Packages.com.rbowman.scriptit.lang.JsUrl;

    if (JsUrl.exists(fileUrl))
    {
        return BitmapFactory.decodeFile(JsUrl.toPath(fileUrl));
    }
    else
    {
        Toast.makeText(Activity, "File " + jsUrl.toPath(fileUrl)
            + " does not exist!", Toast.LENGTH_SHORT).show();
    }
}

function alert(title, message)
{
    var AlertDialog = Packages.android.app.AlertDialog;

    with (new AlertDialog.Builder(Activity))
    {
        setTitle(title);
        setMessage(message);
        setPositiveButton("OK", function()
        { 
            delayThenAction(2000, function()
            { 
                newGame(); 
            });
        });
        show();
    }
}

function delayThenAction(delayInterval, action)
{
    var Handler = Packages.android.os.Handler;

    (new Handler())
        .postDelayed(function()
    {
        action();

    }, delayInterval);	// delay in milliseconds.
}

