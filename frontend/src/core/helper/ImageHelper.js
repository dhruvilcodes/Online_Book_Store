import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `./imgsrc/no.png`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "30%", maxWidth: "30%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
