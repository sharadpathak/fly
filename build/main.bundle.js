"use strict";

var flightJson = [];

$.ajax({ url: "./fly.json",
  context: document.body,
  success: function success(data) {
    flightJson = data;
  },
  error: function error() {
    alert("API FAILED!!!");
  } });

document.getElementById("result").classList.add("Hide");
var today = new Date().toISOString().split('T')[0];
document.getElementsByName("depart")[0].setAttribute('min', today);
document.getElementsByName("return")[0].setAttribute('min', today);

var filterData = {};
var search = function search(filterData) {
  var arrData = "";
  var flightFound = false;
  arrData += "\n                <tr class=\"tbHead\">\n                    <td >Source</td>\n                    <td >Destination </td>\n                    <td >Fare</td>\n                    <td >Airline</td>\n                </tr>\n    ";
  var departDate = filterData.departDate;
  var seatType = filterData.class ? filterData.class : "eco";
  var price = filterData.price ? filterData.price : 0;
  var airline = filterData.airline ? filterData.airline : "";
  flightJson.forEach(function (ele) {
    var sd = new Date(ele.departDate);
    if (ele.to == filterData.to && ele.from == filterData.from) {
      if (+sd === +departDate) {
        if (ele.class == seatType && ele.price >= price) {
          if (ele.airline === airline) {
            flightFound = true;
            arrData += " \n                                    <tr class=\"trbody\">\n                                        <td >" + ele.from + "</td>\n                                        <td > " + ele.to + "</td>\n                                        <td >" + ele.price + "</td>\n                                        <td >" + ele.airline + "</td>\n                                    </tr>                          \n                  ";
          } else if (!airline) {
            flightFound = true;
            arrData += " \n                                    <tr class=\"trbody\">\n                                        <td >" + ele.from + "</td>\n                                        <td > " + ele.to + "</td>\n                                        <td >" + ele.price + "</td>\n                                        <td >" + ele.airline + "</td>\n                                    </tr>                          \n                  ";
          }
        }
      }
    }
  });
  document.getElementById("result").classList.add("Show");
  if (flightFound) {
    document.getElementById("resultData").innerHTML = arrData;
  } else {
    document.getElementById("resultData").innerHTML = "No Flight Found";
  }
};
///Specific Search Criteria 
document.getElementById('specificSearchBtn').addEventListener('click', function () {
  filterData.from = $("#selectForm").val() ? $("#selectForm").val() : "";
  filterData.to = $("#toForm").val() ? $("#toForm").val() : "";
  filterData.departDate = $("#departDate").val() ? new Date($("#departDate").val()) : "";
  filterData.airline = $("#airline").val() ? $("#airline").val() : "";
  filterData.price = $("#price").val() ? $("#price").val() : 0;
  filterData.class = $("#classBuss").val() ? $("#classBuss").val() : "eco";

  search(filterData);
});

//Listen the click event on Search Button
document.getElementById('btnSearch').addEventListener('click', function () {
  var filterData = {};
  filterData.from = $("#selectForm").val() ? $("#selectForm").val() : "";
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
var flightWay = function flightWay(e) {
  if (document.querySelector('input[name="flightReturn"]:checked').value) {
    var radioVal = document.querySelector('input[name="flightReturn"]:checked').value;
    if (radioVal == "one") {
      $("#returnDateDiv").hide();
    } else {
      $("#returnDateDiv").show();
    }
    return radioVal || "one";
  }
};
