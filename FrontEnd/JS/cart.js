let total = document.getElementById("order_total")
let tot = 0;
let Carttotal = 0;
let token = sessionStorage.getItem("token")
async function getDataFromBackend(){

    const data = await fetch(`https://good-cyan-goat-kilt.cyclic.app/cart/getCartData`,{
        method:"GET",
        headers:{
            "Content-Type" : "application/json",
            authorization : token
        }
    });
    const res =  await data.json();
    // console.log("response",res);
    // if(sessionStorage.getItem("token") == )
    sessionStorage.setItem("add",res.length)
    renderData(res)
}

getDataFromBackend()

let count = JSON.parse(sessionStorage.getItem("add"))


function renderData(data){
    // console.log(data)
    let addCount = sessionStorage.getItem("add");
    data.forEach(elem => {
        
        // console.log(elem)
        // elem.forEach((item)=>{
        //     console.log(item)
            let id = elem.product_id

            let sub_div = document.createElement("div");
            sub_div.setAttribute("class","sub");
    
            // console.log(sub_div)
    
            let image_div = document.createElement("div")
            image_div.setAttribute("class","img")
    
            let image = document.createElement("img");
            image.setAttribute("src",elem.img)
    
            image_div.append(image)
    
            let pro_details = document.createElement("div")
            pro_details.setAttribute("class","pro_details")
    
            let title = document.createElement("div");
            title.setAttribute("class","title")
            title.innerText=elem.Title.substring(0,20) +"...";
    
            let price = document.createElement("div");
            price.setAttribute("class","price")
            price.innerText=elem.price;

            let x = parseInt(elem.price.slice(1));
            tot += x;
            total.innerText = "₹"+tot+".00"
            sessionStorage.setItem("total",tot)

            let remove = document.createElement("button");
            remove.setAttribute("class","remove");
            remove.innerText = "Remove"

            // let add_minus_div = document.createElement("div");
            // add_minus_div.setAttribute("class","add_minus");

            let add = document.createElement("button");
            add.setAttribute("class","increment");
            add.innerText = "+";

            // let qunatity = document.createElement("p");
            // qunatity.setAttribute("class","quantity");
            // qunatity.innerText = sessionStorage.getItem("add")

            let minus = document.createElement("button");
            minus.setAttribute("class","decrement");
            minus.innerText = "-";

            // add_minus_div.append(add,minus)
            
            add.addEventListener("click",()=>{
                addCount++;
                total.innerText = `₹ ${tot + parseInt(elem.price.slice(1))}.00/-`;
                tot = tot + parseInt(elem.price.slice(1))
                sessionStorage.setItem("add",addCount)
                sessionStorage.setItem("total",tot)
                console.log(addCount)
            })

            minus.addEventListener("click",()=>{
                addCount--;
                total.innerText = `₹ ${tot - parseInt(elem.price.slice(1))}.00/-`;
                tot = tot - parseInt(elem.price.slice(1))
                
                if(addCount === 0){
                    let proID = elem.product_id;
                    removeItem(proID)
                }else{
                    sessionStorage.setItem("add",addCount)
                    sessionStorage.setItem("total",tot)
                }
                console.log(addCount)
            })

            remove.addEventListener("click",()=>{
                let proID = elem.product_id;
                removeItem(proID)
            })

            pro_details.append(title,price,remove,add,minus)
    
            sub_div.append(image_div,pro_details)
            document.querySelector(".card-list").append(sub_div)
        // })
    });
}


async function removeItem(productID){

    try {
        let res = await fetch(`https://good-cyan-goat-kilt.cyclic.app/cart/deleteItemfromCart/${productID}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                 authorization:token
            }
        })
        let data  = await res.json()
        window.location.reload()
    } catch (error) {
        console.log(error)
    }
}