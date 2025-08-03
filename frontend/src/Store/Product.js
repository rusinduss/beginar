import {create} from "zustand";
// import { updateproduct } from "../../../backend/controllers/product.controller";
// import products from "../../../backend/model/products.model";

export const useProductStore = create ((set)=>({
    products:[],
    setproducts:(products)=>set({products}),
    createProducts: async (newProduct)=>{
        if(!newProduct.name||!newProduct.price||!newProduct.image){
            return{success: false,message: "Please fill In All Fields"}
        }
        const res = await fetch("/api/products",{
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            body:JSON.stringify(newProduct),

        })
        const data= await res.json();
        set((state)=>({products:[...state.products,data.data]}))
        return{success: true ,message: "product created successfully"}
    },
    fetchProducts: async ()=>{
        const res=await fetch("/api/products")
        const data=await res.json();
        set({products:data.data});

    },
    deleteProduct: async (pid)=>{
        const res = await fetch(`/api/products/${pid}`,{
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success){
            return{success: false, message:data.message}
        }
        set((state) =>({products: state.products.filter((product) => product._id !== pid)}));
        return { success: true, message:data.message };
    },
    updateproduct: async(pid,updatedProduct)=>{
        const res= await fetch(`/api/products/${pid}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(updatedProduct),

        });
        const data= await res.json();
        if(!data.success)
        return{success: false, message:data.message};

        //update the UI imedietly without a refresh
        set(state=>({
            products:state.products.map(product =>product._id===pid?data.data:product),
        }))
        return{
            success:true, message:data.message
        };
    }
}));
