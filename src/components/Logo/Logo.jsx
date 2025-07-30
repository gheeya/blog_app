import React from "react";
import LogoImage from "../../assets/logo_image.png";

function Logo() {
  return (
    <div className="h-15 w-25">
      <img className="h-full w-full" src={LogoImage} alt="Logo Image" />
    </div>
  );
}

export default Logo;
