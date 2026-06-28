// import {
//   useInterviewStore,
// } from "../../store/interview-store";

// export default function SkillCoverageCard() {

//   const skillCoverage =
//     useInterviewStore(
//       (state) =>
//         state.skillCoverage
//     );

//   return (
//     <div
//       className="
//       rounded-3xl
//       border
//       border-white/10
//       p-6
//       "
//     >
//       <h3
//         className="
//         mb-4
//         text-lg
//         font-bold
//         "
//       >
//         Skill Coverage
//       </h3>

//       <div className="space-y-2">

//         {Object.entries(
//           skillCoverage
//         ).map(
//           ([skill, covered]) => (

//             <div
//               key={skill}
//               className="
//               flex
//               justify-between
//               "
//             >
//               <span>
//                 {skill}
//               </span>

//               <span>
//                 {covered ?
//                    "✅"
//                   : "❌"}
//               </span>
//             </div>

//           )
//         )}

//       </div>
//     </div>
//   );
// }