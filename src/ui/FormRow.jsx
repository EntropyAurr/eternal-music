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
    <div className="form-row">
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
