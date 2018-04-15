import styled, { keyframes } from "styled-components";
import { bounce, pulse, slideInUp, zoomIn } from "react-animations";

const bounceAnimation = keyframes`${slideInUp}`;

const BouncyTile = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

export default BouncyTile;
