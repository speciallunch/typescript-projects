import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // NOTE. 그냥 canavs 정의하면 DOM read하기전에 정의하기 떄문에 canvas = null
  // 따라서 useEffect로 mount 시에 canvas 세팅
  const [img, setImg] = useState(new Image());

  const drawImageToCanvas = (image: HTMLImageElement) => {
    const canvas = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null; // 다운 캐스팅

    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  };

  const onLoadImg = (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    // readAsDataURL: 컨텐츠를 특정 Blob이나 File에서 읽어오는 api
    if (file) {
      fileReader.readAsDataURL(file);
    }

    fileReader.onload = () => {
      const image = new Image();
      image.src = fileReader.result as string; // 다운 캐스팅
      setImg(image);
      image.onload = function () {
        drawImageToCanvas(image);
      };
    };
  };

  const onFilter = () => {
    const canvas = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null; // 다운 캐스팅

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.filter =
          "invert(37%) sepia(0%) saturate(2008%) hue-rotate(316deg) brightness(78%) contrast(109%)";
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className="App">
      <canvas id="canvas" width="600" height="600"></canvas>
      <input
        id="loadButton"
        type="file"
        accept="image/*"
        onChange={onLoadImg}
      />
      <button id="filterButton" onClick={onFilter}>
        Filter
      </button>
    </div>
  );
}

export default App;
