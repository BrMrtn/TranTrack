// Enable/disable fields based on if the category is income or expensed
document.getElementById('isExpense').addEventListener('change', function() {
    if(this.value === "0") {
        document.getElementById('o0').selected = true;
        document.getElementById('o1').disabled = true;
        document.getElementById('o2').disabled = true;
        document.getElementById('o3').disabled = true;
        document.getElementById('o4').disabled = false;
        document.getElementById('o5').disabled = false;
        document.getElementById('o6').disabled = false;
    } else if(this.value === "1"){
        document.getElementById('o0').selected = true;
        document.getElementById('o1').disabled = false;
        document.getElementById('o2').disabled = false;
        document.getElementById('o3').disabled = false;
        document.getElementById('o4').disabled = true;
        document.getElementById('o5').disabled = true;
        document.getElementById('o6').disabled = true;
    }
});