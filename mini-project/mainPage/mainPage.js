fetch('https://jsonplaceholder.typicode.com/users')
    .then(result => result.json())
    .then(value => {
        let {users} = value
        document.body.classList.add("font-lato")
        for (const user of value) {
            let userDiv = document.createElement("div");
            let infoAboutUser = document.createElement("p");
            infoAboutUser.innerText = `${user.id}. ${user.name}`
            let userButton = document.createElement("button");
            userButton.classList.add("userButton","font-lato")
            userButton.innerText = "click"

            userButton.onclick = function (){
                location.href = `../user-details/user-details.html?id=${user.id}`
            }
            userDiv.classList.add("user")
            userDiv.append(infoAboutUser,userButton)
            let usersWrap = document.getElementById("usersWrap");
            usersWrap.appendChild(userDiv)
        }
    })