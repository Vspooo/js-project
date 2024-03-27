let url = new URL(location.href).searchParams
let id = url.get("id")

fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(value => value.json())
    .then(posts=>{

        function writer(posts){
            let currentPost = document.createElement("div");
            currentPost.id = "currentPost"
            currentPost.classList.add("font-lato")
            for (const postInfoKey in posts) {
                let paragraph = document.createElement("p");
                paragraph.innerText = `${postInfoKey} - ${posts[postInfoKey]}`
                currentPost.appendChild(paragraph)
            }
            document.body.appendChild(currentPost)
        }
        writer(posts)

        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    })
    .then(value => value.json())
    .then(comments => {

        let commentDiv = document.createElement("div");
        commentDiv.id = "title"
        commentDiv.classList.add("center","font-lato")

        let paragraph = document.createElement("p");
        paragraph.innerText= "comments: "
        commentDiv.appendChild(paragraph)
        document.body.appendChild(commentDiv)
        function writer(array){
            let div = document.createElement("div");
            div.id = "comments"
            div.classList.add("font-lato")
            document.body.appendChild(div)
            array.forEach((comment)=>{
                let commentDiv = document.createElement("div");
                commentDiv.classList.add("comment")
                for (const commentKey in comment) {
                    let paragraph = document.createElement("p");
                    let value = comment[commentKey]
                    paragraph.innerText = `${commentKey} - ${value}`
                    commentDiv.appendChild(paragraph)
                    div.appendChild(commentDiv)

                }
            })
        }
        writer(comments)

    })