// Make connection
var socket = io.connect('http://localhost:4000');

var submitBtn = document.getElementById('submit')
var btn = document.getElementById('make-connection');
var btn1 = document.getElementById('share-data');
var btn2 = document.getElementById('disconnect');


function updateIncome(){
    var income = document.getElementById("income");
    localStorage.setItem("income",income.value);
    document.getElementById("income-output").innerHTML = `Income (Rs): ${income.value}`;
}

function addData(){
    var expenseAmount = document.getElementById("expense-amount");
    var expenseReason = document.getElementById("expense-reason");
    var timestamp = + new Date();
    localStorage.setItem(timestamp.toString(),`expenseAmount':${expenseAmount},'expenseReason':${expenseReason}`)
    var tag = document.createElement("p");
    var text = document.createTextNode("Expense Amount (Rs): "+expenseAmount.value+" Rs Expense Reason: "+expenseReason.value);
    tag.appendChild(text);
    var element = document.getElementById("content");
    element.appendChild(tag);
    

}

function loadData(){
    //var 
}


// store email and password in local storage
function store(){
    var email= document.getElementById("email");
    var password = document.getElementById("password");
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(password.value);
    var hash = hashObj.getHash("HEX")
    localStorage.setItem("p2p-email", email.value);
    localStorage.setItem("p2p-password",hash);
};

// Emit events
btn.addEventListener('click', function(){
    socket.emit('make-connection', {
        email: localStorage.getItem("p2p-email"),
        key: localStorage.getItem("p2p-password")
    });
});

btn1.addEventListener('click', function(){
    socket.emit('share-data', {
        email: localStorage.getItem("p2p-email"),
        key: localStorage.getItem("p2p-password"),
        msg: 'hi'
    })
});

btn2.addEventListener('click', function(){
    socket.emit('remove', {
        email: localStorage.getItem("p2p-email"),
        key: localStorage.getItem("p2p-password"),
    });
    localStorage.removeItem("p2p-email");
    localStorage.removeItem("p2p-password");
})

// Listen for events
socket.on('data', function(data){
    console.log(data);
});
