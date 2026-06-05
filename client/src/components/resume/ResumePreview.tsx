// import { useResumeStore } from "../../store/resume-store";

// export default function ResumePreview() {
//   const { data } =
//     useResumeStore();

//   return (
//     <div
//       className="
//       rounded-3xl
//       bg-white
//       p-8
//       shadow-xl

//       dark:bg-slate-900
//       "
//     >
//       <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
//         {data.fullName ||
//           "Your Name"}
//       </h1>

//       <p className="mt-2 text-slate-600 dark:text-slate-400">
//         {data.email}
//       </p>

//       <p className="text-slate-600 dark:text-slate-400">
//         {data.phone}
//       </p>

//       <hr className="my-6" />

//       <h3 className="font-bold text-slate-900 dark:text-white">
//         Professional Summary
//       </h3>

//       <p className="mt-2 text-slate-600 dark:text-slate-400">
//         {data.summary}
//       </p>
//     </div>
//   );
// }