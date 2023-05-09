let arr = [];
let Usertoken = sessionStorage.getItem("token");
async function x() {
  let url = "http://localhost:1110/product/allData";
  try {
    let res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: Usertoken,
      },
    });
    let data = await res.json();
    arr = await data;
    // console.log("Ffff", arr);
    renderData(data);
  } catch (error) {}
}
x();
// let content = document.getElementById("content");
// function renderData(data) {

//     content.innerHTML = `<div class="card-list">${data.map((el) => {
//         let image = el.img;
//         let title = el.Title.substring(0, 20) + "...";
//         let price = el.price;
//         let delivery = el.Delivery;
//         let rating = el.Rating;
//         let pro_id = `${el.product_id}`
//         return renderCard(image, title, price, delivery, rating, pro_id)
//     }).join(" ")}</div>`
// }

// function renderCard(imgURL, title, price, delivery, rating, pro_id) {
//     return `<div class="sub"><div class="img"><img src=${imgURL} alt="broken"></div>
// <div class="pro_details"><div class="title">${title}</div>
// <div class="pro_price">${price}</div>
// <div class="delivery">${delivery}</div>
//     <div class="rating">${rating}</div>
//     <div class="rating">${pro_id}</div>
//     </div></div> `
// }

function renderData(data) {
  // console.log(data)
  data.forEach((elem) => {
    let id = elem.product_id;

    let sub_div = document.createElement("div");
    sub_div.setAttribute("class", "sub");

    // sub_div.addEventListener("click",()=>{
    //     pro_des(id)
    // })

    let image_div = document.createElement("div");
    image_div.setAttribute("class", "img");

    let image = document.createElement("img");
    image.setAttribute("src", elem.img);
    // console.log(image);
    image_div.append(image);

    let pro_details = document.createElement("div");
    pro_details.setAttribute("class", "pro_details");

    let title = document.createElement("div");
    title.setAttribute("class", "title");
    title.innerText = elem.Title.substring(0, 20) + "...";

    let price = document.createElement("div");
    price.setAttribute("class", "price");
    price.innerText = elem.price;

    let delivery = document.createElement("div");
    delivery.setAttribute("class", "delivery");
    delivery.innerText = elem.Delivery;

    let rating = document.createElement("div");
    rating.setAttribute("class", "rating");
    rating.innerText = elem.Rating;

    let productID = document.createElement("div");
    productID.setAttribute("class", "rating");
    productID.innerText = elem.product_id;

    let remove = document.createElement("button");
    remove.setAttribute("class", "remove");
    remove.innerText = "Remove";

    remove.addEventListener("click", () => {
      let proID = elem.product_id;
      console.log(proID);
      removeItem(proID);
    });

    pro_details.append(title, price, delivery, rating, productID, remove);

    sub_div.append(image_div, pro_details);
    document.querySelector("#content").append(sub_div);
  });
}

async function removeItem(productID) {
  try {
    let res = await fetch(`http://localhost:1110/product/delete/${productID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    let data = await res.json();
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

let Admintoken = sessionStorage.getItem("token");

// Get the submit button
const submitButton = document.getElementById("submitButton");

// Add an event listener to the submit button
submitButton.addEventListener("click", function (event) {
  // Prevent the default form submission
  event.preventDefault();
  addProduct();
});

async function addProduct() {
  const fileUpload = document.getElementById("fileUpload").files[0].name;
  const productTitle = document.getElementById("product_title");
  const productPrice = document.getElementById("product_price");
  const productRating = document.getElementById("product_rating");
  const productDelivery = document.getElementById("product_delivery");

  try {
    let obj = {
      img: fileUpload,
      title: productTitle.value,
      price: productPrice.value,
      rating: productRating.value,
      delivery: productDelivery.value,
    };
    if (
      obj.img == "" ||
      obj.title == "" ||
      obj.price == "" ||
      obj.rating == "" ||
      obj.delivery == ""
    ) {
      alert("flii details");
      return;
    }
    console.log(obj);

    let data = await fetch("http://localhost:1110/product/create", {
      method: "POST",
      headers: {
        "Content-Type": "applicaion/json",
        authorization: Admintoken,
      },
      body: JSON.stringify(obj),
    });

    let res = await data.json();
    if (res.msg == "Created data") {
      alert("Data Posted");
      window.location.reload();
    } else {
      alert("Somthing Went Wrong While Adding Product");
    }
  } catch (error) {
    console.log(error);
  }
}
