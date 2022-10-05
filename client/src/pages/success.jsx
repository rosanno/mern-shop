import { Box, Button, Container, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BsBagCheckFill } from 'react-icons/bs';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Success = () => {
  const auth = useSelector((state) => state.auth);
  const privateRequest = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const cleartCart = async () => {
      try {
        const res = await privateRequest.delete('cart/clearCart', {
          signal: controller.signal,
        });
        isMounted && console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    cleartCart();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxW="container.xl" flex={1} mt="10rem">
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#DDDCDD',
          width: '70%',
          margin: '0 auto',
          borderRadius: '10px',
        }}
        padding={{
          base: '3rem 2rem',
          md: '3rem 0',
        }}
      >
        <BsBagCheckFill color="#2F855A" fontSize="1.8rem" />
        <Text
          fontSize={{
            base: 'xl',
            sm: '2xl',
            md: '4xl',
            lg: '5xl',
          }}
          textTransform="capitalize"
          fontWeight="500"
          lineHeight="1.1"
          color="teal.800"
          mt="10px"
        >
          thank you for your order!
        </Text>
        <Text fontSize="xs" fontWeight="500">
          Check your email inbox for the receipt.
        </Text>
        <Text mt="20px" fontSize="xs" fontWeight="500">
          If you have any questions, please email{' '}
          <span
            style={{
              color: 'red',
              cursor: 'pointer',
            }}
          >
            order@example.com
          </span>
        </Text>
        <Link
          to="/"
          style={{
            display: 'block',
            width: '300px',
            margin: '0 auto',
          }}
        >
          <Button
            variant="unstyled"
            bg="teal.700"
            textTransform="uppercase"
            color="white"
            width="100%"
            maxWidth="300px"
            mt="30px"
            fontSize="sm"
          >
            continue shopping
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Success;
