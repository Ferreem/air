import { useState } from "react";
import { motion } from "framer-motion";

interface InfoBoxProps {
  coordinates: { lat: number; lon: number }[];
  setCoordinates: (coordinates: { lat: number; lon: number }[]) => void;
  distance: number | null;
  angle?: number | null;
}

export default function InfoBox({
  coordinates,
  setCoordinates,
  distance,
  angle,
}: InfoBoxProps) {
  const [showMore, setShowMore] = useState(false);
  const [unit, setUnit] = useState<"km" | "miles">("km");

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
    color: "white",
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
  };

  const emptyDivStyle = {
    ...inputStyle,
    padding: 0,
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

  const handleInputChange = (
    index: number,
    field: "lat" | "lon",
    value: number
  ) => {
    const newCoordinates = [...coordinates];
    newCoordinates[index][field] = value;
    setCoordinates(newCoordinates);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value as "km" | "miles");
  };

  const convertDistance = (distance: number | null, unit: "km" | "miles") => {
    if (distance === null) return "";
    return unit === "km"
      ? distance.toFixed(3)
      : (distance * 0.621371).toFixed(3);
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: "100%",
      x: "-52%",
    },
    visible: {
      opacity: 1,
      y: "0%",
      x: "-52%",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      y: "0%",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        className="w-96 h-36 grid grid-cols-2 grid-rows-3 absolute left-1/2 bottom-20 p-6 bg-black gap-1 rounded-sm"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          transform: "translateX(-50%)",
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
      >
        <h3 className="absolute left-6 top-1 text-sm">Latitude:</h3>
        <h3 className="absolute top-1 text-sm" style={{ right: "7.5rem" }}>
          Longitude:
        </h3>
        <div
          className="col-span-1 row-span-1 bg-gray-800 relative"
          style={inlineStyle}
        >
          <h3 className="text-xs absolute -left-4 bottom-1">P1</h3>
          <input
            type="number"
            className="absolute"
            style={inputStyle}
            value={coordinates[0]?.lat || ""}
            onChange={(e) =>
              handleInputChange(0, "lat", parseFloat(e.target.value))
            }
          />
        </div>
        <div
          className="col-span-1 row-span-1 bg-gray-800 relative"
          style={inlineStyle}
        >
          <input
            type="number"
            className="absolute"
            style={inputStyle}
            value={coordinates[0]?.lon || ""}
            onChange={(e) =>
              handleInputChange(0, "lon", parseFloat(e.target.value))
            }
          />
        </div>
        <div
          className="col-span-1 row-span-1 bg-gray-800 relative"
          style={inlineStyle}
        >
          <h3 className="text-xs absolute -left-4 bottom-1">P2</h3>
          <input
            type="number"
            className="absolute"
            style={inputStyle}
            value={coordinates[1]?.lat || ""}
            onChange={(e) =>
              handleInputChange(1, "lat", parseFloat(e.target.value))
            }
          />
        </div>
        <div
          className="col-span-1 row-span-1 bg-gray-800 relative"
          style={inlineStyle}
        >
          <input
            type="number"
            className="absolute"
            style={inputStyle}
            value={coordinates[1]?.lon || ""}
            onChange={(e) =>
              handleInputChange(1, "lon", parseFloat(e.target.value))
            }
          />
        </div>
        <div
          className="col-span-1 row-span-1 bg-gray-800 h-10"
          style={inlineStyle}
        >
          <div className="w-20 h-10 relative">
            <div className="flex items-center" style={emptyDivStyle}>
              {convertDistance(distance, unit)}
            </div>
          </div>
          <div className="flex flex-col ml-1 mt-1">
            <div className="flex relative">
              <input
                type="radio"
                id="km"
                name="distance"
                value="km"
                style={radioStyle}
                defaultChecked
                onChange={handleUnitChange}
              />
              <label
                className="text-sm flex absolute left-5 -bottom-1"
                htmlFor="km"
              >
                km
              </label>
            </div>
            <div className="flex relative mt-2">
              <input
                type="radio"
                id="miles"
                name="distance"
                value="miles"
                style={radioStyle}
                onChange={handleUnitChange}
              />
              <label
                htmlFor="miles"
                className="text-sm flex absolute left-5 -bottom-1"
              >
                miles
              </label>
            </div>
          </div>
        </div>
        <div
          className="col-span-1 row-span-1 bg-gray-800 h-10"
          style={inlineStyle}
        >
          <div className="w-20 h-10 relative">
            <div className="flex items-center" style={emptyDivStyle}>
              {angle !== null ? `${angle}°` : ""}
            </div>
          </div>
          <div className="flex flex-col ml-1 mt-1">
            <div className="flex relative">
              <input
                type="radio"
                id="angle"
                name="angle"
                value="angle"
                style={radioStyle}
                defaultChecked
              />
              <label
                className="text-sm flex absolute left-5 -bottom-1"
                htmlFor="angle"
              >
                angle
              </label>
            </div>
            <div className="flex relative mt-2">
              <input
                type="radio"
                id="radian"
                name="angle"
                value="radian"
                style={radioStyle}
              />
              <label
                htmlFor="radian"
                className="text-sm flex absolute left-5 -bottom-1"
              >
                radian
              </label>
            </div>
          </div>
        </div>
      </motion.div>
      <button
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.70)",
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
          borderRadius: "0.125rem",
          position: "absolute",
          bottom: "14rem",
          height: "1.5rem",
          width: "9.5rem",
          left: "-1rem",
          justifyContent: "center",
        }}
        className="mt-4 bg-gray-700 text-white py-1 px-4 rounded"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Hide Points" : "Show More Points"}
      </button>
      {showMore && (
        <motion.div
          className="w-96 h-36 grid grid-cols-2 grid-rows-3 absolute left-1/2 bottom-4 p-6 bg-black gap-1 rounded-sm overflow-auto"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            transform: "translateX(-50%)",
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
        >
          {coordinates.flatMap((coord, index) => [
            <div
              key={`lat-${index}`}
              className="col-span-1 row-span-1 bg-gray-800 relative"
              style={inlineStyle}
            >
              <h3 className="text-xs absolute -left-4 bottom-1">
                P{index + 1}
              </h3>
              <input
                type="number"
                className="absolute"
                style={inputStyle}
                value={coord.lat || ""}
                onChange={(e) =>
                  handleInputChange(index, "lat", parseFloat(e.target.value))
                }
              />
            </div>,
            <div
              key={`lon-${index}`}
              className="col-span-1 row-span-1 bg-gray-800 relative"
              style={inlineStyle}
            >
              <input
                type="number"
                className="absolute"
                style={inputStyle}
                value={coord.lon || ""}
                onChange={(e) =>
                  handleInputChange(index, "lon", parseFloat(e.target.value))
                }
              />
            </div>,
          ])}
        </motion.div>
      )}
    </>
  );
}