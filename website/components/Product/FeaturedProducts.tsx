"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";


interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  category: string;
  stock: number;
}


export default function FeaturedProducts() {


  const [products, setProducts] = useState<Product[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);


  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("");



  useEffect(() => {


    const fetchProducts = async () => {

      try {


        const snapshot = await getDocs(
          collection(db,"products")
        );


        const productList = snapshot.docs.map(doc => ({
          id:doc.id,
          ...doc.data()
        })) as Product[];


        setProducts(productList);

        setFilteredProducts(productList);


      }
      catch(error){

        console.error(
          "Error fetching products:",
          error
        );

      }
      finally{

        setLoading(false);

      }

    };


    fetchProducts();


  },[]);





  useEffect(()=>{


    let result = [...products];



    // Search filter

    if(search){

      result = result.filter(product =>
        product.name
        .toLowerCase()
        .includes(search.toLowerCase())
      );

    }




    // Category filter

    if(category !== "All"){

      result = result.filter(product =>
        product.category === category
      );

    }




    // Price sorting

    if(sort === "low"){

      result.sort(
        (a,b)=>a.price-b.price
      );

    }


    if(sort === "high"){

      result.sort(
        (a,b)=>b.price-a.price
      );

    }



    setFilteredProducts(result);



  },[
    search,
    category,
    sort,
    products
  ]);





  if(loading){

    return (

      <div className="text-center py-10">

        Loading products...

      </div>

    );

  }





return (

<section className="py-12">


<h2 className="text-3xl font-bold mb-6">

Featured Products

</h2>



{/* Search and Filters */}

<div className="grid md:grid-cols-3 gap-4 mb-8">


<input

type="text"

placeholder="Search Beauty & Fashion..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border rounded-lg p-3"

/>



<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="border rounded-lg p-3"

>

<option value="All">
All Categories
</option>

<option value="Cosmetics">
Cosmetics
</option>

<option value="Clothes">
Clothes
</option>

<option value="Accessories">
Accessories
</option>

</select>




<select

value={sort}

onChange={(e)=>setSort(e.target.value)}

className="border rounded-lg p-3"

>

<option value="">
Sort By Price
</option>


<option value="low">
Price Low to High
</option>


<option value="high">
Price High to Low
</option>


</select>



</div>





<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">


{
filteredProducts.length === 0 ? (

<div className="col-span-full text-center py-10">

No products found

</div>

)

:

filteredProducts.map(product=>(

<ProductCard

key={product.id}

product={product}

/>

))

}


</div>


</section>

);


}