const laundryServices = [
    {
      name: "Dry Cleaning",
      price: 200.00
    },
    {
      name: "Wash & Fold",
      price: 100.00
    },
    {
      name: "Ironing",
      price: 30.00
    },
    {
      name: "Stain Removal",
      price: 500.00
    },
    {
      name: "Leather & Suede Cleaning",
      price: 999.00
    },
    {
      name: "Wedding Dress Cleaning",
      price: 2800.00
    }
  ];
  
  console.log("hello")
  
  
  document.querySelector(".services").innerHTML = "";
  
  laundryServices.map((item) => {
    let div = document.createElement("div");
    div.classList.add("service");
  
    let serviceDetails = document.createElement("div");
    serviceDetails.classList.add("serviceDetails");
  
    let serviceName = document.createElement("h5");
    serviceName.classList.add("serviceName");
    serviceName.textContent = item.name;
    serviceDetails.appendChild(serviceName);
  
    let separator = document.createElement("div");
    separator.textContent = "•";
    serviceDetails.appendChild(separator);
  
    let servicePrice = document.createElement("p");
    servicePrice.classList.add("servicePrice");
    servicePrice.textContent = ` ₹${item.price.toFixed(2)}`;
    serviceDetails.appendChild(servicePrice);
  
    div.appendChild(serviceDetails);
  
    let button = document.createElement("button");
    button.id = "addItem";
    button.textContent = "Add Item ";
    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-plus");
    button.appendChild(icon);
  
  
    button.addEventListener("click", () => {
      if (button.id === "removeItem") {
        button.id = "addItem";
        button.textContent = "Add Item ";
        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-plus");
        icon.style.border = "2px solid black";
        button.appendChild(icon);
  
        removeItem(item);
  
      } else {
        button.id = "removeItem";
        button.textContent = "Remove Item ";
        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-minus");
        icon.style.border = "2px solid red";
        button.appendChild(icon);
  
        addItem(item);
      }
  
      updateAddedItems();
  
    });
  
  
    div.appendChild(button);
    document.querySelector(".services").appendChild(div);
  });
  
  
  let addedItems = [];
  let totalPrice = 0;
  
  document.querySelector("#bookNow").addEventListener("click", ()=>{
    if( totalPrice===0 ){
      document.querySelector(".warn").style.display = "block";
    } else {
      document.querySelector(".warn").style.display = "none";
      sendEmail();
    }
  })
  
  function sendEmail(){
    let name = document.querySelector("#formName").value;
    let email = document.querySelector("#formEmail").value;
    let phone = document.querySelector("#formPhone").value;
    if( name==="" || email==="" || phone==="" ){
      document.querySelector(".warn").style.display = "block";
      document.querySelector(".warn").innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> &nbsp; Fill all the fields properly`;
    } else {
      console.log( {name, email, phone} );
    }
  }
  
  function addItem(item) {
    addedItems.push(item);
    document.querySelector(".warn").style.display = "none";
  }
  function removeItem(item) {
    addedItems = addedItems.filter(i => i.name !== item.name);
    updateAddedItems();
  }
  
  
  function showNoItems() {
    const noItemsDiv = document.createElement("div");
    noItemsDiv.classList.add("noItems");
  
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-circle-exclamation");
    noItemsDiv.appendChild(icon);
  
    const h3 = document.createElement("h3");
    h3.innerText = "No Items Added";
    noItemsDiv.appendChild(h3);
  
    const p = document.createElement("p");
    p.innerText = "Add items to the cart from the services bar";
    noItemsDiv.appendChild(p);
  
    document.querySelector(".bodyRows").appendChild(noItemsDiv);
  }
  
  
  
  function updateAddedItems() {
  
    document.querySelector(".bodyRows").innerHTML = "";
    if (addedItems.length === 0) {
  
      showNoItems();
      totalPrice = 0;
      document.querySelector("#totalPrice").textContent = "₹0.00";
  
    } else {
  
      addedItems.map((item, id) => {
  
        let div = document.createElement("div");
        div.classList.add("addedService");
  
        let p1 = document.createElement("p");
        p1.classList.add("sno");
        p1.innerText = id + 1;
  
        let p2 = document.createElement("p");
        p2.classList.add("service");
        p2.innerText = item.name;
  
        let p3 = document.createElement("p");
        p3.classList.add("price");
        p3.innerText = "₹" + item.price.toFixed(2);
  
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(p3);
  
        document.querySelector(".bodyRows").appendChild(div);
      })
  
      totalPrice = addedItems.reduce((acc, item) => { return acc + item.price }, 0);
      console.log("total price: ", totalPrice);
      document.querySelector("#totalPrice").textContent = "₹" + totalPrice.toFixed(2);
    }
  
  }
  