window.onload = init;
function init() {
    var btn = document.getElementById("btn");

    btn.addEventListener("click", () => {
        let comment = document.getElementById("comment");
        let commentHeader = document.getElementById("form-username");
        let date = document.getElementById("date");

        if (comment.value == '') {
            comment.classList.add("is-invalid");
        } else {
            comment.classList.remove("is-invalid");
    
            let newCom = document.createElement("div");    
            newCom.innerHTML = '<p></p>';
            newCom.className = "d-flex";
    
            let lastCom = document.querySelector("#coms").lastElementChild;
            newCom.id = 'c' + (Number(lastCom.id.substring(1)) + 1);
            newCom.querySelector("p").innerHTML = 
          `<div id="comment" class="mt-2">
              <div class="media">
                <img src="2.jpg" class="mr-3 rounded" align="left" id ="photo1" style="height: 100px; width: 100px;">
                      <div class="cardcomment">
                        <h4 class="mt-1" id="commentName">${commentHeader.value}</h5>
                        <div id="commentContent">${comment.value}</div>
                        <br/>
                        <div id="commentdate"> Date: ${date.value}</div>
                      </div>
              </div>
          </div>
          <hr/>`;
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

