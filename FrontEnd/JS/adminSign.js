
let LoginUrl = "http://localhost:1110/admin/login"


document.querySelector("#login").addEventListener("submit", (event) => {
    event.preventDefault();
    user();
  });
  
  
  async function user() {
    let email = document.getElementById("email");
    let pass = document.getElementById("password");
  
    try {
      let obj = {
        email: email.value,
        pass: pass.value,
      };
      console.log(obj);
      let res = await fetch(LoginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      let data = await res.json();
      console.log(data);
      sessionStorage.setItem("token", data.token);
      if (data.token) {
        swal({
          title: "Good job!",
          text: "LoggedIn successfully",
          icon: "success",
        });
        setTimeout(() => {
          window.location.href = "adminPage.html";
        }, 3000);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
