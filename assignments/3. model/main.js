let data = [
    {
      image:
        "http://data.mavo.io/portfolio/images/pasted-image-1494464667397.png",
      name: "Carwash",
      category: "Painting"
    },
    {
      image:
        "http://data.mavo.io/portfolio/images/pasted-image-1494528264937.png",
      name: "Muck Mouth",
      category: "Painting"
    },
    {
      image:
        "http://data.mavo.io/portfolio/images/pasted-image-1494528646446.png",
      name: "Fishwall",
      category: "Painting"
    },
    {
      image: "http://data.mavo.io/portfolio/images/web-coffe-marilyn.jpg",
      name: "Web Coffe Marilyn",
      category: "Painting"
    },
    {
      image:
        "http://data.mavo.io/portfolio/images/pasted-image-1494903924970.png",
      name: "Web 3 Jules",
      category: "Painting"
    },
    {
      image: "http://data.mavo.io/portfolio/images/web-electric3.jpg",
      name: "Web electric3",
      category: "Painting"
    }
  ];

  let main = document.querySelector(".container")
  let imgsec = document.querySelector(".imgsec")
  
  data.forEach(data => {
    let img = document.createElement("img");
    img.classList.add("image");
    img.src = data.image; 
    
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = "Read More";
    
    main.append(btn);
    imgsec.append(img);

    btn.addEventListener("click", function(event) {
      
      let ulist = document.createElement("ul");
      let liName = document.createElement("li");
      let liCat = document.createElement("li");
      let bigImg = document.createElement("img")
      
      main.append(ulist);
      ulist.append(bigImg, liName, liCat);
      
      liName.textContent = data.name;
      liCat.textContent = data.category;
      bigImg.src = data.image

      data.name = "";
      data.category = "";
      Model
    }); 
  });