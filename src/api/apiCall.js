import { create } from 'apisauce';

//define the api, the baseURL should be the starting point
const apiClient = create(
    {
        baseURL: "https://fakestoreapi.com",
        headers:{
            'Content-Type': 'application/json'
        }
    }
);

//login
const endpoint ="/auth/login";

export const getToken = async ({username, password}) => {
    let response = await apiClient.post(
            endpoint,
            JSON.stringify({username,password})
        );
    if (!response.ok) {return 500};
    if (response.ok) {
        return (response.data.token)? response.data.token : null
    }
    return
};

//get all products
const endpointProducts = "/products"

export const getProducts = async () =>{
    const response = await apiClient.get(endpointProducts);
    if (500 <= response.status && response.status <600){return 500}
    if (response.ok){ return response.data}
    return
}

//get a single product
export const getProduct =  async (id) =>{
    const response =  await apiClient.get(`/products/${id}`);
    if (500 <= response.status && response.status <600){return 500}
    if (response.ok){ return response.data}
    return
}

// get all categories
const endpointCategories = '/products/categories'
export const getCategories = async () =>{
    const response = await apiClient.get(endpointCategories);
    if (500 <= response.status && response.status <600){return 500}
    if (response.ok){ return response.data}
    return
}

//add a new product
export const addProduct = async (data) =>{
    const response = await apiClient.post(endpointProducts,data);
    if (response.ok){
        return true
    }else{return false}
}

//update a product
export const updateProduct = async (data,id) =>{
    const response = await apiClient.put(`/products/${id}`, data);
    if (response.ok){return true}else{return false}
}

//delete a product
export const deleteProduct = async (id) =>{
    const response = await apiClient.delete(`/products/${id}`,{},{'data':{id}});
    if (response.ok){return true}else{return false}
}