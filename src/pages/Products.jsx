import React, { useEffect, useState } from "react";
import { getData } from "../Context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/Loading4.webm";
import ProductCard from "../components/ProductCard";
import PaginationMui from "../components/PaginationMui";
import Lottie from "lottie-react";
import notfound from '../assets/notfound.json'
import { FiFilter } from "react-icons/fi";

const Products = () => {
  const { data, fetchAllProducts } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);



  useEffect(() => {
    fetchAllProducts()
    window.scrollTo(0,0)
  }, []);

  const handelCategoryChange = (e) => {
    setCategory(e.target.value)
    setPage(1)
  }


  const handelBrandChange = (e) => {
    setBrand(e.target.value)
    setPage(1)
  }

  const pageHandler = (selectedPage) => setPage(selectedPage);

  const filterData = data?.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
    );
  });

  const dynamicPage = Math.ceil(filterData?.length / 8);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-2 sm:px-4 mb-10">
        {data?.length > 0 ? (
          <>
            {/* Mobile/Tablet: Filter button left, Search bar above products */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <button
                className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md flex items-center gap-2 font-semibold transition hover:scale-105"
                onClick={() => setFilterOpen(true)}
              >
                <FiFilter size={22} />
                Filters
              </button>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="ml-2 px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 w-2/3 sm:w-1/2"
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filter Sidebar (no black overlay) */}
              <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${filterOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0 lg:w-1/4 lg:bg-transparent lg:shadow-none`}>
                <div className="flex justify-between items-center px-4 py-3 lg:hidden border-b">
                  <span className="font-semibold">Filters</span>
                  <button onClick={() => setFilterOpen(false)} className="text-xl font-bold">&times;</button>
                </div>
                <FilterSection
                  search={search}
                  setSearch={setSearch}
                  brand={brand}
                  setBrand={setBrand}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  category={category}
                  setCategory={setCategory}
                  handelCategoryChange={handelCategoryChange}
                  handelBrandChange={handelBrandChange}
                />
              </div>
              {/* Products */}
              <div className="flex flex-col justify-center items-center w-full lg:w-3/4">
                {/* Desktop: Search bar above products */}
                <div className="hidden lg:block w-full mb-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/2"
                  />
                </div>
                {filterData?.length > 0 ? (
                  <>
                    {search && (
                      <div className="w-full text-gray-600 text-sm mb-2">
                        Showing {filterData.length} results for "<span className="font-semibold">{search}</span>"
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7 mt-4 w-full">
                      {filterData
                        ?.slice((page - 1) * 8, page * 8)
                        .map((Product, index) => (
                          <ProductCard key={index} product={Product} />
                        ))}
                    </div>
                    <div className="w-full flex justify-center mt-6">
                      <PaginationMui
                        page={page}
                        pageHandle={pageHandler}
                        dynamicPage={dynamicPage}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center w-full h-[300px] sm:h-[400px] mt-10">
                    <Lottie animationData={notfound} className="w-[250px] sm:w-[400px]" />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[300px] sm:h-[400px]">
            <video muted autoPlay loop className="w-[120px] sm:w-[200px]">
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
