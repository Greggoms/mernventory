import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MuiDataGrid from "../../components/MuiDataGrid";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";

const Home = () => {
  const axiosPrivate = useAxiosPrivate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <Container sx={{ mt: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={4}>
            <FormControl fullWidth required={true}>
              <InputLabel id="toShopLabel">Select your location</InputLabel>
              <Controller
                name="toShop"
                defaultValue=""
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="toShopLabel"
                    label="Select your location"
                  >
                    {shops.map((shop) => (
                      <MenuItem key={shop.shopID} value={shop.shopID}>
                        {shop.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            {errors.toShop && (
              <Typography color="error.light">toShop is required</Typography>
            )}
          </Grid>
          <Grid xs={12} sm={6} lg={4}>
            <Controller
              name="fromShop"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth required={true}>
                  <InputLabel id="fromShopLabel">
                    Location to compare with?
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="fromShopLabel"
                    label="Location to compare with?"
                  >
                    {shops.map((shop) => (
                      <MenuItem key={shop.shopID} value={shop.shopID}>
                        {shop.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            {errors.fromShop && (
              <Typography color="error.light">fromShop is required</Typography>
            )}

            <FormControlLabel
              control={
                <Checkbox id="persist" {...register("fromShopInStock")} />
              }
              label="In stock only?"
            />
          </Grid>

          <Grid xs={12} lg={4}>
            <Controller
              name="category"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="categoryLabel">Filter by Category</InputLabel>
                  <Select
                    {...field}
                    labelId="categoryLabel"
                    label="Filter by Category"
                  >
                    <MenuItem value={-1}>UNCATEGORIZED</MenuItem>
                    {categories.map((category) => (
                      <MenuItem
                        key={category.categoryID}
                        value={category.categoryID}
                      >
                        {category.fullPathName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center" }} mt={2} mb={2}>
          <LoadingButton type="submit" loading={isLoading} variant="contained">
            Fetch Data
          </LoadingButton>
        </Box>
      </form>

      {isEmptyResult && (
        <Typography align="center" mb={2} color="warning.main">
          No results. Try another search.
        </Typography>
      )}

      <MuiDataGrid
        data={products}
        toShopData={toShopData}
        fromShopData={fromShopData}
      />
    </Container>
  );
};

export default Home;
