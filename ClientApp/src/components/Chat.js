import React, { useEffect, useState } from "react";
import "./Chat.css";
import * as signalR from "@microsoft/signalr";

export function Chat() {
  const [dialog, SetDialog] = useState([]);
  const [user, SetUser] = useState(null);
  const [input, SetInput] = useState(null);
  const [update, SetUpdate] = useState(false);

  // SignalR Message Receiver
  let connection = new signalR.HubConnectionBuilder()
    .withUrl("/message")
    .build();
  connection.on("ReceiveMessage", () => {
    SetUpdate(!update);
  });
  connection.start();

  useEffect(() => {
    async function getData() {
      const response = await fetch("api/Chat");
      const data = await response.json();
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

    // SignalR Message Sender
    connection.invoke("SendMessage", "flag").catch(function (err) {
      return console.error(err.toString());
    });
  }

  function dialogBox() {
    return (
      <>
        <div className="container">
          <div className="headblock"></div>
          {dialog.map((item) => {
            if (item.user === user) {
              return (
                <div key={item.chatId} className="rowMy">
                  <div className="username">{item.user}</div>
                  <div className="myLine">{item.text}</div>
                </div>
              );
            } else {
              return (
                <div key={item.chatId} className="rowPpl">
                  <div className="username">{item.user}</div>
                  <div className="pplsLine">{item.text}</div>
                </div>
              );
            }
          })}
          <div className="headblock"></div>
        </div>
        <div className="msgInputBox">
          <input
            type="text"
            onChange={(e) => {
              SetInput(e.target.value);
            }}
            placeholder="Input message"
          ></input>
          <button onClick={submit}>Go</button>
        </div>
      </>
    );
  }
  function userInput() {
    return (
      <div className="inputBox">
        <div className="headblock"></div>
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

  return (
    <>
      <div className="header">CSChat</div>
      {content}
    </>
  );
}
