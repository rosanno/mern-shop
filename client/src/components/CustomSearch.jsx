import React, { useEffect, useRef, useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import AnimationBox from "../utils/animation";
import {
  requestPending,
  requestRejected,
  requestSuccess,
} from "../features/productsSlice";
import { publicRequest } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const searchVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const CustomSearch = (props) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (props.isOpen && ref.current && !ref.current.contains(event.target)) {
        props.isClose(false);
      }
    };

    document.body.addEventListener("mousedown", handleOutsideClick, true);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
    };
    // eslint-disable-next-line
  }, [props.isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(requestPending());
      if (search) {
        const { data } = await publicRequest.get(
          `product/all-product?title=${search}`
        );
        dispatch(requestSuccess(data.products));
        setSearch("");
        navigate(`/shop/search?title=${search}`);
        props.isClose(false);
      } else {
        navigate("/shop");
        dispatch(requestRejected());
        props.isClose(false);
      }
    } catch (error) {
      dispatch(requestRejected());
      console.log(error);
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        mt: "6rem",
      }}
    >
      <AnimationBox
        animate={props.isOpen ? "animate" : "initial"}
        variants={searchVariants}
      >
        <Box
          sx={{
            width: "600px",
            display: "flex",
            alignItems: "center",
            background: "#fff",
            borderRadius: "8px",
            px: "1.2rem",
            py: ".8rem",
          }}
        >
          <FiSearch size="1.6rem" color="black" />
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
            }}
          >
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              sx={{
                width: "100%",
                outline: "none",
                border: 0,
                borderRadius: 0,
                color: "black",
                fontWeight: "500",
              }}
              focusBorderColor="0"
              placeholder="Search for products..."
            />
          </form>
        </Box>
      </AnimationBox>
    </Box>
  );
};

export default CustomSearch;
