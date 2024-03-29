import { useDispatch } from "react-redux";
import { calculateActions } from "../store";
import "../sass/keyWrapper.scss";
import Key from "./Key";
export const KeysWrapper = () => {
  const { handleOpr, calculate, handleDecimal, clear, handleNumber } =
    calculateActions;
  const dispatch = useDispatch();
  return (
    <div className="key-wrapper">
      <Key onClick={() => dispatch(handleNumber({ value: 7 }))} id="seven">
        7
      </Key>
      <Key onClick={() => dispatch(handleNumber({ value: 8 }))} id="eight">
        8
      </Key>
      <Key onClick={() => dispatch(handleNumber({ value: 9 }))} id="nine">
        9
      </Key>
      <Key onClick={() => dispatch(handleOpr({ opr: "+" }))} id="add">
        +
      </Key>
      <Key onClick={() => dispatch(handleNumber({ value: 4 }))} id="four">
        4
      </Key>
      <Key onClick={() => dispatch(handleNumber({ value: 5 }))} id="five">
        5
      </Key>
      <Key onClick={() => dispatch(handleNumber({ value: 6 }))} id="six">
        6
      </Key>
      <Key onClick={() => dispatch(handleOpr({ opr: "-" }))} id="subtract">
        -
      </Key>
      <Key onClick={() => dispatch(handleNumber({ value: 1 }))} id="one">
        1
      </Key>
      <Key onClick={() => dispatch(handleNumber({ value: 2 }))} id="two">
        2
      </Key>
      <Key onClick={() => dispatch(handleNumber({ value: 3 }))} id="three">
        3
      </Key>
      <Key onClick={() => dispatch(handleOpr({ opr: "*" }))} id="multiply">
        X
      </Key>
      <Key onClick={() => dispatch(handleNumber({ value: 0 }))} id="zero">
        0
      </Key>
      <Key onClick={() => dispatch(clear())} id="clear">
        AC
      </Key>
      <Key onClick={() => dispatch(calculate())} id="equals">
        =
      </Key>
      <Key onClick={() => dispatch(handleOpr({ opr: "/" }))} id="divide">
        /
      </Key>
      <Key onClick={() => dispatch(handleDecimal())} id="decimal">
        .
      </Key>
    </div>
  );
};
