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
// $('#shipping-address').hide(); 
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
// /* add shipping address modal */
$('#addNewShippingAddress').hide(); 
function addShipping(){
    $('#addNewShippingAddress').show(); 
}
let deliveryCount = 3;
let billingCount = 0;
function addAddress(id){
    let name = document.getElementById(id+"Name").value;
    let address = document.getElementById(id+"Address").value;
    console.log("address====",address);
    // shippingName_ billingName_
    let nameHTML = "";
    let addressHTML = "";
    let deliverHTML = "";
    let iconsHTML = "";
    if(id==="shipping"){
        deliveryCount += 1;
        nameHTML = `<h4 id='${id}Name${deliveryCount}'>${name}</h4>`;
        addressHTML = `<address id='${id}Address${deliveryCount}'>${address}</address>`;
        deliverHTML = `<button class="deliver" id="del${deliveryCount}" onclick="selected(${deliveryCount})">
                            Deliver to this address
                        </button> `; 
        iconsHTML = `
                    <div class="icons">
                    <i class="small material-icons" id="${id}Del${deliveryCount}" onclick="onDelete(id)">delete</i>
                    <i class="small material-icons" id="${id}Edit${deliveryCount}">edit</i>
                    </div>`;  
    }else{
        billingCount += 1;
        nameHTML = `<h4 id='${id}Name${billingCount}'>${name}</h4>`;
        addressHTML = `<address  id='${id}Address${billingCount}'>${address}</address>`;
        deliverHTML = `<button class="deliver" id="bill${billingCount}" onclick="selectedBill(${billingCount})">
                            Select
                        </button> `;  
                        //  
        iconsHTML = `
                    <div class="icons">
                    <i class="small material-icons" id="${id}Del${billingCount}" onclick="onDelete(id)">delete</i>
                    <i class="small material-icons" id="${id}Edit${billingCount}">edit</i>
                    </div>`;  
    }
    let newAddressHTML; 
    if(id==="shipping"){
        newAddressHTML = `<div class="address" id="${id}Add${deliveryCount}">`+nameHTML+addressHTML+deliverHTML+iconsHTML+`</div>`;
        $('.addresses').append(newAddressHTML);
        $('#addNewShippingAddress').hide(); 
        clearForm("shipping");
    }else{
        $('.bill-head').show();
        newAddressHTML = `<div class="address"  id="${id}Add${billingCount}">`+nameHTML+addressHTML+deliverHTML+iconsHTML+`</div>`;
        $('.billingAddresses').append(newAddressHTML);
        $('#addNewBillingAddress').hide(); 
        clearForm("billing");
    }
}   

function clearForm(name){
    document.getElementById(name+"Name").value = "";
    document.getElementById(name+"Address").value = "";
}

function closeWindow(id){
    var flag = id.search("Billing");
    // alert(flag);    
    if(flag>0){
        // Billing
    $('#'+id).hide(); 
    $('#billingAddressCheck').prop('checked',true);
    clearForm("billing");
    }
    else{
        // Shipping
        $('#'+id).hide(); 
        clearForm("shipping");
    }
}

function onDelete(id){
    console.log(id);
    var no = id.slice(-1);
    var flag = id.search("billing");
    console.log(flag,id)
    if(flag>=0){
        $("#billingAdd"+no).hide();
    }else{
        $("#shippingAdd"+no).hide();
        console.log("#shippingAdd"+no);
    }
}

// Billing Address
$('#addNewBillingAddress').hide(); 
let checkFlag = true;
$('.bill-head').hide();
function billingAdress(){
    let flag = $('#billingAddressCheck').prop('checked');
    if(flag == false){
        if(checkFlag){
            $('#addNewBillingAddress').show(); 
            checkFlag = false;
        }else{
            console.log("flag",flag,"checkFlag",checkFlag);
            $('.bill-head').show();
                $('.billingAddresses .address').show();
        }
    }else{
        // alert(flag);
        console.log("flag",flag,"checkFlag",checkFlag);
        if(checkFlag){
            closeWindow("addNewBillingAddress");
            $('#billingAddressCheck').prop('checked',true);
            clearForm("billing");
        }else{
                $('.bill-head').hide();
                $('.billingAddresses .address').hide();
                
        }
    }
}

function selectedBill(id){
    $('#bill'+id).text("Selected");
    $('#bill'+id).addClass('selected');
    // var del = document.querySelectorAll('.deliver');
    // for(var i=0;i<del.length;i++){
    //     if((i+1)!=id){
    //         $('#del'+(i+1)).removeClass('selected');
    //         $('#del'+(i+1)).text("Deliver to this address");
    //     }
    // }
}
// alert("working!")