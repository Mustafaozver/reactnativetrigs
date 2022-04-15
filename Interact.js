// Interact.js

// examples of: alert, confirm, print and prompt.

var questions = 
    ["What is your name?",
    "How old are you?",
    "What is your favorite color?"];

var answers = new Array(questions.length);
var conversation = "Questions\n";

if (confirm("I have the time to answer " + questions.length 
    + " questions."))
{
    for (i = 0; i < questions.length; i++)
    {
        answers[i] = prompt(conversation + "\n" + questions[i]);
       
        if (answers[i] == null)
            answers[i] = "skipped";
        
        if (answers[i].length == 0)
            answers[i] = "blank";

        conversation += "\n" + questions[i] + " " + answers[i]; 
    }
    
    if (prompt("Please print my answers.", "Yes") == "Yes")
        print (conversation);
    
    alert("Thank you for answering a few questions.");
}
else
    alert("Understood. Come back when you have some time.");
