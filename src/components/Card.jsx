import "../sass/card.scss";
import Display from "./Display";
import { KeysWrapper } from "./KeysWrapper";

export const Card = () => {
  return (
    <div className="card">
      <Display />
      <KeysWrapper />
    </div>
  );
};
