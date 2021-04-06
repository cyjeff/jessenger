import React, { useEffect, useState } from "react";

export function Chat() {
  const [dialog, SetDialog] = useState([]);
  const [user, SetUser] = useState(null);
  const [input, SetInput] = useState(null);
  const [update, SetUpdate] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await fetch("api/Chat");
      const data = await response.json();
      console.log(data);
      SetDialog(data);
    }
    getData();
  }, [update]);

  async function submit() {
    const body = { User: user, Text: input };
    await fetch("api/Chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    SetInput(null);
    SetUpdate(!update);
  }

  function dialogBox() {
    return (
      <div className="container">
        {dialog.map((item) => {
          return <div key={item.chatId}>{item.text}</div>;
        })}
        <div className="inputBox">
          <input
            type="text"
            onChange={(e) => {
              SetInput(e.target.value);
            }}
            placeholder="Input message"
          ></input>
          <button onClick={submit}>Go</button>
        </div>
      </div>
    );
  }
  function userInput() {
    return (
      <div className="inputBox">
        <input
          type="text"
          onChange={(e) => {
            SetInput(e.target.value);
          }}
          placeholder="Input user name"
        ></input>
        <button
          onClick={() => {
            SetUser(input);
            SetInput(null);
          }}
        >
          Go
        </button>
      </div>
    );
  }

  let content = user ? dialogBox() : userInput();

  return content;
}
