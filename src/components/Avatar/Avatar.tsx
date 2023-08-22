import { styled } from "styled-components";
import {
  generatePlaceholderName,
  generateRandomColorNumber,
} from "./avatarGenerator";
import { memo } from "react";

const Avatar = memo(function Avatar({ firstname, lastname }: any) {
  const avatarPlaceholder = generatePlaceholderName(firstname, lastname);
  const placeholderBackground = `hsl(${generateRandomColorNumber()}, 50% , 50%)`;
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
});
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
