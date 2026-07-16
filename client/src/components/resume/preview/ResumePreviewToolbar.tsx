// import { FiZoomIn, FiZoomOut } from "react-icons/fi";
// import { MdFitScreen } from "react-icons/md";

type Props = {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  fit: () => void;
  setZoom: (zoom: number) => void;
};

export default function ResumePreviewToolbar({
  zoom,
  zoomIn,
  zoomOut,
  fit,
  setZoom,
}: Props) {
  return (
    <div
      className="
      sticky
      top-6
      z-30
      mb-6

      flex
      items-center
      justify-between

      rounded-2xl
      border
      border-slate-200
      bg-white/90
      p-4
      shadow-xl
      backdrop-blur

      dark:border-white/10
      dark:bg-slate-900/90
      "
    >
      <div>
        <h3 className="text-lg font-bold">
          Resume Preview (A4)
        </h3>

        <p className="text-sm text-slate-500">
          Production Print Preview
        </p>
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={zoomOut}
          className="rounded-xl bg-slate-200 px-3 py-2"
        >
          −
        </button>

        <input
          type="range"
          min={40}
          max={200}
          value={zoom}
          onChange={(e) =>
            setZoom(Number(e.target.value))
          }
          className="w-40"
        />

        <span
          className="
          w-16
          rounded-xl
          bg-slate-100
          py-2
          text-center
          font-bold
          dark:bg-slate-700
          "
        >
          {zoom}%
        </span>

        <button
          onClick={zoomIn}
          className="rounded-xl bg-slate-200 px-3 py-2"
        >
          +
        </button>

        <button
          onClick={fit}
          className="
          rounded-xl
          bg-cyan-600
          px-5
          py-2
          font-semibold
          text-white
          "
        >
          Fit
        </button>

      </div>
    </div>
  );
}