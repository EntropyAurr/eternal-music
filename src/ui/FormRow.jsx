// const StyledFormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 27rem 1fr 1.2fr;
//   gap: 2.4rem;
//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
//   font-size: 1.7rem;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function FormRow({ label, error, children }) {
  return (
    <div className="grid grid-cols-[27rem_1fr_1.2fr] items-center">
      {label && (
        <label className="text-lg font-medium" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm">{error}</span>}
    </div>
  );
}

export default FormRow;
