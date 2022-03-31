export default function Login() {
    function handleSubmit(event) {
        event.preventDefault()
        const form = event.target

        form.submit.setAttribute("disabled", "disabled")
        form.submit.innerHTML = "Loading..."

        const ajax = new XMLHttpRequest()
        ajax.open("POST", "./api/auth", true)

        ajax.onreadystatechange = () => {
            if (ajax.readyState == 4 && ajax.status == 200) {
                form.submit.removeAttribute("disabled")
                form.submit.innerHTML = "Login"

                const response = JSON.parse(ajax.responseText)

                if (response.status == "success") {
                    const accessToken = response.accessToken
                    localStorage.setItem("accessToken", accessToken)
                    alert("Test window: " + response.message)
                    window.location.href = "/"
                } else {
                    alert("Test window: " + response.message)
                }
            }
        }

        ajax.send(new FormData(form))
    }

    return (
        <body>
        <div className="center">
            <h1> Login </h1>

            <form name="login" onSubmit={handleSubmit}>

                <div className="input_field">
                    <input type="text" id="username" name="username" required/>
                    <span></span>
                    <label htmlFor="username">Enter Your Username </label>
                </div>

                <div className="input_field">
                    <input type="password" id="password" name="password" required/>
                    <span></span>
                    <label htmlFor="password">Enter Your Password </label>
                </div>

                <button type="submit" name="submit">Login</button>

                <div className="link">
                    Not a Member?
                    <a>Register</a>
                </div>

            </form>

            <div className="forgotPW">
                <a>Forgot Password?</a>
            </div>
        </div>
        </body>
    )
}