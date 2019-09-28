import React from "react";

const Loading = ({ active, button }) => {
  const renderSpinner = () => {
    if (active & button)
      return (
        <>
          <span
            className="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Loading...</span>
        </>
      );

    if (active)
      return (
        <div
          //   style={{ paddingTop: "250px" }}
          className="d-flex justify-content-center mt-5 mb-5 w-100"
        >
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );

    return null;
  };

  return <>{renderSpinner()}</>;
};

export default Loading;
