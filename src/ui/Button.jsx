function Button({ children, variant, size }) {
  return <button className={`btn ${variant} ${size}`}>{children}</button>;
}

export default Button;
