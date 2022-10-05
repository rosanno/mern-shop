import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { BiMinus } from 'react-icons/bi';
import { removeItems, setCart, setQuantity } from '../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiTrashAlt } from 'react-icons/bi';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation } from 'react-router-dom';

const CartDrawer = (props) => {
  const btnRef = React.useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const privateRequest = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getItems = async () => {
      try {
        const res = await privateRequest('cart/cart-items', {
          signal: controller.signal,
        });
        isMounted && dispatch(setCart(res?.data));
      } catch (error) {
        console.error(error.name);
      }
    };

    location.pathname !== '/checkout-success' && getItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line
  }, [auth?.accessToken]);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await privateRequest.post(
        'stripe-checkout/create-checkout-session',
        {
          cartItems,
        }
      );

      localStorage.setItem('payment_id', JSON.stringify(res.data._id));

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = async (productId) => {
    try {
      const { data } = await privateRequest.post('cart/increase-quantity', {
        productId: productId._id,
        quantity: 1,
      });
      const foundIndex = cartItems?.product?.findIndex(
        (item) => item.productId._id === productId._id
      );

      const quantity = data?.cart.product[foundIndex].quantity;
      const total = data?.cart.product[foundIndex].total;
      dispatch(setQuantity({ foundIndex, quantity, total }));
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const { data } = await privateRequest.post('cart/decrease-quantity', {
        productId: productId._id,
        quantity: 1,
      });
      const foundIndex = cartItems?.product?.findIndex(
        (item) => item.productId._id === productId._id
      );

      const quantity = data?.cart.product[foundIndex].quantity;
      const total = data?.cart.product[foundIndex].total;
      dispatch(setQuantity({ foundIndex, quantity, total }));
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = async (productId) => {
    await privateRequest.delete(`/cart/${productId}`);
    dispatch(removeItems(productId));
  };

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        placement="right"
        onClose={() => props.setOpen(false)}
        finalFocusRef={btnRef}
        size={{
          base: 'xs',
          sm: 'sm',
          md: 'md',
          lg: 'lg',
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => props.setOpen(false)} />
          <DrawerHeader>Cart</DrawerHeader>

          <DrawerBody>
            <Box>
              {cartItems.product?.length > 0 ? (
                <>
                  {cartItems?.product?.map((item) => (
                    <Flex key={item._id} py="15px">
                      <Button
                        fontSize={{
                          base: '1.8rem',
                          sm: '1.8rem',
                          md: '1.4rem',
                          lg: '1.2em',
                        }}
                        variant="ghost"
                      >
                        <BiTrashAlt
                          color="red"
                          onClick={() => removeCartItem(item.productId._id)}
                        />
                      </Button>
                      <Image
                        boxSize={{
                          base: '60px',
                          sm: '120px',
                          md: '130px',
                          lg: '130px',
                        }}
                        src={item.colorImg[0]}
                      />
                      <Box marginLeft="1.2rem" marginTop="1.2rem">
                        <Text
                          fontSize={{
                            base: '.7rem',
                            sm: '.9rem',
                            md: '1.2rem',
                            lg: '1.3rem',
                          }}
                          textTransform="uppercase"
                          fontWeight="bold"
                          lineHeight="1.2"
                        >
                          {item.productId.title}
                        </Text>

                        <Text
                          marginTop=".5rem"
                          fontSize={{
                            base: '.7rem',
                            sm: '1.1rem',
                            md: '1.2rem',
                            lg: '.9rem',
                          }}
                        >
                          ${item.productId.price}
                        </Text>

                        <Text
                          sx={{
                            fontSize: {
                              base: '.7rem',
                              sm: '.8rem',
                              md: '.9rem',
                              lg: '.9rem',
                            },
                            fontWeight: '500',
                            marginTop: '1.2rem',
                          }}
                        >
                          Color:
                          <span
                            style={{
                              marginLeft: '1.8rem',
                              textTransform: 'capitalize',
                            }}
                          >
                            {item.color[0]}
                          </span>
                        </Text>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '10px',
                          }}
                        >
                          <Text
                            sx={{
                              fontSize: {
                                base: '.7rem',
                                sm: '.8rem',
                                md: '.9rem',
                                lg: '.9rem',
                              },
                              fontWeight: '500',
                            }}
                          >
                            Quantity:
                          </Text>
                          <Box
                            display="flex"
                            alignContent="center"
                            marginLeft={3}
                          >
                            <Button
                              sx={{
                                bgColor: '#eff0f5',
                                paddingX: {
                                  base: '.10rem',
                                  lg: '.33rem',
                                },
                                fontSize: {
                                  base: '1rem',
                                  lg: '1.2rem',
                                },

                                '&:hover': {
                                  backgroundColor: '#DDDDDD',
                                },
                              }}
                              onClick={() => decreaseQuantity(item.productId)}
                              disabled={item.quantity === 1 && true}
                            >
                              <BiMinus color="#9e9e9e" />
                            </Button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              style={{
                                width: '40px',
                                outline: 'none',
                                textAlign: 'center',
                              }}
                            />
                            <Button
                              as="button"
                              sx={{
                                bgColor: '#eff0f5',
                                paddingX: {
                                  base: '.20rem',
                                  lg: '.33rem',
                                },
                                fontSize: {
                                  base: '1rem',
                                  lg: '1.2rem',
                                },

                                '&:hover': {
                                  backgroundColor: '#DDDDDD',
                                },
                              }}
                              onClick={() => handleQuantity(item.productId)}
                            >
                              <IoMdAdd color="#9e9e9e" />
                            </Button>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            fontSize: {
                              base: '.7rem',
                              sm: '.8rem',
                              md: '.9rem',
                              lg: '.9rem',
                            },
                            fontWeight: '500',
                            marginTop: '12px',
                          }}
                        >
                          Subtotal:
                          <Text marginLeft="11px">
                            ${item?.total.toFixed(2)}
                          </Text>
                        </Box>
                      </Box>
                    </Flex>
                  ))}
                </>
              ) : (
                'Cart Is Empty'
              )}
            </Box>
          </DrawerBody>
          <Divider />
          <DrawerFooter
            sx={{
              display: 'flex',
            }}
          >
            {cartItems.product?.length > 0 && (
              <Text
                sx={{
                  fontSize: {
                    base: '.9rem',
                    sm: '.8rem',
                    md: '.9rem',
                    lg: '1.2rem',
                  },
                  fontWeight: 'bold',
                }}
                marginRight="auto"
              >
                Total: ${cartItems?.subTotal?.toFixed(2)}
              </Text>
            )}
            <Button
              sx={{
                textTransform: 'uppercase',
                fontSize: '.88rem',
                borderRadius: 0,
              }}
              isLoading={isLoading}
              onClick={handleCheckout}
              disabled={cartItems.product?.length === 0 && 'true'}
            >
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
