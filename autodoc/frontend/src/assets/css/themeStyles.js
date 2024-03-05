import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${(props) => props.theme.background};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.buttonColor};
`;

export const ButtonConfig = styled.TouchableHighlight`
  background-color: ${(props) => props.theme.background2};
`;

export const TextName = styled.Text`
  color: ${(props) => props.theme.color};
`;
