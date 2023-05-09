const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");

const baseUrl = "https://newsapi.org/v2";
const apiKey = "xxxxxxxxxxxxxxxxxxxxxxx";

const backupImage = "./images/markus-spiske-2G8mnFvH8xk-unsplash.jpg";

async function dataRequest(url){
    try{
        const response = await fetch(baseUrl + url + "&apiKey=" + apiKey);
        const json = response.json();
        return json;
    }
    catch(error){
        console.log(error);
        if(error.contains("403")){
            cards.innerHTML += `<div class="card">
                                    <div class="image">
                                        <img src="${backupImage}" alt = "Default News Image">
                                    </div>
                                </div>`
        }
    }
}

function urlRequest(url){
    dataRequest(url).then(data => {
        data.articles.forEach(item => {
            cards.innerHTML += `<div class="card">
                                    <div class="image">
                                        <img src="${ item.urlToImage ? item.urlToImage : backupImage }" alt = "Default News Image">
                                    </div>
                                    <div class="information">
                                        <div>
                                            <p class="title">${item.title}</p>
                                            <p class="description">${ item.description ? item.description : "" }</p>
                                            <p class="time">
                                                <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                                                <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                                            </p>
                                        </div>
                                        <div class="other">
                                            <span class="source">${ item.source.name ? item.source.name : "Unknown" }</span>
                                            <a class="url" href="${item.url}" target="_blank">Read Article<i class="bi bi-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>`;
        });
    }); 
}

category.addEventListener("click", event => {
    if(event.target.tagName === "SPAN"){
        cards.innerHTML = "";
        urlRequest(event.target.dataset.url);
        categorySpan.forEach(item => item.classList.remove("active"));
        event.target.classList.add("active");
    } 
});

urlRequest("/top-headlines?country=us");