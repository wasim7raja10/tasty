import React from "react";
const sizeClasses = {
  height: "h-36",
  width: "w-36",
};

const Skeleton = () => {
  return (
    // <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    //   <div class="animate-pulse flex space-x-4">
    //     <div class="rounded-full bg-slate-200 h-10 w-10"></div>
    //     <div class="flex-1 space-y-6 py-1">
    //       <div class="h-2 bg-slate-200 rounded"></div>
    //       <div class="space-y-3">
    //         <div class="grid grid-cols-3 gap-4">
    //           <div class="h-2 bg-slate-200 rounded col-span-2"></div>
    //           <div class="h-2 bg-slate-200 rounded col-span-1"></div>
    //         </div>
    //         <div class="h-2 bg-slate-200 rounded"></div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

   
      <div className="flex animate-pulse items-center rounded-lg bg-white shadow-lg overflow-hidden">
        <div
          className={`${sizeClasses.height} ${sizeClasses.width} flex-shrink-0 bg-slate-200`}
        />
        <div className="p-3 flex flex-col justify-between h-full w-full">
          <div className="sm:text-lg w-full font-semibold text-gray-800 h-2 bg-slate-200"></div>
          <div className="sm:text-lg w-full font-semibold text-gray-800 h-2 bg-slate-200"></div>
          <p className="text-gray-600 text-sm">
            <span className=" h-2 w-full bg-slate-200"></span>
            <span className=" text-gray-900 font-medium h-2 w-full bg-slate-200"></span>
          </p>
        </div>
      </div>
    
  );
};

export default Skeleton;
