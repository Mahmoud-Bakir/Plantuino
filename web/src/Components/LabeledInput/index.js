import "./style.css";

const LabeledInput = ({ naming, Itype, onChange, holder, lab }) => {
  return (
    <div className="part">
      <label htmlFor="" className="lab">{lab}</label>
      <input
        name={naming}
        type={Itype}
        onChange={onChange}
        placeholder={holder}
        required
      />
    </div>
  );
};
export default LabeledInput;
