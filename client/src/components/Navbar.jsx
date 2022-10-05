import React, { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  Container,
  List,
  ListItem,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { GiEarbuds } from 'react-icons/gi';
import { AiOutlineUser } from 'react-icons/ai';
import { BsSearch, BsBag } from 'react-icons/bs';
import { BiExit } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import CustomModal from './CustomModal';
import CartDrawer from './CartDrawer';
import CustomSearch from './CustomSearch';
import { GiHamburgerMenu } from 'react-icons/gi';
import MobileDrawer from './MobileDrawer';
import { publicRequest } from '../api/axios';
import { setUser } from '../features/authSlice';

const Navbar = () => {
  const items = useSelector((state) => state.cart.items);
  const auth = useSelector((state) => state.auth);
  const { onClose } = useDisclosure();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 80 ? setColorChange(true) : setColorChange(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const checkAuthUser = () => {
    if (auth.accessToken) {
      setOpen(true);
    } else {
      setOpenModal(true);
    }
  };

  const handleLogOut = async () => {
    try {
      await publicRequest.get('logout/');
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        bg="white"
        position="fixed"
        boxShadow={`${colorChange ? 'md' : 'xs'}`}
        transition="ease-in"
        transitionDuration="200ms"
        zIndex={10}
        top="0"
        left="0"
        right="0"
        py={4}
      >
        <Container maxW="container.xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: {
                  sm: 'block',
                  md: 'block',
                  lg: 'none',
                },
                cursor: 'pointer',
              }}
              onClick={() => setIsDrawerOpen(true)}
            >
              <GiHamburgerMenu size="1.4rem" />
            </Box>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <GiEarbuds color="#718096" size="1.6rem" />
              <Text
                color="gray.800"
                sx={{
                  textTransform: 'uppercase',
                  fontSize: '1.6rem',
                  fontWeight: 'bold',
                  marginLeft: '4px',
                }}
              >
                EarSockets
              </Text>
            </Link>
            {location.pathname !== '/checkout' && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: {
                    sm: 'initial',
                    md: 'initial',
                    lg: '100%',
                  },
                  marginLeft: '40px',
                }}
              >
                <List
                  color="gray.800"
                  sx={{
                    display: {
                      base: 'none',
                      sm: 'none',
                      md: 'none',
                      lg: 'flex',
                    },
                    alignItems: 'center',
                    textTransform: 'uppercase',
                    fontSize: '.8rem',
                    fontWeight: 'bold',
                  }}
                >
                  <ListItem>
                    <Link to="shop">shop</Link>
                  </ListItem>
                  <ListItem marginLeft={6}>
                    <Link to="contact">contact us</Link>
                  </ListItem>
                </List>
                <Stack direction="row" spacing={5}>
                  <Box
                    sx={{
                      display: {
                        base: 'none',
                        sm: 'none',
                        md: 'none',
                        lg: 'flex',
                      },
                      alignItems: 'center',
                    }}
                  >
                    {!auth?.accessToken ? (
                      <AiOutlineUser
                        color="#718096"
                        size="1.4rem"
                        cursor="pointer"
                        style={{
                          margin: '0 20px',
                        }}
                        onClick={() => setOpenModal(true)}
                      />
                    ) : (
                      <Text mr="18px" textTransform="uppercase">
                        {auth?.user?.name}
                      </Text>
                    )}
                    <BsSearch
                      color="#718096"
                      size="1.2rem"
                      cursor="pointer"
                      onClick={() => setOpenSearch(true)}
                    />
                  </Box>
                  <Box position="relative">
                    <Badge
                      position="absolute"
                      top="-10px"
                      right="-8px"
                      variant="solid"
                      colorScheme="red"
                    >
                      {items?.product?.length}
                    </Badge>
                    <BsBag
                      color="#718096"
                      size="1.2rem"
                      cursor="pointer"
                      onClick={checkAuthUser}
                    />
                  </Box>
                  {auth?.accessToken ? (
                    <Tooltip hasArrow label="LogOut" shouldWrapChildren mt="3">
                      <BiExit
                        color="#718096"
                        size="1.3rem"
                        cursor="pointer"
                        onClick={handleLogOut}
                      />
                    </Tooltip>
                  ) : null}
                </Stack>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
      <CustomModal isOpen={openModal} setOpenModal={setOpenModal} />
      <CartDrawer isOpen={open} onClose={onClose} setOpen={setOpen} />
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={onClose}
        setIsDrawerOpen={setIsDrawerOpen}
        setOpenModal={setOpenModal}
      />
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          zIndex: 10,
          bottom: 0,
          top: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        display={`${openSearch ? 'block' : 'none'}`}
      >
        <CustomSearch isOpen={openSearch} isClose={setOpenSearch} />
      </Box>
    </>
  );
};

export default Navbar;
