import { Box, Button, Container, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BsBagCheckFill } from 'react-icons/bs';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Success = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const privateRequest = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSessions = async () => {
      setIsLoading(true);
      try {
        const res = await privateRequest.get(
          `stripe-checkout/checkout/sessions/${JSON.parse(
            localStorage.getItem('payment_id')
          )}`,
          {
            signal: controller.signal,
          }
        );
        isMounted && console.log(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getSessions();

    return () => {
      isMounted = false;
      controller.abort();
    };
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
          padding: '3rem 0',
          borderRadius: '10px',
        }}
      >
        <BsBagCheckFill color="#2F855A" fontSize="1.8rem" />
        <Text
          fontSize="5xl"
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
