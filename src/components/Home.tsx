


// import Button from "@/elements/Button";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import React, { useState, useEffect } from "react";

// function Home() {
//   const [showSecondPhase, setShowSecondPhase] = useState(false);
//   const [showSecondContent, setShowSecondContent] = useState(false);
//   const router = useRouter();

//   const sec = () => {
//     // const timer = setTimeout(() => {
//     setShowSecondPhase(true);

//     // Show second content after additional 400ms delay
//     setTimeout(() => {
//       setShowSecondContent(true);
//     }, 800);
//     // }, 2000); // Start second phase after 2 seconds
//   };

//   const [currentStep, setCurrentStep] = useState(1);

//   const steps = [
//     {
//       id: 1,
//       title: " Read the question.",
//       // description: "Start by reviewing the content",
//     },
//     {
//       id: 2,
//       title: "Choose the best answer from the options.",
//       // description: "Select your preferred choice",
//     },
//     {
//       id: 3,
//       title: "Get the result. Right = Goal",
//       // description: "See your progress and results",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // ✅ This works correctly
//       setCurrentStep((prevStep) => {
//         // prevStep gives us the actual current value
//         if (prevStep >= steps.length) {
//           return 1; // Reset to first step
//         }
//         return prevStep + 1;
//       });
//     }, 2000);

//     // Cleanup interval on component unmount
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className='bg-[url("/main-bg.png")] bg-no-repeat bg-cover bg-center w-full h-full flex flex-col p-7 overflow-hidden'>
//       <div className="flex flex-col h-full">
//         <div className="flex w-full h-fit flex-shrink-0">
//           <div
//             className={`mx-auto w-fit pt-10 ${
//               showSecondPhase ? "logo-slide-up" : "logo-slide-down"
//             }`}
//           >
//             <Image src="/logo.png" alt="Logo" width={234} height={80} />
//           </div>
//         </div>

//         {/* First Phase Content */}
//         {!showSecondContent && (
//           <div
//             className={`flex flex-col gap-6 flex-1 justify-end min-h-0 ${
//               showSecondPhase ? "phase-one-hide" : "bottom-slide-up"
//             }`}
//           >
//             <div
//               style={{ backgroundColor: "rgba(44, 44, 44, 0.4)" }} // Uncomment this
//               className="font-bold text-xl p-2 rounded-[9px] border border-white backdrop-blur-sm shadow-sm quantico-bold text-center"
//             >
//               Step onto the field <br /> Your choices decide the match
//             </div>
//             <Button onClick={() => sec()} title={"START"} />
//           </div>
//         )}

//         {/* Second Phase Content */}
//         {showSecondContent && (
//           <div className="flex flex-col flex-1 min-h-0  justify-end    phase-two-content">
//             <div className="overflow-y-auto scrollbar-hide ">
//               <div className=" flex-col gap-6  pb-20 ">
//                 <div className="pb-20">
//                   <p className="text-center text-lg quantico-regular text-white leading-5">
//                     You&apos;re the Manager. Read, choose, & score goals with
//                     your bone health team
//                   </p>
//                 </div>
//                 <div
//                   style={{ backgroundColor: "rgba(44, 44, 44, 0.4)" }}
//                   className="font-bold text-xl p-2 rounded-[9px] text-center   border-white backdrop-blur-sm shadow-sm"
//                 >
//                   How to Steps:
//                 </div>

//                 <div
//                   style={{ backgroundColor: "rgba(44, 44, 44, 0.4)" }}
//                   className="font-bold text-xl p-2 rounded-[9px]  text-center mt-2 border border-white backdrop-blur-sm shadow-sm"
//                 >
//                   <div className="relative">
//                     {steps.map((step, index) => (
//                       <div
//                         key={step.id}
//                         className="flex items-center mb-8 last:mb-0  "
//                       >
//                         <div className="relative flex-shrink-0">
//                           <div
//                             className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-lg transition-all duration-300 ${
//                               currentStep >= step.id
//                                 ? "bg-white border-white text-gray-800"
//                                 : "bg-transparent border-white/50 text-white"
//                             }`}
//                           >
//                             {step.id}
//                           </div>

//                           {index < steps.length - 1 && (
//                             <div
//                               className={`absolute top-12 left-1/2 w-0.5 h-16 transform -translate-x-1/2 transition-all duration-300 ${
//                                 currentStep > step.id
//                                   ? "bg-white"
//                                   : "bg-white/30"
//                               }`}
//                             />
//                           )}
//                         </div>

