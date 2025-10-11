import Heading from "./Heading";

// const StyledConfirmDelete = styled.div`
//   width: 50rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1.2rem;

//   & p {
//     color: var(--color-grey-500);
//     margin-bottom: 1.2rem;
//   }

//   & div {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

function ConfirmDelete({ resourceName, onCloseModal, disabled, onConfirm }) {
  return (
    <div>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>Are you sure you want to delete this {resourceName} permanently? This action cannot be undone.</p>

      <div>
        <button className="btn secondary medium" onClick={onCloseModal} disabled={disabled}>
          Cancle
        </button>
        <button className="btn danger medium" onClick={onConfirm} disabled={disabled}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
