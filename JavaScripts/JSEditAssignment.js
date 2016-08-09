var fs = require("fs");
var input = "Json_Files/outputJson.json";
var tempData;
var res = [];
var ages = {};
var obj = [];
var arr = [];
fs.readFile(input, function(err, data) {
    if (err)
        throw err;

    data = data.toString(); //convert the original data into string
    tempData = JSON.parse(data); //store into temporary var

    //Array for EducationLevel wise for males & females
    var educationlevel = {
        "Educational level - Literate without educational level - Males": 0,
        "Educational level - Literate without educational level - Females": 0,
        "Educational level - Below Primary - Males": 0,
        "Educational level - Below Primary - Females": 0,
        "Educational level - Primary - Males": 0,
        "Educational level - Primary - Females": 0,
        "Educational level - Middle - Males": 0,
        "Educational level - Middle - Females": 0,
        "Educational level - Matric/Secondary - Males": 0,
        "Educational level - Matric/Secondary - Females": 0,
        "Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Males": 0,
        "Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Females": 0,
        "Educational level - Non-technical diploma or certificate not equal to degree - Males": 0,
        "Educational level - Non-technical diploma or certificate not equal to degree - Females": 0,
        "Educational level - Graduate & above - Males": 0,
        "Educational level - Graduate & above - Females": 0,
        "Educational level - Unclassified - Males": 0,
        "Educational level - Unclassified - Females": 0
    }
     
     // 1.Age-wise population distribution in terms of literate population    
    for (var i = 0, len = tempData.length; i < len; i++) 
    {
        var listHead = tempData[i]; // store the wholedata into listhead
        var ageList = listHead["Age-group"]; //store the Agegroup into ageList
        if (ageList != "All ages")
        {
         if (ages.hasOwnProperty(ageList))
          {
            //store the agegroup and literate person into ages
            ages[ageList] = parseInt(ages[ageList]) + parseInt(tempData[i]["Literate - Persons"]);
          }
          else
          {
            ages[ageList] = parseInt(tempData[i]["Literate - Persons"]);
          }
        } //end of if-----------------
         else 
         {
           for (var column in educationlevel) 
           {
                //store the corresponding heading and the educationlevel gender-wise
                educationlevel[column] = parseInt(listHead[column]) + parseInt(educationlevel[column]);
           }
         } //end of else
    }   // end of for-loop

    //  Json-File foAge-wise population distribution in terms of literate population
    for (var j in ages) {
        if (ages.hasOwnProperty(j)) {
            res.push({ "AgeGroup": j, "Literacy": ages[j] });
        }
    }
    fs.writeFile("Json_Files/AgeWiseLiteracy.json", JSON.stringify(res), function(err) {
        if (err)
            throw err;
    });

    // 2. Json for Graduate Population of India - State-wise & Gender-wise.
    for (var value in educationlevel)
    {
      if (educationlevel.hasOwnProperty(value))
      {
        obj.push({ "x1": value, "y1": educationlevel[value] });
      }
    }
    fs.writeFile("Json_Files/EducationLevelGenger.json", JSON.stringify(obj), function(err) {
        if (err)
            throw err;
    });
    // function sum for find the educategory
    var findSum = function(cat, callback) {
        var sum = 0;
        for (var i = 0, len = tempData.length; i < len; i++) {
            var val = parseInt(tempData[i][cat]); //store the corresponding Category and value
            if (!isNaN(val)) {
                sum = sum + val;
            }
        }
        callback(sum);  //calling fuction again
    }

    // 3.Education Category wise - all India data combined together
    //Create ArrayOfObject Categories
    var categories = [
        "Educational level - Literate without educational level - Persons",
        "Educational level - Below Primary - Persons",
        "Educational level - Primary - Persons",
        "Educational level - Middle - Persons",
        "Educational level - Matric/Secondary - Persons",
        "Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons",
        "Educational level - Non-technical diploma or certificate not equal to degree - Persons",
        "Educational level - Technical diploma or certificate not equal to degree - Persons",
        "Educational level - Graduate & above - Persons",
        "Educational level - Unclassified - Persons",
    ];

    for (var i = 0, len = categories.length; i < len; i++) {
        var cat = categories[i];
        var obj1 = {};
        var index1 = cat.indexOf("-"); //finding  the - symbol
        var str = cat.substring(index1 + 1).trim(); //taking First position.remove space
            
        //Using function calculate sum od Education-Level
        findSum(cat, function(sum) { obj1["EducationLevel"] = str, obj1["Sum"] = sum; });
        arr.push(obj1);  
    }
      // 3. json-Education Category wise - all India data combined together
    fs.writeFile("Json_Files/EduCationCategory.json", JSON.stringify(arr), function(err) {
        if (err)
            throw err;
    });
});
