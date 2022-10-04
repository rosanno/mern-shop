import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { publicRequest } from '../api/axios';

const SignUpPanel = () => {
  const { handleSubmit, control, reset } = useForm();
  const [isError, setIsError] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    const { name, address, email, password, confirmPassword } = data;
    try {
      if (
        name === '' ||
        address === '' ||
        email === '' ||
        password === '' ||
        confirmPassword === ''
      ) {
        setError(true);
      } else {
        setError(false);

        await publicRequest.post('auth/', {
          name,
          address,
          email,
          password,
        });
        reset({
          name: '',
          address: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={error}>
          <FormLabel>Name:</FormLabel>
          <Controller
            control={control}
            defaultValue=""
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                type="text"
                name="name"
                id="name"
                value={value}
                borderRadius="0"
                backgroundColor="#F6F6F6"
              />
            )}
          />
          {error && <FormErrorMessage>Name is required</FormErrorMessage>}
          <FormLabel marginTop={5}>Address:</FormLabel>
          <Controller
            control={control}
            defaultValue=""
            name="address"
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                type="address"
                name="address"
                id="address"
                value={value}
                borderRadius="0"
                backgroundColor="#F6F6F6"
              />
            )}
          />
          {error && <FormErrorMessage>Address is required</FormErrorMessage>}
          <FormLabel marginTop={5}>Email Address:</FormLabel>
          <Controller
            control={control}
            defaultValue=""
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                type="email"
                name="email"
                id="email"
                value={value}
                borderRadius="0"
                backgroundColor="#F6F6F6"
              />
            )}
          />
          {error && <FormErrorMessage>Email is required</FormErrorMessage>}
          <FormLabel marginTop={5}>Password:</FormLabel>
          <Controller
            control={control}
            defaultValue=""
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                type="password"
                name="password"
                id="password"
                value={value}
                borderRadius="0"
                backgroundColor="#F6F6F6"
              />
            )}
          />
          {error && <FormErrorMessage>Password is required</FormErrorMessage>}
          <FormLabel marginTop={5}>Confirm Password:</FormLabel>
          <Controller
            control={control}
            defaultValue=""
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={value}
                borderRadius="0"
                backgroundColor="#F6F6F6"
              />
            )}
          />
          {error && <FormErrorMessage>Confirm is required</FormErrorMessage>}
        </FormControl>
        <Box display="flex" alignItems="center">
          <Button
            type="submit"
            sx={{
              borderRadius: 0,
              marginTop: '30px',
              paddingX: '2.5rem',
              paddingY: '1.4rem',
              textColor: 'white',
              textTransform: 'uppercase',

              '&:hover': {
                backgroundColor: '#383838',
              },
            }}
            backgroundColor="blackAlpha.900"
            variant="solid"
          >
            sign up
          </Button>
        </Box>
      </form>
    </>
  );
};

export default SignUpPanel;
