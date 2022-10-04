import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  Image,
  Input,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineStar } from "react-icons/ai";
import { GoVerified } from "react-icons/go";
import { MdAdd } from "react-icons/md";
import { BiMinus } from "react-icons/bi";
import productsApi from "../api/productsApi";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import cartApi from "../api/cartApi";
import { setCart } from "../features/cartSlice";
import { useDispatch } from "react-redux";

const Details = () => {
  const imgRef = useRef();
  const colorRef = useRef();
  const { slug } = useParams();
  const privateRequest = useAxiosPrivate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [product, setProduct] = useState();
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await productsApi.getProduct(slug);
      setProduct(data);
    };

    getProduct();
    // eslint-disable-next-line
  }, []);

  const resultToast = (status, title) => {
    return toast({
      position: "top",
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  const getCart = async () => {
    const items = await cartApi.getCartItems();
    dispatch(setCart(items));
  };

  const addToCart = async () => {
    const color = colorRef.current.value;
    const colorImg = imgRef.current.value;
    try {
      await privateRequest.post("cart/", {
        productId: product?._id,
        color,
        colorImg,
        quantity,
      });
      resultToast("success", "Added successfully");
      getCart();
    } catch (error) {
      resultToast("error", "Something went wrong");
    }
  };

  return (
    <Box mt="8rem" transition="ease-in-out" transitionDuration="500ms">
      <Container maxWidth="container.xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              md: "center",
            },
            flexDirection: {
              base: "column",
              sm: "column",
              md: "column",
              lg: "row",
            },
            gap: "10",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                base: "column-reverse",
                sm: "column-reverse",
                md: "column-reverse",
                lg: "row",
              },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                bg: "#E1E1E1",
                px: "3rem",
                py: "3rem",
              }}
            >
              <Input
                ref={colorRef}
                type="text"
                hidden
                value={product?.color[index] || ""}
                readOnly
              />
              <Input
                ref={imgRef}
                text="text"
                hidden
                value={product?.img[index] || ""}
                readOnly
              />
              <Image
                sx={{
                  height: {
                    md: "250px",
                    lg: "300px",
                  },
                  width: {
                    sm: "300px",
                    md: "300px",
                    lg: "600px",
                  },
                }}
                src={product?.img[index]}
                backgroundSize="cover"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                base: "column",
                md: "row",
                lg: "row",
              },
              width: "100%",
              gap: "6",
            }}
          >
            <Box>
              <Text
                sx={{
                  fontSize: "1.6rem",
                  fontWeight: "bold",
                }}
              >
                {product?.title}
              </Text>
              <Text
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "300",
                  textTransform: "uppercase",
                  lineHeight: "1",
                }}
              >
                {product?.category[0]}
              </Text>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: "1rem",
                }}
              >
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text
                    sx={{
                      fontSize: "1.1rem",
                      mx: ".4rem",
                    }}
                  >
                    0
                  </Text>
                  |
                  <Text
                    sx={{
                      fontSize: "1.1rem",
                      mx: ".4rem",
                    }}
                  >
                    0 reviews
                  </Text>
                  <Box>
                    <GoVerified color="#96DFCA" />
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box mt=".7rem">
                <Text
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  Color: {product?.color[index]}
                </Text>
              </Box>
              <Grid templateColumns="repeat(4, 70px)" gap={3} my="1.2rem">
                {product?.img.map((im, i) => (
                  <Box
                    key={i}
                    sx={{
                      border:
                        index !== i ? "1px solid #DADADA" : "1px solid #319795",
                      transition: "ease-in-out",
                      transitionDuration: "500ms",
                      py: ".2rem",
                      px: ".3rem",
                      borderRadius: "6px",
                      bgColor: index !== i ? "#E1E1E1" : "#4DC9C4",
                      opacity: index !== i ? "0.5" : "",
                      cursor: "pointer",
                    }}
                    onClick={() => setIndex(i)}
                  >
                    <GridItem>
                      <Image boxSize="60px" src={im} />
                    </GridItem>
                  </Box>
                ))}
              </Grid>
              <Divider />
            </Box>
            <Box
              sx={{
                bgColor: "#EFEFEF",
                border: "1px solid #E1E1E1",
                borderRadius: "10px",
                mt: {
                  base: "2rem",
                  sm: "2rem",
                  lg: "6.2rem",
                },
                width: {
                  base: "100%",
                  md: "50%",
                  lg: "50%",
                },
              }}
            >
              <Text
                sx={{
                  color: "#718096",
                  fontSize: "1.6rem",
                  fontWeight: "500",
                  py: ".6rem",
                  px: "1rem",
                }}
              >
                ${product?.price}
              </Text>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "1.2rem",
                  bg: "#DCDCDC",
                }}
              >
                <Text
                  sx={{
                    fontWeight: "500",
                    fontSize: ".9rem",
                    color: "#61AFAD",
                    py: ".4rem",
                    px: "1rem",
                  }}
                >
                  In Stock
                </Text>
                <Text
                  sx={{
                    fontSize: ".9rem",
                    color: "#61AFAD",
                    py: ".4rem",
                    px: "1rem",
                  }}
                >
                  Currently {product?.stock}
                </Text>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "2px solid #DADADA",
                    borderRadius: "6px",
                    width: "40%",
                    px: ".2rem",
                    mt: "1.2rem",
                    mx: "1rem",
                  }}
                >
                  <Button
                    fontSize="1.3rem"
                    _hover={{
                      cursor: "pointer",
                    }}
                    onClick={() => setQuantity((prev) => prev - 1)}
                    variant="unstyled"
                    size="xs"
                    disabled={quantity <= 1 && true}
                  >
                    <BiMinus />
                  </Button>
                  <Input
                    variant="unstyled"
                    value={quantity}
                    readOnly
                    sx={{
                      textAlign: "center",
                      fontSize: "1.3rem",
                      color: "#61AFAD",
                      fontWeight: "bold",
                    }}
                    disabled
                  />
                  <Button
                    fontSize="1.3rem"
                    _hover={{
                      cursor: "pointer",
                    }}
                    onClick={() => setQuantity((prev) => prev + 1)}
                    variant="unstyled"
                    size="xs"
                  >
                    <MdAdd />
                  </Button>
                </Box>
                <Text
                  sx={{
                    mt: "1rem",
                  }}
                >
                  Quantity
                </Text>
              </Box>
              <Box px="1rem" mt="2.5rem">
                <Button
                  variant="unstyled"
                  sx={{
                    textTransform: "uppercase",
                    bgColor: "#4DC9C4",
                    color: "white",
                    width: "100%",
                    fontSize: ".9rem",

                    "&:hover": {
                      bgColor: "#319795",
                    },
                  }}
                  onClick={addToCart}
                >
                  add to cart
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box my="4rem" pb="2rem">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Specification</Tab>
              <Tab>Review</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text
                  sx={{
                    textAlign: "left",
                    fontSize: ".9rem",
                    lineHeight: "2",
                    py: "1rem",
                  }}
                >
                  {product?.description}
                </Text>
              </TabPanel>
              <TabPanel>
                <Table>
                  <Tbody>
                    {product?.specification.map((spec, index) => (
                      <Tr key={index}>
                        <Td fontWeight="semibold">{spec[0]}</Td>
                        <Td fontSize=".8rem">{spec[1]}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
      <Box />
    </Box>
  );
};

export default Details;
