import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Cosmetics",
    image: "/categories/beauty.png",
  },
  {
    id: 2,
    name: "Fashion",
    image: "/categories/fashion.png",
  },
  {
    id: 3,
    name: "Perfumes",
    image: "/categories/perfumes.png",
  },
  {
    id: 4,
    name: "Accessories",
    
    image: "/categories/accessories.png",
  },
];

export default function Category() {
  return (
    <section className="py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={300}
              height={300}
              className="w-full h-56 object-cover"
            />

            <div className="p-4 text-center">
              <h3 className="font-semibold text-xl">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}