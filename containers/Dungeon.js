import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { namespaceConfig } from "fast-redux";
import Link from "next/link";
import Page from "./Page";
import Dungeon from "../components/Dungeon";
import { Box, Button, Text, H3 } from "styled-system-html";
import styled from "styled-components";
import { update } from "react-addons-update";

import { firstStore } from "../gameplay/createDungeon";

const StyledLoading = styled.div`
  color: OrangeRed;
  display: flex;
  justify-content: center;
`;

const INITIAL_STATE = {
  //our grid is an array of arrays
  entities: [[]],
  //the dungeon level we use when generating entities
  dungeonLevel: 0,
  //the array containing the coordinated
  playerPosition: [],
  version: 1
};

const DEFAULT_STATE = {
  //our grid is an array of arrays
  entities: firstStore.entities.entities,
  //the dungeon level we use when generating entities
  dungeonLevel: 0,
  //the array containing the coordinated
  playerPosition: firstStore.entities.playerPosition,
  version: 1
};

const { actionCreator, getState: getDungeonState } = namespaceConfig(
  "dungeon",
  DEFAULT_STATE
);

const bumpVersion = actionCreator(function bumpVersion(state, increment) {
  return { ...state, version: state.version + increment };
});

const changeEntity = actionCreator(function changeEntity(state, payload) {
  const [x, y] = payload.coords;
  const entities = update(state.entities, {
    [y]: {
      [x]: { $set: payload.entity }
    }
  });
  return { ...state, entities };
});

const changePlayerPosition = actionCreator(function changeEntity(
  state,
  payload
) {
  return { ...state, playerPosition: payload };
});

const createLevel = actionCreator(function createLevel(state, payload) {
  return {
    ...state,
    firstStore
  };
});

const setDungeonLevel = actionCreator(function setDungeonLevel(state, payload) {
  console.log(state);
  return { ...state, dungeonLevel: state.dungeonLevel + payload };
});

const DungeonContainer = ({
  version,
  dungeonLevel,
  entities,
  bumpVersion,
  changeEntity,
  changePlayerPosition,
  createLevel,
  setDungeonLevel
}) => (
  <Page name="Dungeon">
    <Box p={4} mw="1200px" mx="auto" align="center">
      <H3>Level {dungeonLevel}</H3>
      <Box>
        <Button bg="base" mr={1} onClick={e => bumpVersion(1)}>
          Bump version!
        </Button>
        <Button bg="base" mr={1} onClick={e => createLevel(1)}>
          Start Game!
        </Button>
        <Button bg="base" mr={1} onClick={e => setDungeonLevel(1)}>
          Set Dungeon Level!
        </Button>
      </Box>
      {process.browser ? (
        <Dungeon store={firstStore.entities} />
      ) : (
        <StyledLoading>loading...</StyledLoading>
      )}
    </Box>
  </Page>
);

function mapStateToProps(state) {
  return getDungeonState(
    state,
    "dungeonLevel",
    "entities",
    "playerPosition",
    "version"
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { bumpVersion, changeEntity, createLevel, setDungeonLevel },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DungeonContainer);
