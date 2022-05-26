import React, { useEffect, useRef, useState } from "react";
import "./GETrequest.scss";
import Cards from "../Cards/Cards";

import imgPreloader from "./img/Preloader.svg";

export default function GETrequest(props) {
  // hooks
  const [users, setUsers] = useState(null);
  const showBtn = useRef(null);

  // загрузка первой партии пользователей
  useEffect(() => {
    fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setUsers(data.users);
      });
  }, [props.render]);

  // показать ещё пользователей
  function ShowMore() {
    fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${
        users.length + 6
      }`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setUsers(data.users);
        // деактивация "Show more"
        if (6 + users.length >= data.total_users) {
          showBtn.current.setAttribute("disabled", true);
        }
      });
  }

  return (
    <div className="GETrequest container">
      <h1>Working with GET request</h1>
      <div className="GETrequest__wrapp">
        {users != null ? (
          users.map((e) => {
            return (
              <Cards
                photo={e.photo}
                name={e.name}
                position={e.position}
                email={e.email}
                phone={e.phone}
                key={e.id}
              />
            );
          })
        ) : (
          <img src={imgPreloader} alt="prerole..." />
        )}
      </div>
      <button onClick={ShowMore} ref={showBtn}>
        Show more
      </button>
    </div>
  );
}
