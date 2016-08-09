var fs = require("fs");
var jsonData=[];
var csVdata=fs.readFileSync('csvFile/India2011.csv'); //read and syn file
var stringData=csVdata.toString();                    //convert to string
var lines=stringData.split('\r\n');      //store into line by each rows of data
var header=lines[0].split(',');
//console.log(header);
var totrows=lines.length;    //3047
var norows=0;
for(var i=1;i<totrows;i++)  //iterating upto 3047
{
	var line=lines[i];
	if(line!=null&& line!=''&&line.length!=0)
	{
		norows++;
		var data=line.split(",");
		jsonData.push(data);
	}
}
//console.log(jsonData);

//1.Age-wise population distribution in terms of literate population
  agewiseliteracy(jsonData);
  function agewiseliteracy(jsonData){
	var arrayOfAge=[];
	var sumOfage=0;
	var ageCategory=[];
	var b=[];
    for (var k = 0; k < jsonData.length; k++)  //iteration for storing the Age Category
    {
	 ageCategory[k]=jsonData[k][5];
    }
	 var agearrayrow=jsonData.length;//3047
    for( var j=0;j<30;j++)  //30 Category of ages are in this file
    {
	  if(ageCategory[j]!="All ages")
	  {
		for(var i=0;i<jsonData.length;i++) //iterating up to 3047 times
		{
			if(ageCategory[j]==jsonData[i][5])
			{
				if(jsonData[i][4]=="Total")
    			{
	     			if(jsonData[i][5]!="All ages")
		    		{
			        	sumOfage=sumOfage+parseInt(jsonData[i][12]);
			        }
        		}
    		}
		}  //end of inner for-loop    		
    		b[j]={ groupage: ageCategory[j],literatepersons:sumOfage}; //json format
	   }  //end if
    }// end of outer for-loop
        fs.writeFileSync("Json_Files/AgeWiseLiteracyData.json",JSON.stringify(b),encoding="utf8");
 } // end of agewiseliteracy function

 //2.Graduate Population of India - State-wise & Gender-wise.

  graduatepopulation(jsonData);
  function graduatepopulation(jsonData) {
	var statecodearray=[];
	var distinctstatecode=[];
	var statename=[];
	var distinctstatename=[];
	for(var k=0;k<jsonData.length;k++)
	{
			statecodearray[k]=jsonData[k][1];  //store the statecode into arename array
			statename[k]=jsonData[k][3]; //store the statename into statename array
	}
	for(var b=0;b<statecodearray.length;b++)
	{
			if(statecodearray[b]!=statecodearray[b+1])
			{
				distinctstatecode.push(statecodearray[b]);
			}		
	}
    for(var b=0;b<statename.length;b++)
	{
			if(statename[b]!=statename[b+1])
			{
	     		distinctstatename.push(statename[b]);
			}
	}
	var literatemale=[];  //for storing males literacy
    var literatefemale=[]; // for storing females literacy
    var c=[];
    var m=[];
    var h=0;
    for(var u=0;u<jsonData.length;u++)
    {
	  if(jsonData[u][4]=="Total"&&jsonData[u][3]==distinctstatename[h])
	  {
		if(jsonData[u][5]=="All ages")
		{
			c[u]={nameofthestate:distinctstatename[h],GraduationPopulationOfMales:jsonData[u][40],GraduatePopulationOfFemales:jsonData[u][41]};
			m.push(c[u]); //store the distinct data into array m
		}
		h++;
	  }
	} //end of for-loop
     fs.writeFileSync("Json_Files/GraduateMales&FemalesData.json",JSON.stringify(m),encoding="utf8");
    //console.log(m);
} //end of Graduate Population of India - State-wise & Gender-wise.

//3.Education Category wise - all India data combined together
    educationcategorywise(jsonData);
    function educationcategorywise(jsonData){
    	var statename=[];
    	var distinctstatename=[];
    	var ageCategory=[];
    	var distinctAgeCategory=[];
        var BelowPrimary=[];
        var sa=[];
        var a=[];
    for (var i = 0; i < jsonData.length; i++)
    {
    	statename[i]=jsonData[i][3]; // store statename into array
    	ageCategory[i]=jsonData[i][5];    	// store age category into array
    }
    for (var j = 0; j < statename.length; j++)
    {
          	if(statename[j]!=statename[j+1])
			{
	     		distinctstatename.push(statename[j]);
			}	
  	}
  	for (var k = 0; k < ageCategory.length; k++)
    {
          	if(ageCategory[k]!=ageCategory[k+1])
			{
	     		distinctAgeCategory.push(ageCategory[k]);
			}	
  	}
  	//console.log(distinctAgeCategory);
    var h=0;
    var sumOfBelowPrimary=0;
    var Primary=0;
    var sumOfPrimary=0;
    var Middle=0;
    var sumOfMiddle=0;
    var Matric=0;
    var sumOfMatric=0;
    var HigherSecondary=0;
    var sumOfHigherSecondary=0;
    var Dipolma=0;
    var sumOfDipolma=0;
    var TechDipolma=0;
    var sumOfTechDipolma=0;
    var GraduateAbove=0;
    var sumOfGraduateAbove=0;
    var Unclassified=0;
    var sumOfUnclassified=0;

  	for (var m = 0; m < jsonData.length; m++)
  	 {
  	 	if (jsonData[m][4]=="Total"&&jsonData[m][3]==distinctstatename[h]) 
  	 	{
  	 		if (jsonData[m][5]=="All ages") 
  	 		{
               sumOfBelowPrimary=sumOfBelowPrimary+parseInt(jsonData[m][18]);
  	 		}
  	 		h++;
  	 	}
  	 } //end of Below Primary
  	 console.log(sumOfBelowPrimary);


  	for (var m = 0; m < jsonData.length; m++)
  	 {
  	 	if (jsonData[m][4]=="Total"&&jsonData[m][3]==distinctstatename[h]) 
  	 	{
  	 		if (jsonData[m][5]=="All ages") 
  	 		{
               sumOfPrimary=sumOfPrimary+parseInt(jsonData[m][21]);
  	 		}
  	 		Primary++;
  	 	}
  	 } //end of Primary
  	 console.log(sumOfPrimary);

  	 for (var m = 0; m < jsonData.length; m++)
  	 {
  	 	if (jsonData[m][4]=="Total"&&jsonData[m][3]==distinctstatename[h]) 
  	 	{
  	 		if (jsonData[m][5]=="All ages") 
  	 		{
               sumOfMiddle=sumOfMiddle+parseInt(jsonData[m][24]);
  	 		}
  	 		h++;
  	 	}
  	 } //end of Middle
  	 console.log(sumOfMiddle);
}	


