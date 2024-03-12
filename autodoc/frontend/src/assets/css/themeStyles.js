import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${(props) => props.theme.primary};
`;

export const ButtonOpacityBlue = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.buttonColor};
`;

export const ButtonHighlightDark = styled.TouchableHighlight`
  background-color: ${(props) => props.theme.secundary};
`;

export const TextName = styled.Text`
  color: ${(props) => props.theme.opositeColor};
`;

export const ContainerConfig = styled.SafeAreaView`
  background-color: ${(props) => props.theme.primary};
`;

export const ViewDark = styled.View`
  background-color: ${(props) => props.theme.secundary};
`;

export const InputsText  = styled.TextInput`
color: ${(props) => props.theme.opositeColor};
`;