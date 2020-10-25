// Header
var header = $('.header');
$(window).scroll(function(e){
    if(header.offset().top !== 0){
        if(!header.hasClass('shadow')){
            header.addClass('shadow');
        }
    }else{
        header.removeClass('shadow');
    }
});

//  Shopping Cart 
var products = [
    {
        name: "BBC micro: bit",
        tag: "bbcMicrobit",
        price: 1500,
        qty: 1
    },
    {
        name: "Arduino Uno R3",
        tag: "arduino",
        price: 600,
        qty: 1
    }
]

localStorage.setItem("products",JSON.stringify(products));

let totalAmt = 2100;

    let add = document.querySelectorAll('.add');
    for (let i=0; i < add.length; i++){
        add[i].addEventListener('click', ()=>{
            increment(products[i],i);
        })
    }
    let remove = document.querySelectorAll('.remove');
    for (let i=0; i < remove.length; i++){
        remove[i].addEventListener('click', ()=>{
            decrement(products[i],i);
        })
    }
var ttl = document.querySelectorAll('.ttl');


function increment(product,index){
    console.log(index)
    product.qty += 1;
    price = parseInt(product.price);
    total = price * product.qty;
    totalAmt += parseInt(product.price);
    console.log(product);
    ttl[index].textContent = total;
    document.getElementById("ttlAmt").innerHTML = totalAmt;
    console.log(totalAmt);
}
function decrement(product,index){
    if(product.qty > 0){
        product.qty -= 1;
        price = parseInt(product.price);
        total = price * product.qty;
        totalAmt -= parseInt(product.price);
        console.log(product);
        ttl[index].textContent = total;
        document.getElementById("ttlAmt").innerHTML = totalAmt;
        console.log(totalAmt);
    }
    else{
        alert("product qty cannot go below zero")
    }
}

// Shipping Address
$('#shipping-address').hide(); 
function show(){
    $('#shipping-address').show(); 
}
// Select which shipping address and deslect the remaining
function selected(id){
    $('#del'+id).text("Selected");
    $('#del'+id).addClass('selected');
    var del = document.querySelectorAll('.deliver');
    for(var i=0;i<del.length;i++){
        if((i+1)!=id){
            $('#del'+(i+1)).removeClass('selected');
            $('#del'+(i+1)).text("Deliver to this address");
        }
    }
}
/* add shipping address modal */
$('#addNewShippingAddress').hide(); 
function addShipping(){
    $('#addNewShippingAddress').show(); 
}
alert("working!")