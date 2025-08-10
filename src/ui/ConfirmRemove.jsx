import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";

const StyledConfirmRemove = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmRemove({ resourceName, onCloseModal, disabled, onConfirm }) {
  return (
    <StyledConfirmRemove>
      <Heading as="h3">Remove {resourceName}</Heading>
      <p>Are you sure you want to remove this {resourceName} from the playlist? This action cannot be undone.</p>

      <div>
        <Button $variation="secondary" size="medium" onClick={onCloseModal} disabled={disabled}>
          Cancle
        </Button>
        <Button $variation="danger" size="medium" onClick={onConfirm} disabled={disabled}>
          Remove
        </Button>
      </div>
    </StyledConfirmRemove>
  );
}

export default ConfirmRemove;
