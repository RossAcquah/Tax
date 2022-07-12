

//Custom function
function calculateTax() {
    
//Store the data of the inputs
var incomeAmount =document.getElementById("incomeAmount").value;
var serviceQuality = document.getElementById("serviceQuality").value;

//Quick validation
if(incomeAmount==="" || serviceQuality == 0){
    window.alert("You don't owe any Taxes");
    return; // this will prevent the function from continuing
}

//Math!
var total = (incomeAmount*serviceQuality);
total = Math.round(total*100)/100;
total= total.toFixed(2);

//Display the tax
document.getElementById("totalTax").style.display = "block";
document.getElementById("tip").innerHTML = total;

}



//Hide the tax amount on load
document.getElementById("totalTax"). style.display ="none";
document.getElementById("each"). style.display = "none";

//Clicking the button calls our custom function
document.getElementById("calculate").onclick= function(){calculateTax();};

