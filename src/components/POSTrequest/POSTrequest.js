import React, { useEffect, useRef, useState } from "react";
import "./POSTrequest.scss";

export default function POSTrequest(props) {
  // hooks
  const [positions, setPositions] = useState(null);
  const [token, setToken] = useState(null);
  const signBtn = useRef(null);

  // получения данных
  useEffect(() => {
    // positions
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setPositions(data.positions);
      });

    // token
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setToken(data.token);
      });
  }, []);

  // валидация формы
  let validName = 0;
  let validEmail = 0;
  let validPhone = 0;
  let validPhoto = 0;
  function activeBtn() {
    if (
      validName === 1 &&
      validEmail === 1 &&
      validPhone === 1 &&
      validPhoto === 1
    ) {
      signBtn.current.removeAttribute("disabled");
    } else {
      signBtn.current.setAttribute("disabled", true);
    }
  }

  // input type="name email phone" стилизация и валидация
  function validationInput(e) {
    // name
    const reg4 = /^[A-Za-zА-Яа-яЁё\s]{2,}/;
    // email
    const re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    // phone
    const regex = /^\+380\d{3}\d{2}\d{2}\d{2}$/;

    if (e.target.dataset.identifier === "name") {
      if (reg4.test(e.target.value)) {
        e.target.parentElement.classList.remove("active-error");
        // валидация пройденна name
        validName = 1;
        activeBtn();
      } else if (e.target.value === "") {
        e.target.parentElement.classList.remove("active-error");
        validName = 0;
      } else {
        e.target.parentElement.classList.add("active-error");
        validName = 0;
        activeBtn();
      }
    } else if (e.target.dataset.identifier === "email") {
      if (re.test(e.target.value)) {
        e.target.parentElement.classList.remove("active-error");
        // валидация пройдена email
        validEmail = 1;
        activeBtn();
      } else if (e.target.value === "") {
        e.target.parentElement.classList.remove("active-error");
        validEmail = 0;
      } else {
        e.target.parentElement.classList.add("active-error");
        validEmail = 0;
        activeBtn();
      }
    } else if (e.target.dataset.identifier === "phone") {
      if (regex.test(e.target.value)) {
        e.target.parentElement.classList.remove("active-error");
        // валидация пройдена phone
        validPhone = 1;
        activeBtn();
      } else if (e.target.value === "") {
        e.target.parentElement.classList.remove("active-error");
        validPhone = 0;
      } else {
        e.target.parentElement.classList.add("active-error");
        validPhone = 0;
        activeBtn();
      }
    }
  }

  // input type="file" стилизация и валидация
  function photoUpload(e) {
    // валидация размера
    if (e.target.files[0].size < 5048576) {
      // валидация типа
      if (e.target.files[0].type === "image/jpeg") {
        e.target.nextSibling.nextSibling.innerHTML = e.target.files[0].name;
        e.target.nextSibling.nextSibling.classList.add("active");
        // валидация пройденна photo
        validPhoto = 1;
        activeBtn();
      } else {
        e.target.parentElement.nextSibling.innerHTML =
          "photo should be jpg/jpeg";
        e.target.parentElement.nextSibling.classList.add("active");
        e.target.nextSibling.nextSibling.innerHTML = "Upload your photo";
        e.target.nextSibling.nextSibling.classList.remove("active");
        e.target.parentElement.classList.add("input-file__item-error");
        setTimeout(() => {
          e.target.parentElement.nextSibling.innerHTML = "";
          e.target.parentElement.nextSibling.classList.remove("active");
          e.target.parentElement.classList.remove("input-file__item-error");
        }, 5000);
        validPhoto = 0;
        activeBtn();
      }
    } else {
      e.target.parentElement.nextSibling.innerHTML = "size must not exceed 5MB";
      e.target.parentElement.nextSibling.classList.add("active");
      e.target.nextSibling.nextSibling.innerHTML = "Upload your photo";
      e.target.nextSibling.nextSibling.classList.remove("active");
      e.target.parentElement.classList.add("input-file__item-error");
      setTimeout(() => {
        e.target.parentElement.nextSibling.innerHTML = "";
        e.target.parentElement.nextSibling.classList.remove("active");
        e.target.parentElement.classList.remove("input-file__item-error");
      }, 5000);

      validPhoto = 0;
      activeBtn();
    }
  }

  // отправка данных
  function sendDate(e) {
    e.preventDefault();

    // получить доступ к инпутам
    let sendData = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (
        e.target.elements[i].hasAttribute("required") ||
        e.target.elements[i].checked
      ) {
        sendData.push(e.target.elements[i]);
      }
    }

    // отправляем данные из формы
    let formData = new FormData();
    formData.append("position_id", sendData[3].value);
    formData.append("name", sendData[0].value);
    formData.append("email", sendData[1].value);
    formData.append("phone", sendData[2].value);
    formData.append("photo", sendData[4].files[0]);

    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
      method: "POST",
      body: formData,
      headers: { Token: token },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        props.setRender(props.render + 1);
      })
      .catch(function (error) {
        console.log(error);
      });

    // чистка инпутов и деактивация кнопки
    sendData[0].value = "";
    sendData[1].value = "";
    sendData[2].value = "";
    sendData[4].nextSibling.nextSibling.innerHTML = "Upload your photo";
    validName = 0;
    validEmail = 0;
    validPhone = 0;
    validPhoto = 0;
    activeBtn();
  }

  return (
    <form className="POSTrequest container" onSubmit={sendDate}>
      <h1>Working with POST request</h1>
      <div className="input-wrapp">
        <input
          type="text"
          required
          data-identifier="name"
          onChange={validationInput}
        />
        <label>Your name</label>
        <div className="error">Error text</div>
      </div>
      <div className="input-wrapp">
        <input
          type="text"
          required
          data-identifier="email"
          onChange={validationInput}
        />
        <label>Email</label>
        <div className="error">Error text</div>
      </div>
      <div className="input-wrapp">
        <input
          type="text"
          required
          data-identifier="phone"
          onChange={validationInput}
        />
        <label>Phone</label>
        <div className="help">+38 (XXX) XXX - XX - XX</div>
      </div>
      <div className="input-radio__wrapp">
        <h5>Select your position</h5>
        {positions != null ? (
          positions.map((e) => {
            if (e === positions[0]) {
              return (
                <label className="input-radio__item" key={e.id}>
                  <input
                    type="radio"
                    name="position"
                    value={e.id}
                    defaultChecked
                  />
                  <span>{e.name}</span>
                </label>
              );
            } else {
              return (
                <label className="input-radio__item" key={e.id}>
                  <input type="radio" name="position" value={e.id} />
                  <span>{e.name}</span>
                </label>
              );
            }
          })
        ) : (
          <div>нет данных....</div>
        )}
      </div>

      <label className="input-file__item">
        <input type="file" required onChange={photoUpload} />
        <div>Upload</div>
        <p>Upload your photo </p>
      </label>
      <div className="input-file-error"></div>
      <button disabled ref={signBtn}>
        Sign up
      </button>
    </form>
  );
}
