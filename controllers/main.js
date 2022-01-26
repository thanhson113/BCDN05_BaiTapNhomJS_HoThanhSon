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
        <div class="col-lg-4">
        <div class="card mb-5">
        <img src="${product.img}"
            class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">
                <a href="#">
                    ${product.name}
                </a>
            </h5>
            <div class="product__content">
                <p class="card-text">$${product.price}</p>
                <div class="product__star">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>

            </div>
            <button type="button" class="product__btn btn btn-danger" onclick="themGioHang('${count}','${product.name}')">Add to cart
                <i class="fa fa-angle-right"></i>
            </button>
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
        productList.map(function (product) {
            if (product.type == 'iphone') {
                productFill.push(product);
            }
        })
        hienThiSanPham(productFill);
        productFill = [];
    };
    document.getElementById('product__samsung').onclick = function () {
        productList.map(function (product) {
            if (product.type == 'Samsung') {
                productFill.push(product);
            }
        })
        hienThiSanPham(productFill);
        productFill = [];
    };
}

// Thêm sản phẩm vào giỏ hàng
var cart = [];
function themGioHang(count, productName) {
    var cartItem = {
        product: productList[count],
        quantity: 1,
    };
    var isItem = false;
    isItem = cart.some(function (item) {
        return item.product.name == productName;
    })
    if (!isItem) {
        cart.push(cartItem);
        console.log(cart);
    } else {
        cart.map(function (item) {
            if (item.product.name == productName) {
                item.quantity++;
            }
        });
        
    }
    renderCart();
    // tongTien();

}
// In giỏ hàng ra màn hình
function renderCart() {
    var content = '';
    cart.map(function(item) {
        content += `
        <tr>
            <td>
                <img src="${item.product.img}" alt="">
            </td>
            <td><p>${item.product.name}</p></td>
            <td>
                <div class="product__select">
                    <button class="product__button" onclick="changeUnit('${item.product.name}','decrease')">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <p>${item.quantity}</p>
                    <button class="product__button" onclick="changeUnit('${item.product.name}','increase')">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </td>
            <td> <p>${item.product.price}</p></td>
            <td>
                <button class="product__button">
                <i class="fas fa-times"></i>
                </button>
            </td>
        </tr>
        `  
    })
       
    document.querySelector('#table__body').innerHTML = content;

}
// Thay đổi đơn vị
function changeUnit(name,increase){
    cart.map(function (item) {
        var a =  item.quantity;
        if (item.product.name == name ) {
            ++a;
            console.log(a);
        }else if(item.product.name == name && increase == 'decrease'){
            item.quantity--;
        }
    });
    
}
// Tính tổng tiền
function tongTien(){
    var tongTien = 0;
    cart.map(function(item){
        tongTien += item.product.price * item.quantity;
    })
    console.log(tongTien);
    document.querySelector('.product__total span').innerHTML = tongTien;
    // document.querySelector('.header__cart-notice').innerHTML = 
}
