import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { namespaceConfig } from "fast-redux";
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import { Box, Text, H3 } from "styled-system-html";
import Index from "../src/pages/Index";
import Page from "./Page";

const DEFAULT_STATE = { build: 1 };

const { actionCreator, getState: getHomepageState } = namespaceConfig(
  "homepage",
  DEFAULT_STATE
);

const bumpBuild = actionCreator(function bumpBuild(state, increment) {
  return { ...state, build: state.build + increment };
});

const Homepage = ({ build, bumpBuild }, ...props) => (
  <Page name="Index">
    <Box>
      <Box p={6} mw="1200px" mx="auto" align="center">
        <h1>Homepage</h1>
        <h3>Current build: {build}</h3>
        <p>
          <button onClick={e => bumpBuild(1)}>Bump build!</button>
        </p>
      </Box>
    </Box>
  </Page>
);

function mapStateToProps(state) {
  return getHomepageState(state);
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ bumpBuild }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
