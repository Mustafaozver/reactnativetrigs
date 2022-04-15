// EmailAccounts.js

var TextView = Packages.android.widget.TextView;
var AccountManager = Packages.android.accounts.AccountManager;

var body = null;

function onCreate(bundle)
{
    tvBody = new TextView(Activity);
    tvBody.setText(GetEmailAccounts());

    Activity.setContentView(tvBody);
    Activity.setTitle("Email Accounts");
}

function GetEmailAccounts()
{
    body = "";

    var accounts = AccountManager
        .get(Activity)
        .getAccountsByType("com.google");

    if (accounts == null || accounts.length == 0)
        return body;

    for (i = 0; i < accounts.length; i++)
        body += "\n" + accounts[i].name;

    return body;
}

