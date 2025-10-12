// const StyledConfirmRemove = styled.div`
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

function ConfirmRemove({ resourceName, onCloseModal, disabled, onConfirm }) {
  return (
    <div className="flex w-xl flex-col">
      <h3>Remove {resourceName}</h3>
      <p>Are you sure you want to remove this {resourceName} from the playlist? This action cannot be undone.</p>

      <div>
        <button className="btn secondary medium" onClick={onCloseModal} disabled={disabled}>
          Cancle
        </button>
        <button className="btn danger medium" onClick={onConfirm} disabled={disabled}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default ConfirmRemove;
