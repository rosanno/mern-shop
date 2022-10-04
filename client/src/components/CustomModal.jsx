import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { publicRequest } from '../api/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import SignUpPanel from './SignUpPanel';

const CustomModal = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const [isError, setIsError] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    setIsError(false);
    try {
      const res = await publicRequest.post('auth/login', data);
      dispatch(setUser(res?.data));
      props.setOpenModal(false);
    } catch (error) {
      setError(true);
      setIsError(error.response.data.message);
    }
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={() => props.setOpenModal(false)}
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <Tabs>
            <ModalHeader>
              <TabList>
                <Tab>Sign in</Tab>
                <Tab>Sign up</Tab>
              </TabList>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TabPanels>
                <TabPanel>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={error}>
                      <FormLabel>Email Address:</FormLabel>
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
                      <FormErrorMessage>{isError}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={error}>
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
                      <FormErrorMessage>{isError}</FormErrorMessage>
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
                        sign in
                      </Button>
                    </Box>
                  </form>
                </TabPanel>
                <TabPanel>
                  <SignUpPanel />
                </TabPanel>
              </TabPanels>
            </ModalBody>
          </Tabs>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
