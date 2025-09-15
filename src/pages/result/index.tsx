// import Button from "@/elements/Button";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import React from "react";

// function Result() {
//     const router = useRouter();
//     const score = Number(router.query.score as string);
//     const total = router.query.total as string;
//     const percentage = router.query.percentage as string;
//   return (
//     <div className='bg-[url("/main-bg.png")] bg-no-repeat bg-cover bg-center w-svw md:w-[375px] h-svh  mx-auto flex flex-col p-7 '>
//       <div className="flex flex-col flex-1 ">
//         <div className="flex flex-1 flex-col w-full  ">
//           <div className={`mx-auto w-fit pt-20`}>
//             <Image src={"/logo.png"} alt="Logo" width={234} height={80} />
//           </div>
//           <div className="flex justify-center items-center flex-col gap-10  w-full flex-1">
//             <Image
//               className="object-contain"
//               src={score > 5 ? "/trophy.png" : "/over.png"}
//               alt="Logo"
//               width={score>5?171:184}
//               height={score>5?221:152}
//             />
//             <div className="rounded-2xl p-7 w-full border border-white backdrop-blur-sm shadow-sm text-center  ">
//               <h2 className="text-6xl quantico-bold ">{score}/10</h2>
//               <h4 className="text-2xl  quantico-bold mt-2">
//                {score>5?"CONGRATULATIONS!":" Not quite there yet!"}
//               </h4>
//               <p className="quantico-regular text-base mt-1">
//                {score>5?"You passed the quiz — great job.": "Try again to pass the quiz"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* First Phase Content */}
//         <div className={`flex flex-col gap-6`}>
//          {score<5 && <Button onClick={()=>router.push("/")} title={"Play Again"} />}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Result;


import Button from "@/elements/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Result() {
  const router = useRouter();
  const score = Number(router.query.score as string);
//   const total = router.query.total as string;
//   const percentage = router.query.percentage as string;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-[url("/main-bg.png")] bg-no-repeat bg-cover bg-center w-svw md:w-[375px] h-svh mx-auto flex flex-col p-7 transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col flex-1">
        <div className="flex flex-1 flex-col w-full">
          {/* Logo - slides from 100px to actual position */}
          <div
            className={`mx-auto w-fit pt-10 transform transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0" : "-translate-y-[100px]"
            }`}
          >
            <Image src={"/logo.png"} alt="Logo" width={224} height={80} />
          </div>

          <div className="flex justify-center items-center flex-col gap-10 w-full flex-1">
            {/* Trophy/Over Image - scales up */}
            <div
              className={`transform transition-all duration-1000 ease-out delay-300 ${
                isLoaded ? "scale-100" : "scale-0"
              }`}
            >
              <Image
                className=""
                src={score > 5 ? "/Trophy.png" : "/over.png"}
                alt="Result"
                width={score > 5 ? 200 : 184}
                height={score > 5 ? 221 : 152}
                
              />
            </div>

            {/* Result Card - slides up from bottom */}
            <div
              className={`rounded-2xl p-7 w-full border border-white backdrop-blur-sm shadow-sm text-center transform transition-all duration-1000 ease-out delay-500 ${
                isLoaded ? "translate-y-0" : "translate-y-[100px]"
              }`}
            >
              <h2 className="text-6xl quantico-bold">{score}/10</h2>
              <h4 className="text-2xl quantico-bold mt-2">
                {score > 5 ? "CONGRATULATIONS!" : "Not quite there yet!"}
              </h4>
              <p className="quantico-regular text-base mt-1">
                {score > 5
                  ? "You passed the quiz — great job."
                  : "Try again to pass the quiz"}
              </p>
            </div>
          </div>
        </div>

        {/* Button - slides up from bottom */}
        <div
          className={`flex flex-col gap-6 transform transition-all duration-1000 ease-out delay-700 ${
            isLoaded ? "translate-y-0" : "translate-y-[100px]"
          }`}
        >
          {score <= 5 && (
            <Button onClick={() => router.push("/")} title={"Play Again"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;
