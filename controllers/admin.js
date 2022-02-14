
const spService = new SanPhamServices();
const validation = new Validations();


const layDSSP=()=> {
    spService.layDS()
        .then(function (result) {
            console.log(result.data);
            hienThiTable(result.data);
        })
        .catch(function (error) {
            console.log(error)
        })
}
layDSSP();

// Show table
const hienThiTable=(mangSP)=> {
    let content = "";
    let count = 1;
    mangSP.map(function (sp) {
        content += `
            <tr>
                <td>${count}</td>
                <td>${sp.name}</td>
                <td>${sp.price}</td>
                <td>
                <img height="40px" src=" ${sp.img}">               
                </td>
                <td>${sp.type}</td>
                <td>
                <a class="edit" data-toggle="modal" data-target="#myModal"  onclick="xemChiTiet('${sp.id}')" ><i class="material-icons"
                data-toggle="tooltip" title="Edit">&#xE417;</i></a>
                    <a class="delete" onclick="xoaSanPham('${sp.id}')" ><i class="material-icons"
                    data-toggle="tooltip" title="Delete">&#xE872;</i></a>                 
                </td>
            </tr>
        `
        count++;
    });
    document.getElementById("tblDanhSachSP").innerHTML = content;
}

document.getElementById("btnThemSP").addEventListener("click", function () {
    document.querySelector("#myModal .modal-footer").innerHTML = `<button class="btn btn-success" onclick="themSanPham()" >Create</button>`;
})

// Add
const themSanPham=()=> {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let screen = document.getElementById("size").value;
    let backCamera = document.getElementById("back").value;
    let frontCamera = document.getElementById("front").value;
    let img = document.getElementById("img").value;
    let desc = document.getElementById("desc").value;
    let type = document.getElementById("type").value;

    let isValid = true;
    isValid &= validation.checkEmpty(name, "tbname", "Name is required!")
    isValid &= validation.checkEmpty(price, "tbprice", "Price is required!")
        && validation.checkPrice(price, "tbprice", "Price must be a valid number!");
    isValid &= validation.checkEmpty(screen, "tbsize", "Screen size is required!");
    isValid &= validation.checkEmpty(backCamera, "tbback", "Back camera is required!");
    isValid &= validation.checkEmpty(frontCamera, "tbfront", "Front camera is required!");
    isValid &= validation.checkEmpty(img, "tbimg", "Image is required!");
    isValid &= validation.checkEmpty(desc, "tbdesc", "Description is required!");
    isValid &= validation.checkEmpty(desc, "tbtype", "Type is required!")
    if (isValid) {
        let sp = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type);
        spService.themSP(sp)
            .then(function (result) {
                layDSSP();
                document.querySelector("#myModal .close").click();
            }).catch(function (error) {
                console.log(error);
            });
    }
}

// Delete
const xoaSanPham=(id)=> {
    spService.xoaSP(id)
        .then(function (result) {
            layDSSP();
        }).catch(function (error) {

        });
}


// View
const xemChiTiet=(id)=> {
    spService.layChiTiet(id)
        .then(function (result) {
            document.getElementById("name").value = result.data.name;
            document.getElementById("price").value = result.data.price;
            document.getElementById("size").value = result.data.screen;
            document.getElementById("back").value = result.data.backCamera;
            document.getElementById("front").value = result.data.frontCamera;
            document.getElementById("img").value = result.data.img;
            document.getElementById("desc").value = result.data.desc;
            document.getElementById("type").value = result.data.type;
            document.querySelector("#myModal .modal-footer").innerHTML = `<button class="btn btn-success" onclick="capNhatSP('${result.data.id}')">Update</button>`;

        }).catch(function (error) {
            console.log(error);
        });


}

// Edit
const capNhatSP=(id)=> {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let screen = document.getElementById("size").value;
    let backCamera = document.getElementById("back").value;
    let frontCamera = document.getElementById("front").value;
    let img = document.getElementById("img").value;
    let desc = document.getElementById("desc").value;
    let type = document.getElementById("type").value;

    let isValid = true;
    isValid &= validation.checkEmpty(name, "tbname", "Name is required!")
    isValid &= validation.checkEmpty(price, "tbprice", "Price is required!")
        && validation.checkPrice(price, "tbprice", "Price must be a valid number!");
    isValid &= validation.checkEmpty(screen, "tbsize", "Screen size is required!");
    isValid &= validation.checkEmpty(backCamera, "tbback", "Back camera is required!");
    isValid &= validation.checkEmpty(frontCamera, "tbfront", "Front camera is required!");
    isValid &= validation.checkEmpty(img, "tbimg", "Image is required!");
    isValid &= validation.checkEmpty(desc, "tbdesc", "Description is required!");
    isValid &= validation.checkEmpty(desc, "tbtype", "Type is required!")
    if (isValid) {
        let sp = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type);
        spService.capNhat(id, sp)
            .then(function (result) {
                console.log(result.data);
                layDSSP();
                document.querySelector("#myModal .close").click();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

// Search
const searchName = () => {
    let keyword = document.getElementById("inputTK").value;
    spService.timkiem()
        .then((result) => {
            let mangSearch = [];
            let mangDSSP = result.data;
            let keywordLower = keyword.toLowerCase();
            mangDSSP.map((sp) => {
                let nameLower = sp.name.toLowerCase();
                let indexName = nameLower.indexOf(keywordLower);
                if (indexName > -1) {
                    mangSearch.push(sp);
                }
            })
            hienThiTable(mangSearch);
        })
}

document.getElementById("basic-addon2").addEventListener("click", searchName);
document.getElementById("inputTK").addEventListener("keyup", searchName);



document.getElementById("btnThemSP").onclick=()=>{
    document.getElementById("form__add").reset();
}