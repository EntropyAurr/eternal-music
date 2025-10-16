function FileInput({ children, ...props }) {
  return (
    <input {...props} className="input-file" type="file">
      {children}
    </input>
  );
}

export default FileInput;
