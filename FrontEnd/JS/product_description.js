let url = "https://good-cyan-goat-kilt.cyclic.app/productDescription/product"
let cartUrl = "https://good-cyan-goat-kilt.cyclic.app/cart/getProduct//itemPostatCart/:product_id";
let description = document.getElementById("description_container")
let button = document.querySelector("#addToCart")

let token =  sessionStorage.getItem("token");
if(token){
    document.querySelector(".SignUpHover").innerHTML = "Hi"+" "+ sessionStorage.getItem("userName")
}

async function productDescription(){
    let arr = []
    try {
        let data = JSON.parse(localStorage.getItem("pro_des"))
        arr.push(data)
        console.log("Array",arr);
        renderData(arr)
    } catch (error) {
        console.log(error);
    }
}
productDescription()


function renderData(data){
    // console.log(data)
    data.forEach(elem => {

        var id = elem.product_id
        let sub_div = document.createElement("div");
        sub_div.setAttribute("class","sub");


        let image_div = document.createElement("div")
        image_div.setAttribute("class","img")

        let image = document.createElement("img");
        image.setAttribute("src",elem.img)

        image_div.append(image)

        let pro_details = document.createElement("div")
        pro_details.setAttribute("class","pro_details")

        let title = document.createElement("div");
        title.setAttribute("class","title")
        title.innerText=elem.Title;

        let price = document.createElement("div");
        price.setAttribute("class","price")
        price.innerText=elem.price;

        let delivery = document.createElement("div");
        delivery.setAttribute("class","delivery")
        delivery.innerText=elem.Delivery;

        let rating = document.createElement("div");
        rating.setAttribute("class","rating")
        rating.innerText=elem.Rating;

        let button = document.createElement("button");
        button.setAttribute("class","btn");
        button.innerText = "Add To Cart"

        button.addEventListener("click",async()=>{
            // console.log("HHHHHH")
            // pro_des(id)
            let token = sessionStorage.getItem("token")
            if(token){
                try {
                    var id = elem.product_id
                    console.log(id)
                    let res = await fetch(`https://good-cyan-goat-kilt.cyclic.app/cart/itemPostatCart/${id}`,{
                        method:"POST",
                        headers:{
                            "Content-type":"application/json",
                            authorization: token
                        },
                        body:JSON.stringify(elem)
                    })
                    let data  = await res.json()
                    if(data){
                        alert("Product Add To Your Cart!!")
                    }
                } catch (error) {
                    console.log(error)
                }
            }else{
                alert("You Have to Login First!!")
            }
                
        })

        pro_details.append(title,price,delivery,rating,button)
        
        sub_div.append(image_div,pro_details)
        // console.log(sub_div)
        document.querySelector(".card-list").append(sub_div)
    });
}



// async function pro_des(id){
//     try {
//         let res = await fetch(`https://good-cyan-goat-kilt.cyclic.app/productDescription/product/${id}`)
//         let data  = await res.json()
//         console.log(data);
//         let x = localStorage.setItem("pro_des",JSON.stringify(data))
//         //  window.location.href="product_description.html"
//     } catch (error) {
//         console.log(error)
//     }
// }