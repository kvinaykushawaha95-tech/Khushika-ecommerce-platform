import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Cosmetics",
    image: "/categories/cosmetics.png",
    link: "/category/cosmetics",
  },
  {
    name: "Fashion",
    image: "/categories/fashion.png",
    link: "/category/fashion",
  },
  
];


export default function CategorySection() {

  return (
    <section className="px-6 py-14">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">

          <p className="text-pink-600 uppercase tracking-widest text-sm">
            Explore
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Shop By Category
          </h2>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">


          {categories.map((category)=>(
            
            <Link
              href={category.link}
              key={category.name}
              className="
              group
              rounded-3xl
              overflow-hidden
              bg-gray-100
              hover:shadow-xl
              transition
              "
            >

              <div className="relative h-52">

                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="
                  object-cover
                  group-hover:scale-110
                  transition
                  duration-500
                  "
                />

              </div>


              <div className="p-4 text-center">

                <h3 className="font-semibold text-lg">
                  {category.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Explore Collection
                </p>

              </div>


            </Link>

          ))}


        </div>

      </div>

    </section>
  );
}