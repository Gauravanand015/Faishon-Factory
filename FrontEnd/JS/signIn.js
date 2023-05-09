let LoginUrl = "https://good-cyan-goat-kilt.cyclic.app/users/login_user";
let RegisterUrl = "https://good-cyan-goat-kilt.cyclic.app/users/register";

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
    if (data.token) {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userName",data.name)
      swal({
        title: "Good job!",
        text: "LoggedIn successfully",
        icon: "success",
      });
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 3000);
    } else {
      alert(data.msg);
    }
  } catch (error) {
    console.log(error);
  }
}

document.querySelector("#signup").addEventListener("submit", (event) => {
    event.preventDefault();
    register()
  });
  

async function register() {
    let user = document.getElementById("username").value;
    let remail = document.getElementById("registermail").value;
    let rpassword = document.getElementById("registerpassword").value;

    try {
            
        let obj = {
            name:user,
            email:remail,
            pass:rpassword
          };
          console.log(obj);

        let res = await fetch(RegisterUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        let data = await res.json();
        console.log(data);
        if (data == "New User Has been Registered!!") {
          swal({
            title: "Good job!",
            text: "Registered successfully",
            icon: "success",
          });
          setTimeout(() => {
            window.location.href = "signin.html";
          }, 3000);
        } else {
          alert("Credentials are wrong!!");
        }
      } 
      catch (error) {
        console.log(error);
      }
}
