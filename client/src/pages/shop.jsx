import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import productsApi from "../api/productsApi";
import {
  requestPending,
  requestRejected,
  requestSuccess,
} from "../features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      dispatch(requestPending());
      setIsLoaded(false);
      const { data } = await productsApi.getProducts();

      if (data.products) {
        dispatch(requestSuccess(data.products));
        setIsLoaded(true);
      } else {
        dispatch(requestRejected());
      }
    };

    getProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxW="container.xl" flex={1}>
      <Box marginTop="7rem" paddingBottom="3rem">
        <Text
          sd="h1"
          sx={{
            textTransform: "uppercase",
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          earbuds
        </Text>
        <Box marginTop="2.6rem">
          <Grid
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            rowGap={{
              base: "2rem",
              sm: "1.8rem",
              md: "1.3rem",
              lg: "4rem",
            }}
            columnGap={{
              sm: "1.2rem",
              md: "1rem",
              lg: "3rem",
            }}
            marginTop="4rem"
          >
            {products?.length > 0 ? (
              <>
                {products?.map((product) => (
                  <GridItem key={product._id}>
                    <Stack direction={["column"]} alignItems="center">
                      <Link to={`/product/details/${product.slug}`}>
                        <Skeleton isLoaded={isLoaded}>
                          <Image
                            boxSize={{
                              base: "130px",
                              sm: "260px",
                              md: "240",
                              lg: "250px",
                            }}
                            objectFit="contain"
                            src={product.img[0]}
                          />
                        </Skeleton>
                      </Link>
                      <Skeleton isLoaded={isLoaded}>
                        <Text
                          as="p"
                          sx={{
                            fontSize: "1rem",
                            textAlign: "center",
                            fontWeight: "500",
                            paddingTop: ".8rem",
                          }}
                        >
                          {product.title}
                        </Text>
                      </Skeleton>
                      <Skeleton isLoaded={isLoaded}>
                        <Text sx={{ fontSize: "1rem", fontWeight: "500" }}>
                          ${product.price}
                        </Text>
                      </Skeleton>
                    </Stack>
                  </GridItem>
                ))}
              </>
            ) : (
              <Text>No Products Found</Text>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Shop;
