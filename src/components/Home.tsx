


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
import React, { useState, useEffect, useRef } from "react";

function Home() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<any>(null);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Small delay to ensure smooth animation

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      // Start playing video when it's shown
      videoRef.current.play();
    }
  }, [showVideo]);

  const handleStartClick = () => {
    setShowVideo(true);
  };

  const handleSkip = () => {
    router.push("/quiz");
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnd = () => {
    // Automatically go to quiz page when video ends
    router.push("/quiz");
  };

  return (
    <div className='bg-[url("/main-bg.png")] bg-no-repeat bg-cover bg-center w-full h-full flex flex-col p-7 overflow-hidden relative'>
      {/* Main content - hidden when video is playing */}
      <div
        className={`flex flex-col h-full transition-opacity duration-500 ${
          showVideo ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
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
          <Button onClick={handleStartClick} title={"START"} />
        </div>
      </div>

      {/* Video overlay - shows when START is clicked */}
      {showVideo && (
        <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
          <video
            ref={videoRef}
            src="/video.mp4"
            className="w-full h-full object-cover"
            muted={isMuted}
            onEnded={handleVideoEnd}
            playsInline
            autoPlay
          />

          {/* Mute/Unmute button - top left */}
          <button
            onClick={toggleMute}
            className="absolute top-6 right-6 z-60 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-3 transition-all duration-200"
          >
            {!isMuted ? (
              // Muted icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            ) : (
              // Unmuted icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            )}
          </button>

          {/* Skip button - bottom center */}
          {/* <button
            onClick={handleSkip}
            className="absolute  z-60 bg-white hover:bg-gray-100  font-bold py-3 px-8 rounded-full transition-all duration-200  border-white backdrop-blur-sm shadow-sm text-white w-full border"
          >
            SKIP
          </button> */}

          <button
            onClick={handleSkip}
            className={`absolute bottom-8 left-5 right-5 z-60 border-white backdrop-blur-sm shadow-sm text-white  border font-bold py-3 rounded-full transition-all duration-200 hover:scale-105 `}
          >
            SKIP
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;