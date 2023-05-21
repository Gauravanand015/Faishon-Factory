let total = document.getElementById("order_total");
let tot = 0;
let token = sessionStorage.getItem("token");

async function getDataFromBackend() {
  const data = await fetch(
    `https://good-cyan-goat-kilt.cyclic.app/cart/getCartData`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  );
  const res = await data.json();
  renderData(res);
}

getDataFromBackend();

let count = JSON.parse(sessionStorage.getItem("add"));


function renderData(data) {
  // console.log(data)
  data.forEach((elem, index) => {
    let id = elem.product_id;

    let sub_div = document.createElement("div");
    sub_div.setAttribute("class", "sub");

    let image_div = document.createElement("div");
    image_div.setAttribute("class", "img");

    let image = document.createElement("img");
    image.setAttribute("src", elem.img);

    image_div.append(image);

    let pro_details = document.createElement("div");
    pro_details.setAttribute("class", "pro_details");

    let title = document.createElement("div");
    title.setAttribute("class", "title");
    title.textContent = elem.Title.substring(0, 20) + "...";

    let price = document.createElement("div");
    price.setAttribute("class", "price");
    price.textContent = elem.price;

    let x = parseInt(elem.price.slice(1));
    tot += x;
    total.textContent = "₹" + tot + ".00";
    sessionStorage.setItem("total", tot);

    let remove = document.createElement("button");
    remove.setAttribute("class", "remove");
    remove.textContent = "Remove";

    let add_minus_div = document.createElement("div");
    add_minus_div.setAttribute("class", "add_minus");

    let oneMore_div = document.createElement("div");
    oneMore_div.setAttribute("class", "oneMore_div");

    let add = document.createElement("button");
    add.setAttribute("class", "increment");
    add.textContent = "+";

    let quantity = document.createElement("span");
    quantity.setAttribute("class", "quantity");
    quantity.textContent = 1;

    let minus = document.createElement("button");
    minus.setAttribute("class", "decrement");
    minus.textContent = "-";

    add.addEventListener("click", () => {
      quantity.textContent = parseInt(quantity.textContent) + 1;
      updateTotalPrice(elem.price.slice(1), 1);

    });

    minus.addEventListener("click", () => {
      let currentQuantity = parseInt(quantity.textContent);
      if (currentQuantity > 1) {
        quantity.textContent = currentQuantity - 1;
        updateTotalPrice(elem.price.slice(1), -1);
      } else if (currentQuantity === 1) {
        quantity.textContent = currentQuantity - 1;
        updateTotalPrice(elem.price.slice(1), -1);
        let proID = elem.product_id;
        removeItem(proID);
        alert("Item removed from cart.");
      }
    });

    remove.addEventListener("click", () => {
      let proID = elem.product_id;
      removeItem(proID);
    });

    oneMore_div.append(minus, quantity, add);
    add_minus_div.append(remove, oneMore_div);
    pro_details.append(title, price, add_minus_div);
    sub_div.append(image_div, pro_details);
    document.querySelector(".card-list").append(sub_div);
  });
}

function updateTotalPrice(price, quantityChange) {
    let currentTotal = parseInt(sessionStorage.getItem("total"));
    let newTotal = currentTotal + (parseInt(price) * quantityChange);
    sessionStorage.setItem("total", newTotal);
    total.textContent = "₹" + newTotal + ".00";
  }


async function removeItem(productID) {
  try {
    let res = await fetch(
      `https://good-cyan-goat-kilt.cyclic.app/cart/deleteItemfromCart/${productID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    let data = await res.json();
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
