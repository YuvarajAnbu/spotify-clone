import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveComponent } from "../../redux/activeComponent/activeComponentSlice";
import lyrics from "../../redux/songs/lyrics";

import "./index.css";

function Lyrics() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeActiveComponent("lyrics"));
    document.title = "Spotify - Lyrics";
  }, [dispatch]);

  //lyrics lrc type

  const { currentTime, currentSong } = useSelector((state) => state.songs);
  const [lyricsArr, setLyricsArr] = useState([]);
  const [currentText, setCurrentText] = useState(-1);

  useEffect(() => {
    let linesArr = lyrics.find((e) => e.id === currentSong.id)?.lyrics;

    linesArr = linesArr ? linesArr?.trim()?.split("\n") : linesArr;

    setLyricsArr(
      linesArr.map((e) => {
        const arr = e.replace("[", "").split("]");
        const splitTime = arr[0].split(":");
        arr[0] = Number(splitTime[0] * 60) + Number(splitTime[1]);
        return arr;
      })
    );
  }, [currentSong]);

  useEffect(() => {
    lyricsArr.forEach((item, i) => {
      if (currentTime >= item[0]) {
        setCurrentText(i);
      }
    });
  }, [currentTime, lyricsArr]);

  useEffect(() => {
    if (lyricsArr.length > 0) {
      const list = document.querySelector(".lyrics__container__content");
      if (currentText >= 0) {
        list.removeChild(list.childNodes[0]);
      }
      if (list.children[0]) {
        list.children[0].setAttribute("style", `--animation-index: ${0}`);
        if (lyricsArr[currentText - 1]) {
          if (list.children[0].textContent !== lyricsArr[currentText - 1][1]) {
            list.children[0].textContent = lyricsArr[currentText - 1][1];
          }
        } else {
          list.children[0].textContent = "";
        }
      }
      if (list.children[1]) {
        list.children[1].setAttribute("style", `--animation-index: ${1}`);

        if (lyricsArr[currentText]) {
          if (list.children[1].textContent !== lyricsArr[currentText][1]) {
            list.children[1].textContent = lyricsArr[currentText][1];
          }
        }
      }
      if (list.children[2]) {
        list.children[2].setAttribute("style", `--animation-index: ${2}`);

        if (lyricsArr[currentText + 1]) {
          if (list.children[2].textContent !== lyricsArr[currentText + 1][1]) {
            list.children[2].textContent = lyricsArr[currentText + 1][1];
          }
        } else {
          list.children[2].textContent = "";
        }
      }
      if (list.children[3]) {
        list.children[3].setAttribute("style", `--animation-index: ${3}`);

        if (lyricsArr[currentText + 2]) {
          if (list.children[3].textContent !== lyricsArr[currentText + 2][1]) {
            list.children[3].textContent = lyricsArr[currentText + 2][1];
          }
        } else {
          list.children[3].textContent = "";
        }
      }
      if (currentText >= 0) {
        let node = document.createElement("p");
        let textnode = "";
        if (lyricsArr[currentText + 3]) {
          textnode = document.createTextNode(lyricsArr[currentText + 3][1]);
        } else {
          textnode = document.createTextNode("");
        }
        node.setAttribute("style", `--animation-index: ${4}`);
        node.appendChild(textnode);
        list.appendChild(node);
      }
    }
  }, [lyricsArr, currentText]);

  return lyricsArr.length < 1 ? (
    <div></div>
  ) : (
    <div className="lyrics">
      <div className="lyrics__background"></div>
      <div className="lyrics__container">
        <div className="lyrics__container__content">
          <p style={{ "--animation-index": 0 }}></p>
          <p style={{ "--animation-index": 1 }}></p>
          <p style={{ "--animation-index": 2 }}></p>
          <p style={{ "--animation-index": 3 }}></p>
          <p style={{ "--animation-index": 4 }}></p>
        </div>
      </div>
    </div>
  );
}

export default Lyrics;
