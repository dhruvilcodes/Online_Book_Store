
export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    let found=false;
    cart.map((product)=>{
      if(product._id===item._id)
      {
        product.count++;
        found=true;
        
      }
    })
    if(found==false)
    {
      cart.push({...item,count:1})
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart=()=>{
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }else   
    {
      localStorage.setItem("cart",JSON.stringify([]));
      return JSON.parse(localStorage.getItem("cart"));
    }
}};

export const removeItemFromCart=(productId)=>{
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product,index)=>{
      if(product._id==productId){
        cart.splice(index,1);
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart));

  }
   return cart;
}

export const removeAItemFromCart=(productId)=>{
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product,index)=>{
      if(product._id==productId){
        product.count--;
        if(product.count==0)
        {
        cart.splice(index,1);
        }
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart));

  }
   return cart;
}

export const cartEmpty=next=>{
  if (typeof window !== undefined) {
    localStorage.remove("cart");
    next();
  }
}