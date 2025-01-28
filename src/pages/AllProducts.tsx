import ProductList from "@/components/card/all-product";

export default function AllProducts() {
  return (
    <main className="container  px-2 mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-center py-6 px-4 space-y-4 sm:space-y-0">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100">
            Bicycle Store Catalog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 opacity-80">
            Explore a curated collection of bicycles for every adventure.
          </p>
        </div>
      </header>
      <ProductList />
    </main>
  );
}
