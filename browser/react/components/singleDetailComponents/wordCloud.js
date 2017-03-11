// import React from 'react';
// import d3 from 'd3';
//
// var words = [
//   "Hello", "world", "normally", "you", "want", "more", "words",
//   "than", "this"]
//
// var cloud = d3.cloud()
//     .size([500, 500])
//     .words(words.map(function(d) {
//       return {text: d, size: 10 + Math.random() * 90, test: "haha"};
//     }))
//     .padding(5)
//     .font('Times New Roman')
//     .fontSize(function(d) { return d.size; })
//     .on("end", draw);
//
// const draw = function(){
//   d3.select('body').append('svg')
//       .attr("width", layout.size()[0])
//       .attr("height", layout.size()[1])
//       .append("g")
//       .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
//       .selectAll("text")
//       .data(words)
//       .enter().append("text")
//       .style("font-size", function(d) { return d.size + "px"; })
//       .style("font-family", "Impact")
//       .style("fill", function(d, i) { return fill(i); })
//       .attr("text-anchor", "middle")
//       .text(function(d) { return d.text; });
// }
//
// export default function(){
//   return (
//     cloud()
//   );
// }
