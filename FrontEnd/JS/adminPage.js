
let arr = [];
async function x() {
    let url = "http://localhost:1110/product/allData"
    try {
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("token")
            }
        });
        let data = await res.json();
        arr = await data
        console.log("Ffff",arr)
        renderData(data);
    } catch (error) {
    }
}
x()
let content = document.getElementById("content");
function renderData(data) {

    content.innerHTML = `<div class="card-list">${data.map((el) => {
        let image = el.img;
        let title = el.Title.substring(0, 20) + "...";
        let price = el.price;
        let delivery = el.Delivery;
        let rating = el.Rating;
        let pro_id = `${el.product_id}`
        return renderCard(image, title, price, delivery, rating, pro_id)
    }).join(" ")}</div>`
}

function renderCard(imgURL, title, price, delivery, rating, pro_id) {
    return `<div class="sub"><div class="img"><img src=${imgURL} alt="broken"></div>
<div class="pro_details"><div class="title">${title}</div>
<div class="pro_price">${price}</div>
<div class="delivery">${delivery}</div>
    <div class="rating">${rating}</div>
    <div class="rating">${pro_id}</div>
    </div></div> `
}