//                         <div className="ml-6 flex-1">
//                           <h3
//                             className={` font-medium text-start text-base mb-2 transition-all duration-300 ${
//                               currentStep >= step.id
//                                 ? "text-white"
//                                 : "text-white/70"
//                             }`}
//                           >
//                             {step.title}
//                           </h3>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Fixed button at bottom */}
//             <div className="flex-shrink-0 pt-4">
//               <Button onClick={() => router.push("/quiz")} title={"KICK-OFF"} />
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .logo-slide-down {
//           opacity: 0;
//           transform: translateY(-80px);
//           animation: slideDownFromTop 0.8s ease-out forwards;
//         }

//         .logo-slide-up {
//           animation: logoMoveToTop 0.6s ease-out forwards;
//         }

//         .bottom-slide-up {
//           opacity: 0;
//           transform: translateY(100px);
//           animation: slideUp 0.8s ease-out 0.3s forwards;
//         }

//         .phase-one-hide {
//           animation: fadeOut 0.5s ease-out forwards;
//         }

//         .phase-two-content {
//           opacity: 0;
//           transform: translateY(100vh);
//           animation: slideUpFromBottom 0.8s ease-out forwards;
//         }

//         @keyframes slideDownFromTop {
//           from {
//             opacity: 0;
//             transform: translateY(-80px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(100px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes logoMoveToTop {
//           from {
//             transform: translateY(0);
//           }
//           to {
//             transform: translateY(-40px);
//           }
//         }

//         @keyframes slideUpFromBottom {
//           from {
//             opacity: 0;
//             transform: translateY(100vh);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeOut {
//           from {
//             opacity: 1;
//             transform: translateY(0);
//           }
//           to {
//             opacity: 0;
//             transform: translateY(50px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Home;







// import Button from "@/elements/Button";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import React, { useState, useEffect } from "react";

// function Home() {
  
//   const router = useRouter();

 


 



//   return (
//     <div className='bg-[url("/main-bg.png")] bg-no-repeat bg-cover bg-center w-full h-full flex flex-col p-7 overflow-hidden'>
//       <div className="flex flex-col h-full">
//         <div className="flex w-full h-fit flex-shrink-0">
//           <div
//             className={`mx-auto w-fit pt-10 `}
//           >
//             <Image src="/logo.png" alt="Logo" width={234} height={80} />
//           </div>
//         </div>

       
//           <div
//             className={`flex flex-col gap-6 flex-1 justify-end min-h-0 `}
//           >
//             <div
//               style={{ backgroundColor: "rgba(44, 44, 44, 0.4)" }} // Uncomment this
//               className="font-bold text-xl p-2 rounded-[9px] border border-white backdrop-blur-sm shadow-sm quantico-bold text-center"
//             >
//               Step onto the field <br /> Your choices decide the match
//             </div>
//             <Button onClick={() => router.push("/quiz")} title={"START"} />
//           </div>
       
      
//       </div>

    
//     </div>
//   );
// }

// export default Home;


import Button from "@/elements/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function Home() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Small delay to ensure smooth animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-[url("/main-bg.png")] bg-no-repeat bg-cover bg-center w-full h-full flex flex-col p-7 overflow-hidden'>
      <div className="flex flex-col h-full">
        {/* Logo section - slides down from top */}
        <div className="flex w-full h-fit flex-shrink-0">
          <div
            className={`mx-auto w-fit pt-10 transition-all duration-1000 ease-out ${
              isLoaded
                ? "transform translate-y-0 opacity-100"
                : "transform -translate-y-32 opacity-0"
            }`}
          >
            <Image src="/logo.png" alt="Logo" width={234} height={80} />
          </div>
        </div>

        {/* Bottom section - slides up from bottom */}
        <div
          className={`flex flex-col gap-6 flex-1 justify-end min-h-0 transition-all duration-1000 ease-out delay-300 ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-32 opacity-0"
          }`}
        >
          <div
            style={{ backgroundColor: "rgba(44, 44, 44, 0.4)" }}
            className="font-bold text-xl p-2 rounded-[9px] border border-white backdrop-blur-sm shadow-sm quantico-bold text-center"
          >
            Step onto the field <br /> Your choices decide the match
          </div>
          <Button onClick={() => router.push("/quiz")} title={"START"} />
        </div>
      </div>
    </div>
  );
}

export default Home;

