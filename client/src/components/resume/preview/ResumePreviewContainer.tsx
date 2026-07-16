import { useEffect, useState } from "react";

import PreviewBackground from "./PreviewBackground";
import ResumePreviewToolbar from "./ResumePreviewToolbar";

type Props = {
  children: React.ReactNode;
};

export default function ResumePreviewContainer({
  children,
}: Props) {
  const [zoom, setZoom] = useState(90);

 const zoomIn = () =>
  setZoom((z) => Math.min(z + 5, 200));

const zoomOut = () =>
  setZoom((z) => Math.max(z - 5, 40));

  const fit = () => {

    useEffect(() => {
  fit();
}, []);

    useEffect(() => {
  const handler = (e: WheelEvent) => {
    if (!e.ctrlKey) return;

    e.preventDefault();

    if (e.deltaY < 0) {
      setZoom((z) => Math.min(z + 5, 200));
    } else {
      setZoom((z) => Math.max(z - 5, 40));
    }
  };

  window.addEventListener("wheel", handler, {
    passive: false,
  });

  return () =>
    window.removeEventListener("wheel", handler);
}, []);



  if (window.innerWidth > 1800) {
    setZoom(100);
  } else if (window.innerWidth > 1500) {
    setZoom(90);
  } else if (window.innerWidth > 1200) {
    setZoom(75);
  } else {
    setZoom(60);
  }
};

  return (
    <>
      <ResumePreviewToolbar
zoom={zoom}
zoomIn={zoomIn}
zoomOut={zoomOut}
fit={fit}
setZoom={setZoom}
/>

      <PreviewBackground>
 <div
  className="
  flex
  justify-center
  items-start

  px-10
  py-10
  "
>
    <div
style={{
transform: `scale(${zoom / 100})`,
transformOrigin: "top center",
transition: "transform .25s ease",
}}
className="
relative
"
>
      {children}
    </div>
  </div>
</PreviewBackground>
    </>
  );
}