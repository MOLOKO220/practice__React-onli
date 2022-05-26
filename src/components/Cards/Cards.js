import React from "react";
import "./Cards.scss";

export default function Cards(props) {
  // вывод подсказки
  function tooltip(e) {
    e.target.nextSibling.classList.add("active");
    e.target.nextSibling.setAttribute(
      "style",
      `top:${e.pageY + 20}px; left:${e.pageX - 20}px;`
    );
  }

  function hideTooltip(e) {
    e.target.nextSibling.classList.remove("active");
  }

  return (
    <div className="User">
      <img src={props.photo} alt="User photo" />

      <p onMouseMove={tooltip} onMouseOut={hideTooltip}>
        {props.name}
      </p>
      <div className="shadow-title">{props.name}</div>

      <div>
        <p>{props.position}</p>

        <p onMouseMove={tooltip} onMouseOut={hideTooltip}>
          {props.email}
        </p>
        <div className="shadow-title">{props.email}</div>

        <p>{props.phone}</p>
      </div>
    </div>
  );
}
