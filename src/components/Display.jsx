import { useSelector } from "react-redux";
import "../sass/display.scss";
const Display = () => {
  const value = useSelector((state) => state.value);
  const generalDisplay = useSelector((state) => state.generalProcess);
  return (
    <div className="display-screen">
      <input value={generalDisplay} disabled type="text" id="generalDisplay" />
      <input value={value} disabled type="text" id="display" />
    </div>
  );
};

export default Display;
