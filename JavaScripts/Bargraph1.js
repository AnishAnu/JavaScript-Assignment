//Define Margin
var margin={top:20, right:10,bottom:100,left:100},
           width = 700 - margin.right - margin.left,
           height = 500 - margin.top - margin.bottom;

//define SVG
var svg=d3.select('body')
        .append('svg') 
        .attr({
        	"width" : width + margin.right + margin.left,
        	"height" : width + margin.top + margin.bottom
        })  
//define g          
        .append('g')      
        .attr("transform","translate("+ margin.left +',' + margin.right + ")");

//define XScale YScale
var XScale=d3.scale.ordinal()
           .rangeRoundBands([0,width], 0.2, 0.2);

var YScale=d3.scale.linear()
.range([height, 0]);

//define Axis
var xAxis=d3.svg.axis()
          .scale(XScale)
          .orient("bottom");

var yAxis=d3.svg.axis()
.scale(YScale) 
.orient("left");

//import data
d3.json("Json_Files/AgeWiseLiteracy.json",function(error,data){
	if (error) console.log("error:data not loaded"); 

	data.forEach(function(d){
		d.Literacy= +d.Literacy;
		d.AgeGroup=d.AgeGroup;
	});	

//specify the domain of xAxis and yAxis
	XScale.domain(data.map(function(d){
		return d.AgeGroup;}) );
    YScale.domain([0,d3.max(data,function(d){
    	return d.Literacy
    })]);

 //draw the bars
    svg.selectAll('rect')
       .data(data)
       .enter()
       .append('rect')
       .attr("height",0)
       .attr("y",height)
       .transition().duration(3000)
       .delay(function(d,i) {return i * 200;})
       .attr({
       	"x": function(d) {return XScale(d.AgeGroup);},
       	"y":function(d) {return YScale(d.Literacy);},
       	"width":XScale.rangeBand(),
       	"height": function(d) {return height -YScale(d.Literacy);}
       });

       //draw the xAxis
       svg.append("g")
          .attr("class","x Axis")
          .attr("transform","translate(0,"+ height + ")")
          .call(xAxis)
          .selectAll("text")
          .attr("transform","rotate(-60)")
          .attr("dx","-.8em")
          .attr("dy",".25em")
          .style("text-anchor","end");

          //draw the xAxis
       svg.append("g")
          .attr("class","y Axis")         
          .call(yAxis)
          .style("font","12px");          
         }) ;        

