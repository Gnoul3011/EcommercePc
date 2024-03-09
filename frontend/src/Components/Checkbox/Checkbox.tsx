function Checkbox(props: any) {
  const { label, ...others } = props;
  return (
    <Checkbox
      {...others}
      label={label}
    />
  );
}

export default Checkbox;
