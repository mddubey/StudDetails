var showErrorMessge = function(message){
    document.getElementById('error').textContent = message;
    document.getElementById('error').style.backgroundColor = 'orange';
    document.getElementById('error').style.fontSize = "170%";
    document.getElementById('error').style.width = "600px";
}

var validateRoll = function(){
    var roll = document.getElementsByName("rollNo")[0].value;
    if(!/^\d+$/.test(roll)){
        showErrorMessge('Invalid Roll Number.... Only give Integer value');
        return false;
    }
    return true;
};

var validateUser = function(){
    var userName = document.getElementsByName("userID")[0].value;
    var password = document.getElementsByName("password")[0].value;
    if(userName && password)
        return true;
    showErrorMessge('User Name & Password are mandatory');
    return false;
};

var validateInputs = function(){
    var percent = document.getElementsByName("percentage")[0].value;
    var roll = document.getElementsByName("rollNo")[0].value;
    var name = document.getElementsByName("name")[0].value;
    if(!/^\d+$/.test(roll)){
        showErrorMessge('Invalid roll number.... Give Integer values');
        return false;
    }
    if(!(/^[a-zA-Z]*[a-zA-Z.]+[a-zA-Z0-9]*$/.test(name))){
        showErrorMessge('Invalid name.. Give Proper Name');
        return false;
    }
    if((isNaN(percent)) || percent<0 ||percent>100){
        showErrorMessge("It's invalid Percentage... Use only Numeric Values between 0-100");
        return false;
    };
    return true;
};