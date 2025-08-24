import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../assets/Loading4.webm"
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../Context/CartContext";
const SingleProduct = () => {
  const params = useParams();
  const [SingleProduct, setSingleProduct] = useState("");
  const {addToCart} = useCart()


  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.in/api/products/${params.id}`)
      const product = res.data.product;
      setSingleProduct(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct()
  }, []);


  const OriginalPrice = Math.round(SingleProduct.price + (SingleProduct.price * SingleProduct.discount / 100))

  return (
    <>
      {SingleProduct ? (
        <div className="px-4 pb-4 md:px-0">
            <Breadcrumbs title={SingleProduct.title}/>
            <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* product image */}
                <div className="w-full">
                    <img src={SingleProduct.image} alt={SingleProduct.title} className="rounded-2xl w-full object-cover" />
                </div>

                {/* product details */}
                <div className="flex flex-col gap-6">
                    <h1 className="md:text-3xl text-xl font-bold text-gray-800">{SingleProduct.title}</h1>
                    <div className="text-gray-700"> {SingleProduct.brand?.toUpperCase()} /{SingleProduct.category?.toUpperCase()} /{SingleProduct.model}</div>
                     <p className="text-xl font-bold text-red-500">${SingleProduct.price} <span className="line-through text-gray-700">${OriginalPrice}</span> <span className="bg-red-500 text-white px-4 py-2 rounded-md ">{SingleProduct.discount}% discount</span></p>
                     <p className="text-gray-600">{SingleProduct.description}</p>

                     {/* quentity selector */}
                     <div className="flex items-center gap-4">
                        <label htmlFor="" className="text-sm font-medium text-gray-700">
                            Quantity:
                        </label>
                        <input type="number" min={1} value={1} className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:ouline-none focus:ring-2 focus:ring-red-500"/>
                     </div>

                     <div className="flex mt-4 gap-4">
                        <button onClick={()=> addToCart(SingleProduct)} className="flex px-6 gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600"><IoCartOutline className="h-6 w-6"/> Add to Cart</button>
                     </div>
                </div>
            </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
