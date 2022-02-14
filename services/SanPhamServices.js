function SanPhamServices(){
  this.layDS = function(){      
      return axios({
          method: 'get',
          url: 'https://6203662d4d21c200170b9cb4.mockapi.io/Products'
        });
  };
  this.themSP = function(sp){
      return axios({
          method: 'post',
          url: 'https://6203662d4d21c200170b9cb4.mockapi.io/Products',
          data:sp
        });
  };
  this.xoaSP = function(id){
      return axios({
          method: 'delete',
          url: `https://6203662d4d21c200170b9cb4.mockapi.io/Products/${id}`
        });
  };
  this.layChiTiet = function(id){
      return axios({
          method: 'get',
          url: `https://6203662d4d21c200170b9cb4.mockapi.io/Products/${id}`
        });
  }
  this.capNhat = function(id,sp){
      return axios({
          method: 'put',
          url: `https://6203662d4d21c200170b9cb4.mockapi.io/Products/${id}`,
          data:sp
        });
  };
this.timkiem=function(){
    return axios({
      method: 'get',
      url: 'https://61dffe810f3bdb0017934ce0.mockapi.io/Products'
    })
}

  
}