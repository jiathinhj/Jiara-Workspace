import { useCallback, useMemo } from "react";
import { styled } from "styled-components";

const Avatar = ({ firstname, lastname }: any) => {
  const generateRandomColorNumber = useCallback(() => {
    let randomHue = Math.floor(Math.random() * 360);
    return randomHue;
  }, [firstname, lastname]);

  const generatePlaceholderName = useCallback(
    (firstname: string, lastname?: string) => {
      return firstname && lastname
        ? firstname?.charAt(0).toUpperCase() + lastname?.charAt(0).toUpperCase()
        : "JR";
    },
    [firstname, lastname]
  );

  const avatarPlaceholder = useMemo(
    () => generatePlaceholderName(firstname, lastname),
    [firstname, lastname]
  );
  const placeholderBackground = useMemo(
    () => `hsl(${generateRandomColorNumber()}, 50% , 50%)`,
    [firstname, lastname]
  );
  return (
    <StyledAvatar
      className="avatar-placeholder"
      style={{
        backgroundColor: placeholderBackground,
      }}
    >
      <p> {avatarPlaceholder}</p>
    </StyledAvatar>
  );
};
const StyledAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin-bottom: unset;
    font-weight: 600;
  }
`;

export default Avatar;
