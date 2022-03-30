window.onload = init;
function init() {
    var btn = document.getElementById("btn");

    btn.addEventListener("click", () => {
        let comment = document.getElementById("comment");

        if (comment.value == '') {
            comment.classList.add("is-invalid");
        } else {
            comment.classList.remove("is-invalid");
    
            let newCom = document.createElement("div");    
            newCom.innerHTML = '<p></p>';
            newCom.className = "d-flex";
    
            let lastCom = document.querySelector("#coms").lastElementChild;
            newCom.id = 'c' + (Number(lastCom.id.substring(1)) + 1);
            newCom.querySelector("p").innerHTML = comment.value;
            document.querySelector("#coms").appendChild(newCom);
            document.querySelector("form").reset();
        }
    });
    
    window.onclick = function(e) {
        let modalbox = document.getElementById("comModal");
        if (!modalbox.contains(e.target)) {
            console.log("trigged");
            let modal = document.getElementById("comModal");
            comBox = modal.querySelector("#comment");
            comBox.value = "";
        }
    };
};
