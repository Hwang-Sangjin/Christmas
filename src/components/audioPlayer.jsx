import { useCallback, useEffect, useRef, useState } from "react";
import Drawer from "react-bottom-drawer";
import { BiSolidMusic } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { FaFastForward } from "react-icons/fa";
import { FaFastBackward } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const AudioPlayer = ({
  playMusic,
  play,
  start,
  stop,
  rangeValue,
  onChangeRange,
  duration,
  onClickNext,
  onClickPrevious,
}) => {
  const [isUp, setIsUp] = useState(false);

  const openDrawer = useCallback(() => setIsUp(true), []);
  const closeDrawer = useCallback(() => setIsUp(false), []);

  return (
    <>
      <button
        onClick={openDrawer}
        className="absolute bottom-56 right-5 btn btn-light px-4 py-2"
      >
        <BiSolidMusic size={40} />
      </button>
      <Drawer
        className="drawer"
        duration={250}
        hideScrollbars={true}
        onClose={closeDrawer}
        isVisible={isUp}
      >
        <div className="flex flex-row justify-between m-5">
          <div className=" flex flex-1">
            <div className="flex flex-row">
              <div>
                <img
                  className="w-32 h-32"
                  src={playMusic?.musicImageSrc}
                  alt="music image"
                />
              </div>
              <div className="flex flex-col flex-1">
                <div>{playMusic?.musicName}</div>
                <div>{playMusic?.musicArtist}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <div className="flex flex-row justify-center mb-8">
              <FaFastBackward
                size={50}
                className="flex mx-5"
                onClick={onClickPrevious}
              />
              {play ? (
                <FaPause size={50} className="flex mx-5" onClick={stop} />
              ) : (
                <FaPlay size={50} className="flex mx-5" onClick={start} />
              )}
              <FaFastForward
                size={50}
                className="flex mx-5"
                onClick={onClickNext}
              />
            </div>
            <input
              type="range"
              className="progressBar"
              value={Math.floor(rangeValue)}
              max="100"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.floor(rangeValue)}
              onClick={onChangeRange}
              readOnly
            />
          </div>

          <div className="flex flex-1"></div>
        </div>
      </Drawer>
    </>
  );
};

export default AudioPlayer;
