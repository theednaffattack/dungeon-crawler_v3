import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { namespaceConfig } from "fast-redux";
import Link from "next/link";
import Page from "./Page";
import Dungeon from "../components/Dungeon";

import { firstStore } from "../gameplay/createDungeon";

const DEFAULT_STATE = { version: 1 };

const { actionCreator, getState: getDungeonState } = namespaceConfig(
  "dungeon",
  DEFAULT_STATE
);

const bumpVersion = actionCreator(function bumpVersion(state, increment) {
  return { ...state, version: state.version + increment };
});

const DungeonContainer = ({ version, bumpVersion }) => (
  <div>
    <Page name="Dungeon">
      <h1>Dungeon</h1>
      {process.browser ? <Dungeon store={firstStore} /> : <div>loading...</div>}
      <h3>Current version: {version}</h3>
      <p>
        <button onClick={e => bumpVersion(1)}>Bump version!</button>
      </p>
    </Page>
  </div>
);

function mapStateToProps(state) {
  return getDungeonState(state, "version");
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ bumpVersion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DungeonContainer);
