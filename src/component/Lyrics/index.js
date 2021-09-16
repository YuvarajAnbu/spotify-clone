import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveComponent } from '../../redux/activeComponent/activeComponentSlice';

import './index.css';

function Lyrics() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeActiveComponent('lyrics'));
    document.title = 'Spotify - Lyrics';
  }, [dispatch]);

  const lyrics = `
  [00:09.29]Ah, ah.
  [00:19.29]We come from the land of the ice and snow,
  [00:20.80]From the midnight sun where the hot springs flow.
  [00:24.55]Hammer of the gods will drive our ships to new land.
  [00:31.81]To fight the hordes and sing, and cry.
  [00:35.80]Valhalla, I am coming.
  [00:44.56]Always sweep with, with threshing oar.
  [00:49.05]Our only goal will be the western shore.
  [00:57.06]Ah, ah.
  [01:05.80]We come from the land of the ice and snow,
  [01:07.55]From the midnight sun where the hot springs flow.
  [01:11.05]How soft your fields so green. Can whisper tales of gore.
  [01:18.30]Of how we calmed the tides of war. We are your overlords.
  [01:31.05]Always sweep with threshing oar,
  [01:35.30]Our only goal will be the western shore.
  [01:45.05]So now you'd better stop and rebuild all your ruins.
  [01:48.30]For peace and trust can win the day despite of all your losing.
  [01:56.32]Ooh. Ooh. Ooh. Ooh. Ooh 
  `;

  const { currentTime } = useSelector((state) => state.songs);
  const [lyricsArr, setLyricsArr] = useState([]);
  const [currentText, setCurrentText] = useState(-1);

  useEffect(() => {
    const linesArr = lyrics.trim().split('\n');

    setLyricsArr(
      linesArr.map((e) => {
        const arr = e.replace('[', '').split(']');
        const splitTime = arr[0].split(':');
        arr[0] = Number(splitTime[0] * 60) + Number(splitTime[1]);
        return arr;
      })
    );
  }, [lyrics]);

  useEffect(() => {
    lyricsArr.forEach((item, i) => {
      if (currentTime >= item[0]) {
        setCurrentText(i);
      }
    });
  }, [currentTime, lyricsArr]);

  useEffect(() => {
    if (lyricsArr.length > 0) {
      const list = document.querySelector('.lyrics__container__content');
      if (currentText >= 0) {
        list.removeChild(list.childNodes[0]);
      }
      if (list.children[0]) {
        list.children[0].setAttribute('style', `--animation-index: ${0}`);
        if (lyricsArr[currentText - 1]) {
          if (list.children[0].textContent !== lyricsArr[currentText - 1][1]) {
            list.children[0].textContent = lyricsArr[currentText - 1][1];
          }
        } else {
          list.children[0].textContent = '';
        }
      }
      if (list.children[1]) {
        list.children[1].setAttribute('style', `--animation-index: ${1}`);

        if (lyricsArr[currentText]) {
          if (list.children[1].textContent !== lyricsArr[currentText][1]) {
            list.children[1].textContent = lyricsArr[currentText][1];
          }
        }
      }
      if (list.children[2]) {
        list.children[2].setAttribute('style', `--animation-index: ${2}`);

        if (lyricsArr[currentText + 1]) {
          if (list.children[2].textContent !== lyricsArr[currentText + 1][1]) {
            list.children[2].textContent = lyricsArr[currentText + 1][1];
          }
        } else {
          list.children[2].textContent = '';
        }
      }
      if (list.children[3]) {
        list.children[3].setAttribute('style', `--animation-index: ${3}`);

        if (lyricsArr[currentText + 2]) {
          if (list.children[3].textContent !== lyricsArr[currentText + 2][1]) {
            list.children[3].textContent = lyricsArr[currentText + 2][1];
          }
        } else {
          list.children[3].textContent = '';
        }
      }
      if (currentText >= 0) {
        let node = document.createElement('p');
        let textnode = '';
        if (lyricsArr[currentText + 3]) {
          textnode = document.createTextNode(lyricsArr[currentText + 3][1]);
        } else {
          textnode = document.createTextNode('');
        }
        node.setAttribute('style', `--animation-index: ${4}`);
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
          <p style={{ '--animation-index': 0 }}></p>
          <p style={{ '--animation-index': 1 }}></p>
          <p style={{ '--animation-index': 2 }}></p>
          <p style={{ '--animation-index': 3 }}></p>
          <p style={{ '--animation-index': 4 }}></p>
        </div>
      </div>
    </div>
  );
}

export default Lyrics;
