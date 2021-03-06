import { API } from "../../backend";



//category calls
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


//get all categories
export const getCategories= ()=>{

  return fetch(`${API}/categories`,{
    method:"GET"
  }).then(response=>{
    return response.json();
  }).catch(err=>console.log(err));
}

//products calls

export const createProduct=(userId,token,product)=>{
  return fetch(`${API}/product/create/${userId}`,{
    method: "POST",
    headers:
    {
      Accept: "application/json",
      Authorization: `Bearer ${token}`

    },
    body:product
  }).then(response=>{
    return response.json()
  }).catch(error=>{
    console.log(error);
  })
}


export const getAllProducts= ()=>{

  return fetch(`${API}/products`,{
    method:"GET"
  }).then(response=>{
    return response.json();
  }).catch(err=>console.log(err));
}


//delete a product
export const deleteProduct=(userId,token,productId)=>{
  return fetch(`${API}/product/${productId}/${userId}`,{
    method: "DELETE",
    headers:
    {
      Accept: "application/json",
      Authorization: `Bearer ${token}`

    }
  }).then(response=>{
    return response.json()
  }).catch(error=>{
    console.log(error);
  })
}

//get a product

export const getProduct=productId=>{
  return fetch(`${API}/product/${productId}`,{
    method:"GET"
  }).then(response=>{
    return response.json();
  }).catch(err=>console.log(err))
}

//update a product

export const updateProduct=(productId,userId,token,product)=>{
  return fetch(`${API}/product/${productId}/${userId}`,{
    method: "PUT",
    headers:
    {
      Accept: "application/json",
      Authorization: `Bearer ${token}`

    },
    body:product
  }).then(response=>{
    return response.json()
  }).catch(error=>{
    console.log(error);
  })
}


export const updateProfile=(user,userId,token)=>{

  return fetch(`${API}/user/${userId}`,{
    method: "PUT",
    headers:
    {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`

    },
    body:JSON.stringify(user)
  }).then(response=>{
    return response.json()
  }).catch(error=>{
     return (error);
  })
}



export const getUser=(userId,token)=>{
  return fetch(`${API}/user/${userId}`,{
    method:"GET",
    headers:
    {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`

    }
  }).then(response=>{
    return response.json();
  }).catch(err=>console.log(err))

}


export const createOrder=(order,userId,token)=>{
  return fetch(`${API}/order/create/${userId}`,{
    method: "POST",
    headers:
    {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`

    },
    body:JSON.stringify(order)
  }).then(response=>{
    return response.json()
  }).catch(error=>{
    console.log(error);
  })
}

export const getAllOrders=(userId,token)=>{
  return fetch(`${API}/orders/user/${userId}`,{
    method:"GET",
    headers:
    {
      Authorization: `Bearer ${token}`

    }
  }).then(response=>{
    return response.json();
  }).catch(err=>console.log(err))
}


export const getAllUserOrders=(userId,token)=>{
  return fetch(`${API}/order/all/${userId}`,{
    method:"GET",
    headers:
    {
      Authorization: `Bearer ${token}`

    }
  }).then(response=>{
    return response.json();
  }).catch(err=>console.log(err))
}
