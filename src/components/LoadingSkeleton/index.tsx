import React from "react";

type Props = {};

const LoadingSkeleton = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white-900"></div>
    </div>
  );
};

export default LoadingSkeleton;
