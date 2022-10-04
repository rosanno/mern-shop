import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Input,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MobileDrawer = (props) => {
  const auth = useSelector((state) => state.auth);

  const handleModal = () => {
    props.setIsDrawerOpen(false);
    props.setOpenModal(true);
  };

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        placement="left"
        onClose={() => props.setIsDrawerOpen(false)}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody
            sx={{
              padding: '0',
            }}
          >
            <List>
              <ListItem
                sx={{
                  py: '1.2rem',
                  px: '1.2rem',
                  borderBottom: '1px solid black',
                  textTransform: 'uppercase',
                  fontSize: '.8rem',
                  fontWeight: 'bold',
                }}
              >
                <Link to="shop">Shop</Link>
              </ListItem>
              <ListItem
                sx={{
                  py: '1.1rem',
                  px: '1.2rem',
                  borderBottom: '1px solid black',
                  textTransform: 'uppercase',
                  fontSize: '.8rem',
                  fontWeight: 'bold',
                }}
              >
                <Link to="contact">Contact</Link>
              </ListItem>
            </List>
            <Box mt="1.2rem">
              <Box
                px="1.2rem"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                {!auth?.accessToken ? (
                  <Box
                    onClick={handleModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <AiOutlineUser size="1.5rem" />
                    <Text
                      sx={{
                        marginLeft: '.5rem',
                        fontSize: '.8rem',
                        textTransform: 'capitalize',
                      }}
                    >
                      login
                    </Text>
                  </Box>
                ) : (
                  <>
                    <AiOutlineUser size="1.5rem" />
                    <Text
                      sx={{
                        marginLeft: '.5rem',
                        fontSize: '.8rem',
                        textTransform: 'capitalize',
                      }}
                    >
                      {auth?.user?.name}
                    </Text>
                  </>
                )}
              </Box>
              <Box
                bg="gray.100"
                py=".3rem"
                px="1.2rem"
                mt=".8rem"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <BsSearch size="1.5rem" />
                <Input
                  sx={{
                    outline: 'none',
                    border: 0,
                    borderRadius: 0,
                    fontSize: '.9rem',
                    px: '.7rem',
                    py: '.4rem',
                  }}
                  variant="unstyled"
                  placeholder="Search"
                />
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
