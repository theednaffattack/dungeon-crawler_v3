import React, { Component } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { Box, Text, H3 } from "styled-system-html";
import theme from "../config/styledTheme";
import Head from "./Head";
import SiteNav from "../components/SiteNav";

export default props => (
  <Box>
    <Head />
    <ThemeProvider theme={theme}>
      <Box>
        <SiteNav current={props.name} />
        <Box>{props.children}</Box>
      </Box>
    </ThemeProvider>
  </Box>
);
