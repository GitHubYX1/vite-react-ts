//按钮
export default function Square({ value, className, onClick }: { value: string; className: string; onClick: () => void }) {
  return (
    <button className={"square" + (className&&" " + className)} onClick={onClick}>
      {value}
    </button>
  );
}

Square.defaultProps = {
  className: "",
  onClick: () => { },
};
