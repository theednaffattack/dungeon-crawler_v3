import { Nav, Flex, Box, H1, A, Img, Text, Button } from "styled-system-html";
import Link from "next/link";
import SiteNavLink from "./SiteNavLink";
import SiteNavLinkExternal from "./SiteNavLinkExternal";

export default props => (
  <Box bg="base" position="relative" style={{ zIndex: 9999 }}>
    <Nav bg="rgba(0,0,0,.2)" align="left" px={[2, 0, 2]}>
      <Flex wrap="wrap">
        <SiteNavLink url="/" isCurrent={props.current === "Index"}>
          Home
        </SiteNavLink>
        <SiteNavLink url="about" isCurrent={props.current === "About"}>
          About
        </SiteNavLink>
        <SiteNavLink url="dungeon" isCurrent={props.current === "Dungeon"}>
          Dungeon
        </SiteNavLink>
        <Box ml="auto">
          <SiteNavLinkExternal url="https://github.com/theednaffattack/dungeon-crawler_v3">
            <Img
              position="relative"
              style={{ top: "3px", left: "-1px" }}
              src="./static/images/github.svg"
              height="18"
              alt="Octocat"
            />{" "}
            Github
          </SiteNavLinkExternal>
        </Box>
      </Flex>
    </Nav>
  </Box>
);
