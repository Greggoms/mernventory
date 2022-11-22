import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import ReactTableV8 from "../components/ReactTable";
import Spinner from "../components/Spinner";
import { HomePageContainer } from "../css";

const Home = () => {
  const axiosPrivate = useAxiosPrivate();

  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toShopData, setToShopData] = useState({});
  const [fromShopData, setFromShopData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyResult, setIsEmptyResult] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    // Retrieve shop data
    const getShopList = async () => {
      try {
        await axiosPrivate
          .get("/shops", {
            signal: controller.signal,
          })
          .then((response) => {
            const res = response.data;
            isMounted && setShops(res);
          })
          .catch((err) => {
            if (err.message === "canceled") return;
            toast.error(err.message);
          });
      } catch (err) {
        console.error(err);
      }
    };

    // Retrieve category data
    const getCategoryList = async () => {
      try {
        await axiosPrivate
          .get("/categories")
          .then((response) => {
            const res = response.data;
            setCategories(res);
          })
          .catch((err) => {
            if (err.message === "canceled") return;
            toast.error(err.message);
          });
      } catch (err) {
        console.error(err);
      }
    };

    getShopList();
    getCategoryList();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setProducts([]);
    setIsLoading(true);
    setIsEmptyResult(false);

    const params = {
      categoryID: data.category,
      fromShopID: data.fromShop,
      fromShopOnlyInStock: data.fromShopInStock,
    };

    axiosPrivate
      .post("/products", params)
      .then((response) => {
        const res = response.data;

        const fromShopData = res
          .map((item) => item.itemshops)
          .flat()
          .filter((shop) => shop.shopID === data.fromShop);

        const toShopData = res
          .map((item) => item.itemshops)
          .flat()
          .filter((shop) => shop.shopID === data.toShop);

        setToShopData(toShopData);
        setFromShopData(fromShopData);
        setProducts(res);

        if (res.length === 0) {
          setIsEmptyResult(true);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  return (
    <HomePageContainer>
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className="select-boxes">
            <label className="selection-container">
              What is your location?
              <select
                {...register("toShop", {
                  required: true,
                  valueAsNumber: true,
                })}
              >
                <option value="">--- Select an Option ---</option>
                {shops.map((shop) => (
                  <option key={shop.shopID} value={shop.shopID}>
                    {shop.name}
                  </option>
                ))}
              </select>
              {errors.toShop && (
                <span className="form-error">toShop is required</span>
              )}
            </label>

            <div className="from-shop-selection">
              <label className="selection-container">
                Location to compare with?
                <select
                  {...register("fromShop", {
                    required: true,
                    valueAsNumber: true,
                  })}
                >
                  <option value="">--- Select an Option ---</option>
                  {shops.map((shop) => (
                    <option key={shop.shopID} value={shop.shopID}>
                      {shop.name}
                    </option>
                  ))}
                </select>
                {errors.fromShop && (
                  <span className="form-error">fromShop is required</span>
                )}
              </label>
              <label>
                <input type="checkbox" {...register("fromShopInStock")} /> In
                stock only?
              </label>
            </div>

            <label className="selection-container">
              Filter by Category
              <select {...register("category", { valueAsNumber: true })}>
                <option value="">--- Select an Option ---</option>
                <option value={-1}>UNCATEGORIZED</option>
                {categories.map((category) => (
                  <option key={category.categoryID} value={category.categoryID}>
                    {category.fullPathName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Get Results
          </button>
        </form>

        <ReactTableV8
          data={products}
          toShopData={toShopData}
          fromShopData={fromShopData}
        />
        {isLoading && <Spinner />}
        {isEmptyResult && (
          <p className="no-data">No results. Try another search.</p>
        )}
      </div>
    </HomePageContainer>
  );
};

export default Home;
