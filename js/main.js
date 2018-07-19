"use strict";

var flightJson = [];


$.ajax({ url: "./fly.json",
        context: document.body,
        success: (data) => {
          flightJson = data;
        },
        error: () => {
          alert("API FAILED!!!");
        }});
 
document.getElementById("result").classList.add("Hide");
var today = new Date().toISOString().split('T')[0];
document.getElementsByName("depart")[0].setAttribute('min', today);
document.getElementsByName("return")[0].setAttribute('min', today);

  var filterData ={};
  var search = (filterData) => {
    let arrData = "";
    let flightFound = false;
    arrData += `
                <tr class="tbHead">
                    <td >Source</td>
                    <td >Destination </td>
                    <td >Fare</td>
                    <td >Airline</td>
                </tr>
    `
    let departDate = filterData.departDate;
    let seatType = filterData.class ? filterData.class : "eco";
    let price = filterData.price ? filterData.price : 0;
    let airline = filterData.airline ? filterData.airline : "";
    flightJson.forEach((ele) => {
      let sd = new Date(ele.departDate);
      if(ele.to == filterData.to  && ele.from == filterData.from) {
          if(+sd === +departDate) {
            if ((ele.class == seatType && ele.price >= price)) {
              if(ele.airline === airline) {
                flightFound = true;
                  arrData += ` 
                                    <tr class="trbody">
                                        <td >${ele.from}</td>
                                        <td > ${ele.to}</td>
                                        <td >${ele.price}</td>
                                        <td >${ele.airline}</td>
                                    </tr>                          
                  `
                  
              } else if(!airline) {
                flightFound = true;
                  arrData += ` 
                                    <tr class="trbody">
                                        <td >${ele.from}</td>
                                        <td > ${ele.to}</td>
                                        <td >${ele.price}</td>
                                        <td >${ele.airline}</td>
                                    </tr>                          
                  `
              }
            } 
          }
        }
    });
    document.getElementById("result").classList.add("Show");
    if(flightFound){
      document.getElementById("resultData").innerHTML = arrData;
    }else{
      document.getElementById("resultData").innerHTML = "No Flight Found";
    }
  }
  ///Specific Search Criteria 
  document.getElementById('specificSearchBtn').addEventListener('click', function () {
    filterData.from = $("#selectForm").val() ?  $("#selectForm").val() : "";
    filterData.to =$("#toForm").val() ? $("#toForm").val() : "";
    filterData.departDate = $("#departDate").val() ? new Date($("#departDate").val()) : "";
    filterData.airline = $("#airline").val() ? $("#airline").val() : "";
    filterData.price = $("#price").val() ? $("#price").val() : 0;
    filterData.class = $("#classBuss").val() ? $("#classBuss").val() : "eco";
    
    search(filterData);
  });
 
  
  //Listen the click event on Search Button
  document.getElementById('btnSearch').addEventListener('click', function () {
    var filterData = {};
    filterData.from = $("#selectForm").val() ?  $("#selectForm").val() : "";
    filterData.to = $("#toForm").val() ? $("#toForm").val() : "";
    filterData.departDate = $("#departDate").val() ? new Date($("#departDate").val()) : "";
    filterData.price = $("#price").val() ? $("#price").val() : 0;
    filterData.class = $("#classBusiness").val() ? $("#classBusiness").val() : "eco";
    filterData.passenger = $("#passenger").val() ? $("#passenger").val() : "";
    filterData.airline = "";
    
    search(filterData);
  });

  /* 
  // Listen Radio button based on Oneway Twoway.
  */
  var flightWay = (e) => {
    if (document.querySelector('input[name="flightReturn"]:checked').value) {
      let radioVal = document.querySelector('input[name="flightReturn"]:checked').value;
          if (radioVal == "one") {
            $("#returnDateDiv").hide();
          }else{
            $("#returnDateDiv").show();
          }
          return radioVal || "one";
    }
  }

