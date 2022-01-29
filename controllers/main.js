
var spService = new ProductServices();
var productList = [];
function laySanPham() {
    spService.layDS()
        .then(function (result) {
            productList = result.data;
            hienThiSanPham(productList);
            locSanPham();
        })
        .catch(function (error) {
            console.log(error);
        })
}
laySanPham();

function hienThiSanPham(productList) {
    var content = "";
    var count = 0;
    productList.map(function (product) {
        content += `
        <div class="col-md-4">
        <div class="card">
            <div class="product__img">
                <img src="${product.img}"
                    class="card-img-top w-100" alt="...">
                <div class="prduct__overlay"></div>
                <div class="product__icon">
                    <i class="far fa-heart"></i>
                    <button>
                        <i class="fa fa-shopping-bag" onclick="themGioHang('${product.name}')"></i>
                    </button><br>
                    <i class="fa fa-search"></i>
                    <i class="fa fa-random"></i>
                </div>
            </div>
            <div class="card-body">
                <p class="product__list">
                    <a href="#"> ALL,</a>
                    <a href="#"> NEW ARRIVAL<a>
                </p>
                <div class="product__star">
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <a href="#">
                    <h5 class="card-title">${product.name}</h5>
                </a>
                <p class="card-text">$${product.price}</p>
            </div>
        </div>
    </div>
        `
        count++;
    })
    document.querySelector('.product__row').innerHTML = content;
}

// Lọc sản phẩm
function locSanPham() {
    var productFill = [];

    document.getElementById('product__iphone').onclick = function () {
        document.querySelector('.product__btn.active').classList.remove('active');
        document.getElementById('product__iphone').classList.add("active");  
        productList.map(function (product) {
            if (product.type == 'iphone') {
                productFill.push(product);
            }
        })
        hienThiSanPham(productFill);
        productFill = [];
    };

    document.getElementById('product__samsung').onclick = function () {
        document.querySelector('.product__btn.active').classList.remove('active');
        document.getElementById('product__samsung').classList.add("active");   
        productList.map(function (product) {
            if (product.type == 'Samsung') {
                productFill.push(product);
            }
        })
        hienThiSanPham(productFill);
        productFill = [];
    };
    document.getElementById('product__all').onclick = function () {
        document.querySelector('.product__btn.active').classList.remove('active');
        document.getElementById('product__all').classList.add("active");  
        hienThiSanPham(productList);
    }
 }

// Thêm sản phẩm vào giỏ hàng
var cart = [];
function themGioHang(productName) {
    var isItem = false;
    isItem = cart.some(function (item) {
        return item.product.name == productName;
    })
    if (!isItem) {
        productList.map(function (item) {
            if(item.name == productName) {
                 var cartItem = {
                    product: item,
                    quantity: 1,
                };
                cart.push(cartItem);
                console.log(cart);
            }     
        });
       
    } else {
        cart.map(function (item) {
            if (item.product.name == productName) {
                item.quantity++;
            }
        });

    }
    renderCart();
    tongTien();
    setLocalStorage();
}
// In giỏ hàng ra màn hình
function renderCart() {
    var content = '';
    cart.map(function (item) {
        content += `
        <tr>
        <td>
            <img src="${item.product.img}" alt="">
        </td>
        <td><p>${item.product.name}</p></td>
        <td>
            <div class="product__select">
                <button class="product__button" onclick="changeQuantity('${item.product.name}','decrease')">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <p>${item.quantity}</p>
                <button class="product__button" onclick="changeQuantity('${item.product.name}','increase')">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </td>
        <td> <p>${item.product.price}</p></td>
        <td>
            <button class="product__button" onclick ="xoaSanPham('${item.product.name}')">
            <i class="fas fa-times"></i>
            </button>
        </td>
    </tr>
   
    

`
    })
    

    // document.querySelector('#product__modal .modal-body').innerHTML = content;
   
    // })
    if(cart.length == 0){
        document.getElementById('product__table').style.display = 'none';
        document.querySelector('#product__modal .modal-footer').style.display = 'none'
        document.querySelector('.product__total').style.display = 'none'
        
    }else{
        document.getElementById('product__table').style.display = 'table';
        document.querySelector('#product__modal .modal-footer').style.display = 'flex'
        document.querySelector('.product__total').style.display = 'block'
        document.querySelector('.product__cart-img').style.display = 'none';
        document.querySelector('#table__body').innerHTML = content;
       
    }
}

// Tăng giảm số lượng sản phẩm
function changeQuantity(name, quantity) {
    cart.map(function (item) {
        if (item.product.name == name) {
            if (quantity == 'increase') {
                item.quantity++;

            } else if (quantity == 'decrease' && item.quantity > 1) {
                item.quantity--;

            }
        }
    });
    renderCart();
    tongTien();
    setLocalStorage();
}
// Tính tổng tiền
function tongTien() {
    var tongTien = 0;
    var tongSanPham = 0;
    cart.map(function (item) {
        tongTien += item.product.price * item.quantity;
        tongSanPham += item.quantity;
    })
    document.querySelector('.product__total span').innerHTML = `$${tongTien}`;
    document.querySelector('.header__number').innerHTML = tongSanPham;
    tongSanPham == 0 ? document.querySelector('.header__number').style.display = 'none': document.querySelector('.header__number').style.display = 'block';
    

}

// set localstorage
function setLocalStorage() {
    localStorage.setItem('CART', JSON.stringify(cart))
}

// getlocalStorage
function getLocalStorage() {
    if (localStorage.getItem('CART') != null) {
        cart = JSON.parse(localStorage.getItem('CART'))
        renderCart();
        tongTien();
    }
}
getLocalStorage();
// Thanh toán
document.querySelector('.product__purchase').onclick = function () {
    console.log(cart.length);
    if(cart.length > 0){
        cart = [];
        setLocalStorage();
        renderCart();
        tongTien();
        document.querySelector('.product__cart-img').style.display = 'block';
        document.querySelector('.modal-header .close').click();
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Payment success',
            showConfirmButton: false,
            timer: 1500
        })
    }else{
        
    }
    
}

// Xóa hết giỏ hàng 
document.querySelector('.product__clear').onclick = function () {
    Swal.fire({
        title: 'Do you want to delete all products?',
        showCancelButton: true,
        confirmButtonText: 'Yes',

    })
        .then((result) => {
            if (result.isConfirmed &&  cart != null) {
                if(cart != null)
                    cart = [];
                    setLocalStorage();
                    renderCart();
                    tongTien();
                    document.querySelector('.product__cart-img').style.display = 'block';
                    Swal.fire({
                        title: ' Delete success',
                        showConfirmButton: false,
                        icon: 'success',
                        timer: 1500,

                    })
            }
        })
   
}

// Xóa sản phẩm
function xoaSanPham(name) {
    var viTri = timViTri(name);
    if(viTri != -1){
        cart.splice(viTri,1);
    }
    setLocalStorage();
    renderCart();
    tongTien();
}
function timViTri(name){
    var viTri = -1;
    cart.map(function (item,index){
        if(item.product.name === name){
            viTri = index;
        }
    })
    return viTri;
}
