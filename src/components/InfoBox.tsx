import { color } from "framer-motion";


export default function InfoBox({ }) {
  const inlineStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    borderRadius: "0.125rem",
    position: "relative",
  };
  const inputStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: "100%",
    height: "100%",
    borderRadius: "0.125rem",
    color: "gray",
    border: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    margin: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: "0.5rem",
    color: "white",
  };
  
  const emptyDivStyle = {
    ...inputStyle,
    padding: 0, // Remove padding for the empty div
  };

  const radioStyle = {
    width: "0.8rem",
    height: "0.8rem",
    borderRadius: "50%",
    border: "2px solid gray",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "white",
    marginRight: "0.5rem",
  };

  return (
    <div
      className="w-96 h-36 grid grid-cols-2 grid-rows-3 absolute -translate-x-1/2 left-1/2 bottom-20 p-6 bg-black gap-1 rounded-sm"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <h3 className="absolute left-6 top-1 text-sm">Latitude:</h3>
      <h3 className="absolute top-1 text-sm" style={{ right: "7.5rem" }}>
        Longitude:
      </h3>
      <div className="col-span-1 row-span-1 bg-gray-800 relative" style={inlineStyle}>
        <h3 className="text-xs absolute -left-4 bottom-1">P1</h3>
        <input type="number" className="absolute" style={inputStyle} />
      </div>
      <div className="col-span-1 row-span-1 bg-gray-800 relative" style={inlineStyle}>
        <input type="number" className="absolute" style={inputStyle} />
      </div>
      <div className="col-span-1 row-span-1 bg-gray-800 relative" style={inlineStyle}>
        <h3 className="text-xs absolute -left-4 bottom-1">P2</h3>
        <input type="number" className="absolute" style={inputStyle} />
      </div>
      <div className="col-span-1 row-span-1 bg-gray-800 relative" style={inlineStyle}>
        <input type="number" className="absolute" style={inputStyle} />
      </div>
      <div className="col-span-1 row-span-1 bg-gray-800 h-10" style={inlineStyle}>
        <div className="w-20 h-10 relative">
          <div style={emptyDivStyle}></div>
        </div>
        <div className="flex flex-col ml-1 mt-1">
          <div className="flex relative">
            <input type="radio" id="km" name="distance" value="km" style={radioStyle} />
            <label className="text-sm flex absolute left-5 -bottom-1" htmlFor="km">
              km
            </label>
          </div>
          <div className="flex relative mt-2">
            <input type="radio" id="miles" name="distance" value="miles" style={radioStyle} />
            <label htmlFor="miles" className="text-sm flex absolute left-5 -bottom-1">
              miles
            </label>
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-1 bg-gray-800 h-10" style={inlineStyle}>
        <div className="w-20 h-10 relative">
          <div style={emptyDivStyle}></div>
        </div>
        <div className="flex flex-col ml-1 mt-1">
          <div className="flex relative">
            <input type="radio" id="angle" name="angle" value="angle" style={radioStyle} />
            <label className="text-sm flex absolute left-5 -bottom-1" htmlFor="angle">
              angle
            </label>
          </div>
          <div className="flex relative mt-2">
            <input type="radio" id="radian" name="angle" value="radian" style={radioStyle} />
            <label htmlFor="radian" className="text-sm flex absolute left-5 -bottom-1">
              radian
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}