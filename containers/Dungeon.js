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
  const [x, y] = payload; // .coords;
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
  return { ...state, dungeonLevel: state.dungeonLevel + payload };
});

const blah = new Promise((resolve, reject) => {});

function playerInput(playerLocation, entities, vector) {
  // let vectorX = vector[0];
  // let vectorY = vector[1];
  // let [x, y] = playerLocation;
  let [vectorX, vectorY] = vector;
  // const [x, y] = playerLocation;

  let x = playerLocation[0];
  let y = playerLocation[1];

  const newPosition = [vectorX + x, vectorY + y]; // define where we're moving to

  const newPlayer = entities[y][x];
  const destination = entities[y + vectorY][x + vectorX]; // whats in the cell we're heading to

  let [newX, newY] = newPosition;

  return newPosition; // changePlayerPosition(newPosition);
}

const handleKeyDown = actionCreator(function handleKeyDown(state, payload) {
  const upResult = playerInput(state.playerPosition, state.entities, [0, -1]);
  const rightResult = playerInput(state.playerPosition, state.entities, [1, 0]);
  const downResult = playerInput(state.playerPosition, state.entities, [0, 1]);
  const leftResult = playerInput(state.playerPosition, state.entities, [-1, 0]);

  payload.persist();

  switch (payload.key) {
    case "ArrowUp":
      return { ...state, playerPosition: upResult };
    case "ArrowRight":
      return {
        ...state,
        playerPosition: rightResult
      };
    case "ArrowDown":
      return {
        ...state,
        playerPosition: downResult
      };
    case "ArrowLeft":
      return {
        ...state,
        playerPosition: leftResult
      };

    default:
      return { ...state };
  }
});

const DungeonContainer = ({
  version,
  dungeonLevel,
  entities,
  bumpVersion,
  changeEntity,
  changePlayerPosition,
  createLevel,
  handleKeyDown,
  playerPosition,
  setDungeonLevel
}) => (
  <Page name="Dungeon">
    <Box
      p={4}
      mw="1200px"
      mx="auto"
      align="center"
      onKeyDown={e => handleKeyDown(e)}
      tabIndex="0"
    >
      <H3>Level {dungeonLevel}</H3>
      <pre>{JSON.stringify(playerPosition)}</pre>
      <Box my={3}>
        <Button bg="orange6" mr={1} onClick={e => bumpVersion(1)}>
          Bump version!
        </Button>
        <Button bg="pink8" mr={1} onClick={e => createLevel(1)}>
          Start Game!
        </Button>
        <Button bg="blue" mr={1} onClick={e => setDungeonLevel(1)}>
          Set Dungeon Level!
        </Button>
      </Box>
      {process.browser ? (
        <Dungeon store={entities} tabIndex="0" />
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
    { bumpVersion, changeEntity, createLevel, setDungeonLevel, handleKeyDown },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DungeonContainer);
