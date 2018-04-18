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
  enemy: "FireBrick",
  weapon: "#f3f70c",
  potion: "OrangeRed",
  player: "#fc8d8d",
  exit: "#00b9f1",
  boss: "#c447e0",
  floor: "green"
};

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCell = styled.div`
  background-color: ${props => props.type && props.type !== "floor" ? tileType[props.type] : tileType["floor"]};
  opacity: ${props => props.opacity};
  color: ${props => props.type && props.type !== "exit" && props.type !=="player" && props.type !=="weapon" ? "#eee" : "black"};
  height: 22px;
  width: 22px;
`;

const StyledBouncyCell = styled(BouncyTile)`
  background-color: ${props =>
    props.type && props.type !== "floor" ? tileType[props.type] : "green"};
  opacity: ${props => props.opacity};
  height: 20px;
  width: 20px;
`;

export default function Dungeon({store}) {
  // constructor(props) {
  //   super(props);
  //   handleKeydown = this.bind(handleKeydown);
  // }
  // handleKeydown = e => {
  //   console.log("i have pressed a key");
  // };
  // render() {
    // let { playerPosition } = this.props.store;
    let entities  = store;
    // console.log(props)

    // const [playerX = 0, playerY = 0] = playerPosition ? playerPosition : [0, 0];

    // const { store } = this.props;
    const cells = !entities
      ? [1, 2, 3]
      : entities.map((element, index) => {
          return (
            <StyledRow className="row" key={Date.now() + index}>
              {element.map((cell, i) => {
                ////////////logs for better understanding the type cells//////////////
                if (cell.type == "enemy") console.log(cell);
                else if (cell.type == "weapon") console.log(cell);
                else if (cell.type == "exit") console.log(cell);
                else if (cell.type == "player") console.log(cell);
                /////////////////////////////////////////////////////////////
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
                          : cell.type == "player"
                            ? "P" 
                            : cell.type == "potion"
                              ? "H" 
                              : cell.type == "boss"
                                ? "B" : ""}
                  </StyledCell>
                );
              })}
            </StyledRow>
          );
        });

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
          style={{ border: 1, borderColor: "rgba(0,0,0,0.2)" }}
        >
          {cells}
        </div>
      </div>
    );
  // }
}
