import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${(props) => props.theme.background};
`;
export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.buttonColor};
`;
