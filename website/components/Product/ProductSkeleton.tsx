export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden animate-pulse">
      {/* Image */}
      <div className="aspect-square bg-gray-200" />

      <div className="p-4">
        {/* Category */}
        <div className="h-3 w-20 bg-gray-200 rounded mb-3" />

        {/* Product Name */}
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-4" />

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full bg-gray-200"
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex gap-3 items-center mb-5">
          <div className="h-6 w-20 rounded bg-gray-200" />
          <div className="h-4 w-14 rounded bg-gray-100" />
        </div>

        {/* Button */}
        <div className="h-11 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}