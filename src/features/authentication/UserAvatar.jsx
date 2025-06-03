import styled from "styled-components";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const Avatar = styled.img`
  display: block;
  width: 6rem;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
`;

function UserAvatar() {
  return (
    <StyledUserAvatar>
      <Avatar src="assets/avatar-1.jpg" />
    </StyledUserAvatar>
  );
}

export default UserAvatar;
