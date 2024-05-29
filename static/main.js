document.getElementById('isExpense').addEventListener('change', function() {
    if(this.value === "0") {
        document.getElementById('exCategory').value = '';
        document.getElementById('o0').disabled = true;
        document.getElementById('o1').disabled = true;
        document.getElementById('o2').disabled = true;
        document.getElementById('o3').disabled = false;
        document.getElementById('o4').disabled = false;
        document.getElementById('o5').disabled = false;
    } else {
        document.getElementById('exCategory').value = '';
        document.getElementById('o0').disabled = false;
        document.getElementById('o1').disabled = false;
        document.getElementById('o2').disabled = false;
        document.getElementById('o3').disabled = true;
        document.getElementById('o4').disabled = true;
        document.getElementById('o5').disabled = true;
    }
});


/*document.getElementById('isExpense').addEventListener('change', function() {
    if(this.value === "0") {
        document.getElementById('exCategory').style.display = "none";
        document.getElementById('exCategory').value = '';
        document.getElementById('inCategory').style.display = "block";
    } else {
        document.getElementById('inCategory').style.display = "none";
        document.getElementById('inCategory').value = '';
        document.getElementById('exCategory').style.display = "block";
    }
});*/