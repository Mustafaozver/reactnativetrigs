// HashMap.js

// use a Java HashMap to hold name/value pairs.
// also, place a JavaScript dictionary into a Java
// HashMap object.

var Map = Packages.java.util.HashMap;

print ("hashmap --------------------------------");

var myMap = new Map();

myMap.put(0, "Zero");
myMap.put(1, "One");

for (var key in myMap.keySet().toArray())
{
    print(key + " = " + myMap.get(key));
}

print ("Map " + myMap);

myMap.clear();

// single statment convert JavaScript dictionary
// to Java HashMap
myMap.putAll({2 : 'Two', 3 : 'Three'});

print ("Map " + myMap);

