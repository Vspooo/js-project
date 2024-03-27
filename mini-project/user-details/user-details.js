
let url = new URL(location.href).searchParams
let id = url.get("id")

fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(value => value.json())
    .then(users =>{
        let wrap = document.createElement("div");
        wrap.id = "wrap"
        document.body.appendChild(wrap)

        let div = document.createElement("div");
        div.classList.add("details","font-lato")
        div.id = "details"
        document.body.appendChild(div)



        function writer(obj){
            for (const objectKey in obj) {
                let paragraph = document.createElement("p");
                paragraph.classList.add("textForDetails","color-white")
                let keyPrefix = " "
                if (Array.isArray(obj[objectKey])){
                    let newObj = obj[objectKey].map((value) => `: ${value.name} - ${value.value}`)
                    paragraph.innerText = newObj.join('\n')
                    div.appendChild(paragraph)
                } else if (typeof obj[objectKey] === "object"){
                    let addDiv = document.createElement("div");
                    div.appendChild(addDiv)
                    keyPrefix = `${objectKey} :
                `
                    paragraph.innerText = handleObject(obj[objectKey])
                    addDiv.appendChild(paragraph)
                } else {
                    paragraph.innerText = `${objectKey} - ${obj[objectKey]}`
                    div.appendChild(paragraph)

                }
                paragraph.innerText = keyPrefix + paragraph.innerText
            }

            function handleObject(obj){
                let result = []
                for (const key in obj) {
                    if (typeof obj[key] === "object"){
                        result.push(handleObject(obj[key]))
                    }else {
                        result.push(` ${key} -  ${obj[key]}.`)
                    }
                }
                return result.join('\n')
            }
        }
        writer(users)
        wrap.appendChild(div)
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    })
    .then(value => value.json())
    .then(posts=>{
        let button = document.createElement("button");
        button.innerText = "post of current user"
        button.id = "buttonForPosts"
        button.classList.add("font-lato","color-white")
        document.body.appendChild(button)

        let postsDiv = document.createElement("div");
        postsDiv.id = "postsDiv"
        document.body.appendChild(postsDiv)

        let isPostsVisible = false

        button.onclick = function (){
            postsDiv.innerText = ""
            if (!isPostsVisible){
                for (const post of posts) {
                    let postDiv = document.createElement("div");
                    postDiv.classList.add("postDiv")
                    let paragraph = document.createElement("p")
                    paragraph.innerText = ` title: ${post.title}`
                    paragraph.classList.add("postTitle")

                    let postButton = document.createElement("button")
                    postButton.classList.add("postButton","font-lato")
                    postButton.onclick = function (){
                        location.href = `../post-details/post-details.html?id=${post.id}`
                    }
                    postButton.innerText = "more info"
                    postDiv.append(paragraph,postButton)
                    postsDiv.appendChild(postDiv)
                }
                postsDiv.style.display = "block"
                postsDiv.style.opacity = 0;
                postsDiv.style.visibility = "visible";
                setTimeout(function() {
                    postsDiv.style.opacity = 1;
                }, 10);
                isPostsVisible = true
            } else {
                postsDiv.style.display = "none"
                postsDiv.style.opacity = 1;
                setTimeout(function() {
                    postsDiv.style.opacity = 0;
                    setTimeout(function() {
                        postsDiv.style.visibility = "hidden";
                    }, 300);
                }, 100);
                isPostsVisible = false
            }
        }
        let wrap = document.getElementById("wrap");
        wrap.appendChild(button)
    })