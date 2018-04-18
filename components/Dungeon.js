import React, { Component } from "react";
import { A, Box, Flex, H2, Text, purple9 } from "styled-system-html";
import styled from "styled-components";
import { firstStore } from "../gameplay/createDungeon";

// import posed from "react-pose";

import BouncyTile from "./BouncyTile";

// import PosedTile from "../components/PosedTile";

// TODO: replace the divs with inlined styles to the components below
const Row = props => <Flex {...props} mx={-3} />;

const Column = props => <Box {...props} px={3} flex="1 1 auto" />;

const enemy = "blue";
const weapon = "#f3f70c";
const potion = "#ff0000";
const player = "#fc8d8d";
const exit = "#00b9f1";
const boss = "#c447e0";

const tileType = {
  boss: "#c447e0",
  enemy: "FireBrick",
  exit: "#00b9f1",
  floor: "green",
  player: "#fc8d8d",
  potion: "OrangeRed",
  weapon: "#f3f70c"
};

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCell = styled.div`
  background-color: ${props =>
    props.type && props.type !== "floor"
      ? tileType[props.type]
      : tileType["floor"]};
  color: ${props =>
    (props.type && props.type == "weapon") ||
    (props.type && props.type == "player") ||
    (props.type && props.type == "exit")
      ? "black"
      : "#eee"};
  opacity: ${props => props.opacity};
  height: 20px;
  width: 20px;
`;

export default function Dungeon({ store }) {
  let { playerPosition } = store;
  let entities = store;

  const [playerX = 0, playerY = 0] = playerPosition ? playerPosition : [0, 0];

  const cells = entities ? (
    entities.map((element, index) => {
      return (
        <StyledRow className="row" key={Date.now() + index}>
          {element.map((cell, i) => {

            return (
              <StyledCell
                key={i}
                className={cell.type ? "cell " + cell.type : "cell"}
                type={cell.type ? cell.type : null}
                opacity={cell.opacity ? cell.opacity : 1}
              >
                {cell.type == "enemy"
                  ? "E"
                  : cell.type == "weapon"
                    ? "W"
                    : cell.type == "exit"
                      ? "X"
                      : cell.type == "potion"
                        ? "H"
                        : cell.type == "player"
                          ? "P"
                          : ""}
              </StyledCell>
            );
          })}
        </StyledRow>
      );
    })
  ) : (
    <div>empty</div>
  );
  return (
    <div
      className="app"
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div
        className="flex-container"
        style={{ border: 1, borderColor: "rgba(0,0,0,1)" }}
      >
        {cells}
      </div>
    </div>
  );
}
