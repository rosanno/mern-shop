import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

const Card = (props) => {
  return (
    <Box
      py=".8rem"
      px="2.5rem"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Image
          boxSize={{
            base: '60px',
            sm: '120px',
            md: '130px',
            lg: '50px',
          }}
          src={props.colorImg[0]}
        />
        <Box>
          <Text
            style={{
              fontWeight: '500',
              fontSize: '14px',
            }}
          >
            {props.productId.title}
          </Text>
          <Text
            style={{
              fontSize: '.76rem',
              marginTop: '.3rem',
              fontWeight: '600',
              color: 'gray',
            }}
          >
            Color Family: {props.color[0]}
          </Text>
        </Box>
      </Box>
      <Text
        style={{
          fontSize: '16px',
          fontWeight: '500',
          color: '#38B2AC',
        }}
      >
        ${props.productId.price}
      </Text>
      <Text>
        <span
          style={{
            color: 'gray',
            fontSize: '14px',
          }}
        >
          Qty
        </span>
        : {props.quantity}
      </Text>
    </Box>
  );
};

export default Card;
