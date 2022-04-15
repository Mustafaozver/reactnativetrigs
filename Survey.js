// Survey.js - Example product survey

var PROMPT = 1;
var CHOICE_SINGLE = 2;
var CHOICE_MULTIPLE = 3;
var ALERT = 4;

var GENDER = [
    "Male",
    "Female"];

var AGE = [
    "12 or younger - Child",
    "13 to 19 - Teen",
    "20 to 29 - Young adult",
    "30 to 39 - Thirtysomething",
    "40 or older - Ancient"];

var ANIMALS = [
    "Armadillo",
    "Ardvarc",
    "Bear",
    "Bird",
    "Zillowbear",
    "Cat",
    "Dog",
    "Elephant",
    "Frog",
    "Hamster",
    "Horse", 
    "Kangaroo",
    "Koala",
    "Lion",
    "Lizard",
    "Monkey",
    "Opossum",
    "Rat",
    "Rhino",
    "Snake",
    "Spider",
    "Tiger",
    "Turtle",
    "Worm"];
    
var RATING = [
    "1 - Horrible.",
    "2 - Not good.",
    "3 - Average.",
    "4 - Good experience.",
    "5 - Extremely satisfied."];

var SURVEY = [
    [PROMPT, "Name?", "Joe"],
    [CHOICE_SINGLE, "Gender", GENDER, [0]],
    [CHOICE_SINGLE, "Age?", AGE, [0]],
    [CHOICE_MULTIPLE, "Favorite Animals?", ANIMALS, [2, 4, 6]],
    [CHOICE_SINGLE, "Rate this survey?", RATING, [2]],
    [ALERT, "Thanks for taking this survey"]];

var result;

print ("Survey ------------------");

for (var i = 0; i < SURVEY.length; i++)
{
    switch (SURVEY[i][0])
    {
        case PROMPT:
            result = prompt(SURVEY[i][1], SURVEY[i][2]);
            if (result != null)
                print(i + ": " + SURVEY[i][1] + " " + result);
            else
                print(i + ": " + SURVEY[i][1] + " " + "not answered");
            break;
            
        case CHOICE_SINGLE:
            result = choice(SURVEY[i][1], SURVEY[i][2], SURVEY[i][3]);
            if (result != -1)
                print(i + ": " + SURVEY[i][1] + " " + SURVEY[i][2][result]);
            else
                print(i + ": " + SURVEY[i][1] + " " + "not answered");
            break;
            
        case CHOICE_MULTIPLE:
            result = multipleChoice(SURVEY[i][1], SURVEY[i][2], SURVEY[i][3]);
            if (result.length)
                for (var j = 0; j < result.length; j++)
                    print (i + ": " + SURVEY[i][1] + " " + SURVEY[i][2][result[j]]);
            else
                print (i + ": " + SURVEY[i][1] + " " + "not answered");
            break;
            
        case ALERT:
            alert(SURVEY[i][1]);
            print (i + ": " + SURVEY[i][1]);
            break;
    }
}
