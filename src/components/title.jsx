import React from "react";

export const Title = ({ title, count }) => {
  return (
    <div>
      <p className="title">
        {title} - {count}
      </p>
    </div>
  );
};
