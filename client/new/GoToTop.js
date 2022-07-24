import { Fab } from "@material-ui/core";
import { KeyboardArrowUp } from "@material-ui/icons";
import React from "react";

function GoToTop() {
  window.onscroll = () => {
    const goToTopBtn = document.getElementById("GoToTop");
    if (
      document.body.scrollTop > 400 ||
      document.documentElement.scrollTop > 400
    ) {
      goToTopBtn.style.transform = "scale(1)";
    } else {
      goToTopBtn.style.transform = "scale(0)";
    }
  };

  const scrollToTop = (e) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div
      id='GoToTop'
      style={{
        position: "fixed",
        bottom: "3rem",
        right: "3rem",
        transform: "scale(0)",
        transition: "transform 0.3s",
        zIndex: 10,
      }}
      onClick={scrollToTop}
    >
      <Fab
        style={{
          color: "var(--white)",
          backgroundColor: "var(--color-primary)",
        }}
      >
        <KeyboardArrowUp style={{ fontSize: "3rem" }} />
      </Fab>
    </div>
  );
}

export default GoToTop;
