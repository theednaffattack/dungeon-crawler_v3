import { Footer, Flex, Span, A } from "styled-system-html";

export default props => (
  <Footer borderTop border={1} borderColor="gray1" py={5} px={3} align="center">
    <Span mx={3}>
      Made by{" "}
      <A
        color="base"
        href="https://github.com/theednaffattack"
        children="Eddie Naff"
      />
    </Span>
    <Span color="gray"> | </Span>
    <A
      color="base"
      mx={3}
      href="http://twitter.com/theednaffattack"
      children="@theednaffattack"
    />
    <Span color="gray"> | </Span>
    <A
      color="base"
      ml={3}
      href="http://eddienaff.com"
      children="eddienaff.com"
    />
  </Footer>
);
