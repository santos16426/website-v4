"use client";

import { useState } from "react";
import Loader from "./Loader";
import { LoaderWrapperProps } from "../utils/types";

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({ children, subTitle }) => {
  const [isLoading, setIsLoading] = useState(true);

  return <>{isLoading ? <Loader setHideLoader={setIsLoading} subTitle={subTitle} /> : children}</>;
};

export default LoaderWrapper;
