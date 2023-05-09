let url = "https://good-cyan-goat-kilt.cyclic.app/home/getProduct"
let arr = [];

let token =  sessionStorage.getItem("token");
if(token){
    document.querySelector(".SignUpHover").innerHTML = "Hi"+" "+ sessionStorage.getItem("userName")
}

async function x() {
    try {
        let res = await fetch(url);
        let data = await res.json();
        arr = await data
        // console.log(data)
        renderData(data);
    } catch (error) {
        
    }
}
x()


function renderData(data){
    console.log(data)
    data.forEach(elem => {

        let id = elem.product_id

        let sub_div = document.createElement("div");
        sub_div.setAttribute("class","sub");

        sub_div.addEventListener("click",()=>{
            pro_des(id)
        })

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

        let delivery = document.createElement("div");
        delivery.setAttribute("class","delivery")
        delivery.innerText=elem.Delivery;

        let rating = document.createElement("div");
        rating.setAttribute("class","rating")
        rating.innerText=elem.Rating;

        pro_details.append(title,price,delivery,rating)

        sub_div.append(image_div,pro_details)
        document.querySelector(".card-list").append(sub_div)
    });
}

async function pro_des(id){
    try {
        let res = await fetch(`https://good-cyan-goat-kilt.cyclic.app/productDescription/product/${id}`)
        let data  = await res.json()
        console.log(data)
        localStorage.setItem("pro_des",JSON.stringify(data))
         window.location.href="product_description.html"
    } catch (error) {
        console.log(error)
    }
}


function search(){
    console.log(arr)
    let ser = document.getElementById("search").value;
    let newData = arr.filter(function(elem){
        return elem.Title.toLowerCase().includes(ser.toLocaleLowerCase())
    });
    renderData(newData)
}

function sort() {
    let sel = document.getElementById("sort").value;
    console.log(sel);
    if (sel == "LTH") {
      arr.sort((a, b) => a.price.slice(1) - b.price.slice(1));
      document.querySelector(".card-list").innerHTML = ""
      renderData(arr);
    }
    if (sel == "HTL") {
      arr.sort((a, b) => b.price.slice(1) - a.price.slice(1));
      document.querySelector(".card-list").innerHTML = ""
      renderData(arr);
    }
  }

