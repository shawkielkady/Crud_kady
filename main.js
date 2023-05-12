let title =document.getElementById('title');
let price =document.getElementById('price');
let Taxes =document.getElementById('Taxes');
let Ads =document.getElementById('Ads');
let total =document.getElementById('total');
let count =document.getElementById('count');
let Discount =document.getElementById('Discount');
let cat =document.getElementById('cat');
let submit =document.getElementById('submit');
let mode = 'create';
let tmp;
//GET total
function getTotal(){
    if(price.vlue != ''){
        let result = (+price.value + +Taxes.value + +Ads.value) - +Discount.value;
        total.innerHTML= result;
        total.style.backgroundColor='#040'
    }
    else{
        total.innerHTML= '';
        total.style.backgroundColor='#a00d02'
    }
}
//Create ptoduct
let product ;
if(localStorage.product != null){
    product=JSON.parse(localStorage.product);
}
else{
    product=[];
}
submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        Taxes:Taxes.value,
        Ads:Ads.value,
        total:total.innerHTML,
        count:count.value,
        Discount:Discount.value,
        cat:cat.value.toLowerCase(),
    }
    if( title.value !='' && 
        price.value!='' 
        && cat.value!=''
        && newpro.count<100
        ){
    if(mode ==='create'){
    if(newpro.count > 1){
        for(let i=0 ; i< newpro.count;i++){
        product.push(newpro);
    }
    }
    else{
        product.push(newpro);
    }
    clearInputs();
}
}
    else{
        product[tmp]=newpro;
        mode ='create'
        submit.innerHTML='Create'
        count.style.display='block';
    }
    //Save local storage
    localStorage.setItem('product', JSON.stringify(product));
    console.log(newpro);
    showData();
}
//CLEAR inputs
function clearInputs(){
    title.value='';
    price.value='';
    Taxes.value='';
    Ads.value='';
    count.value='';
    cat.value='';
    Discount.value='';
    total.innerHTML=''
    total.style.backgroundColor='#a00d02'
}
//count
//read
function showData(){
    getTotal();
    let table='';
    for(let i=0;i<product.length;i++){
        table += `<tr>
        <td>${i+1}</td>
        <td>${product[i].title}</td>
        <td>${product[i].price}</td>
        <td>${product[i].Taxes}</td>
        <td>${product[i].Ads}</td>
        <td>${product[i].Discount}</td>
        <td>${product[i].total}</td>
        <td>${product[i].cat}</td>
        <td><button  onclick='updateData(${i})' id="update">Update</button></td>
        <td><button onclick='deleteData(${i})' id="Delete">Delete</button></td>
    </tr>`;
    }
    document.getElementById("body").innerHTML=table;
    let btn_delete=document.getElementById("deleteAll");
    if(product.length>0){
        btn_delete.innerHTML=`<button onclick='deleteAll()'>Delete All (${product.length})</button>`;
    }
    else{
        btn_delete.innerHTML=``;
    }
}
showData();
//delete
function deleteData(i){
product.splice(i,1)
localStorage.product=JSON.stringify(product);
showData();
}
//delete all
function deleteAll(){
    localStorage.clear();
    product.splice(0);
    showData()
    mode='create';
}
//update
function updateData(i){
    title.value=product[i].title;
    price.value=product[i].price;
    Taxes.value=product[i].Taxes;
    Ads.value=product[i].Ads;
    Discount.value=product[i].Discount;
    cat.value=product[i].cat;
    count.style.display='none'
    submit.innerHTML='UPDATE'
    getTotal();
    mode='update'
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
//search
let searchmode = 'title';
let search =document.getElementById('search');
function getSearchMode(id){
    if(id === 'title'){
        searchmode = 'Title';
    }
    else{
        searchmode = 'Category';
    }
    search.placeholder='Search By '+searchmode;
    search.focus();
}
function getData(value){
    let table ='';
    for(let i=0 ;i< product.length;i++){
    if(searchmode ==='Title'){
            if(product[i].title.includes(value.toLowerCase())){
                table += `<tr>
        <td>${i}</td>
        <td>${product[i].title}</td>
        <td>${product[i].price}</td>
        <td>${product[i].Taxes}</td>
        <td>${product[i].Ads}</td>
        <td>${product[i].Discount}</td>
        <td>${product[i].total}</td>
        <td>${product[i].cat}</td>
        <td><button  onclick='updateData(${i})' id="update">Update</button></td>
        <td><button onclick='deleteData(${i})' id="Delete">Delete</button></td>
        </tr>`;
            }
    }
    else{
            if(product[i].cat.includes(value.toLowerCase())){
                table += `<tr>
                <td>${i}</td>
                <td>${product[i].title}</td>
                <td>${product[i].price}</td>
                <td>${product[i].Taxes}</td>
                <td>${product[i].Ads}</td>
                <td>${product[i].Discount}</td>
                <td>${product[i].total}</td>
                <td>${product[i].cat}</td>
                <td><button  onclick='updateData(${i})' id="update">Update</button></td>
                <td><button onclick='deleteData(${i})' id="Delete">Delete</button></td>
            </tr>`;
            }
    }
    document.getElementById("body").innerHTML=table;
    }
}
//clean data
