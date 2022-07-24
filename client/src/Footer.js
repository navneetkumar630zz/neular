import { Favorite } from "@material-ui/icons";
import React from "react";
import "./Footer.css";
import Pdf from "./Resume.pdf";

function Footer() {
  return (
    <div className='Footer'>
      <div className='container'>
        <span>
          Created By{" "}
          <a href={Pdf} target='_blank'>
            Navneet Kumar
          </a>
          &nbsp;&nbsp; | <Favorite fontSize='large' /> |
        </span>
        <span>All blogs are fetching from medium.com</span>
      </div>
    </div>
  );
}

export default Footer;
