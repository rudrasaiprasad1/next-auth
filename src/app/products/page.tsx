"use client";

import Image from "next/image";

const Products = [
  {
    imageUrl: "/products/googel-pixel-9.jpg",
    productName: "Googel Pixel 9",
    Description: "googel pixel 9 latest features with ai enabled camera",
    Price: 57000,
    Qty: 10,
  },
  {
    imageUrl: "/products/iqoo.webp",
    productName: "iqoo",
    Description: "googel pixel 9 latest features with ai enabled camera",
    Price: 57000,
    Qty: 10,
  },
  {
    imageUrl: "/products/realme.webp",
    productName: "Realme",
    Description: "googel pixel 9 latest features with ai enabled camera",
    Price: 57000,
    Qty: 10,
  },
  {
    imageUrl: "/products/redmi.webp",
    productName: "Redmi",
    Description: "googel pixel 9 latest features with ai enabled camera",
    Price: 57000,
    Qty: 10,
  },
];

const ProductsPage = () => {
  return (
    <div className="flex min-h-screen h-full w-full justify-center align-middle  bg-gray-200">
      <div className=" grid grid-cols-3 gap-2">
        {Products.map((product, index) => (
          <div
            className="bg-gray-300 text-black p-4 m-4 rounded-2xl hover:scale-101 duration-500 transition-all ease-in-out"
            key={product.productName + index}
          >
            <div className="rounded-lg m-4">
              <Image
                src={`${product.imageUrl}`}
                width={240}
                height={240}
                alt={`${product.productName}`}
                className="w-full h-full rounded-lg"
              />
            </div>
            <div>Product Name : {product.productName} </div>
            <div>Description :{product.Description}</div>
            <div>Price : {product.Price} </div>
            <div>Qty : {product.Qty} </div>
            <div className="flex w-full flex-col">
              <button className="bg-yellow-400 text-black rounded-3xl p-4 text-center items-center active:bg-yellow-500 active:text-gray-900 cursor-pointer">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
