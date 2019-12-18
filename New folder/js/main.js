const API = 'http://5dcb5e5134d54a0014314e41.mockapi.io/products';

function getProducts(API){
    axios.get(API)
    .then(function (response) {
       const products =response.data;
       //console.log(products);
       let Tr = products.map(item =>{
         return `
         <article>
         <img src="${item.avatar}" alt="" style="width: 80%; height: 70%;">
         <h2>${item.id}</h2>
         <a href="#" onclick="detail(${item.id})"><p>${item.name}</p></a>
         <p>Giá: ${item.Price}$</p>
         <button onclick="addtocard(${item.id})"><a href="#">Mua Hàng</a></button>
         </article>`
       });
       document.querySelector("code").innerHTML = Tr.join("");
     })
     .catch(function (error) {
    console.log("lỗi"+error);
    })
   }
   getProducts(API);

//chi tiết sp
   function detail(id){
    window.localStorage;
    localStorage.setItem("id", id);
    window.location.href = 'chitiet.html';
  }

  function getID() {
    window.localStorage;
    let id = localStorage.getItem('id');
    axios.get(`${API}/${id}`)
      .then(function (response) {
        const pro = response.data;
        let avatar = `${pro.avatar}`;
        document.querySelector("#zoom-img").innerHTML = `<img src="${avatar} " />`
        let name = `${pro.name}`;
        document.querySelector("h2").innerHTML= `${name}`;
        document.querySelector("h3").innerHTML= `$${pro.Price}`;
        document.querySelector("#nutmua").innerHTML= `<a  onclick="addtocard(${pro.id})" href="#">  Mua Hàng  </a>`;
        
      });
  } 
getID();

//mua hàng
function addtocard(id){

  window.localStorage

   // tìm ra sản phẩm đó
   axios.get(`${API}/${id}`)
  .then(function (response) {
    const sp = response.data;

  // kiểm tra có sp trong giỏ hay chưa
    if (localStorage.getItem("cart")) {
      //lấy ra toàn bộ sp đang có sẵn trong giỏ
      let cart = JSON.parse(localStorage.getItem("cart"));
      //gán thêm sp mới vào trong giỏ hàng
      cart.push(sp);
      //lưu lại giỏ hàng
      localStorage.setItem("cart", JSON.stringify(cart));
    }else{
      //nếu chưa tồn tại sp thì thêm bt
       localStorage.setItem("cart", JSON.stringify([sp]))
    }
    
  })
  
  alert("thêm vào giỏ hàng thành công");
}

function showcart(){
  window.localStorage;
  let cart = JSON.parse(localStorage.getItem("cart"));
  
  let html="";
  let totalprice=0;
  cart.map(products => {
        html += `
        <table id="customers" border = "1"><br>
        <tr>
        <th>ID</th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Remove</th>
        </tr>

        <tr>
          <td><h4>${products.id}</h4></td>
          <td><img src="${products.avatar}"></td>
          <td><h4>${products.name}</h4></td>
          <td><h4>${products.Price}</h4></td>
          <td style="width: 70px;"><button onclick = "remove(${products.id})">Xóa</button></td>
        </tr>
    </table> 
      `;
      })

  document.querySelector(".in").innerHTML=html;
  
}
showcart();

function remove(id){
let cart = JSON.parse(localStorage.getItem("cart"));
let new_cart = cart.filter(x => x.id != id);
localStorage.setItem("card", JSON.stringify("new_cart"));
//location.reload();
  }





   
   