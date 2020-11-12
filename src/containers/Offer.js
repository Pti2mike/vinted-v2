import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Offer = (props) => {
  const { id } = useParams();
  console.log({ id });
  return (
    <span>
      Offer {id}
      <br />
      <Link to="/">Home</Link>
    </span>
  );
};

export default Offer;
