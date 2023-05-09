let registerUrl = "https://good-cyan-goat-kilt.cyclic.app/users/register";

let rname = document.getElementById("username");
let remail = document.getElementById("registermail");
let rpass = document.getElementById("registerpassword");


document.querySelector("#signup").addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log("register hello")
    user()
})

async function user(){
    try {
        let obj ={
            name : rname.value,
            email: remail.value,
            pass : rpass.value
        }
        console.log(obj)
        let res = await fetch(registerUrl,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        let data = await res.json();
        console.log(data)
        if(data == "This email is already registered try another email!!"){
            swal({
                text: "This email is already registered!!",
                icon: "warning",
              });
        }else{
            swal({
                title: "Good job!",
                text: "Registered Successfully",
                icon: "success",
              });
        }
    } catch (error) {
        console.log(error)
    }
}