function Form({ children, ...props }) {
  return (
    <form {...props} className="form">
      {children}
    </form>
  );
}

export default Form;
