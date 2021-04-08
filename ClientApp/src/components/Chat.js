import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import * as signalR from "@microsoft/signalr";
import { animateScroll } from "react-scroll";

export function Chat() {
  const [connection, SetConnection] = useState(null);
  const [dialog, SetDialog] = useState([]);
  const [user, SetUser] = useState(null);
  const [input, SetInput] = useState(null);
  const [update, SetUpdate] = useState(false);
  const inputObj = useRef(null);
  const msgObj = useRef(null);

  // SignalR Setup Connection
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("message")
      .withAutomaticReconnect()
      .build();

    SetConnection(newConnection);
  }, []);

  // SignalR Messenger Receiver
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("SignalR Connected!");
          connection.on("ReceiveMessage", (message) => {
            SetUpdate((update) => !update);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("api/Chat");
      const data = await response.json();
      SetDialog(data);
    }
    getData();
    scrollToBottom();
  }, [user, update]);

  function scrollToBottom() {
    animateScroll.scrollToBottom();
  }

  async function submit() {
    if (!input) return;
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
    msgObj.current.value = "";

    // SignalR Messenger Sender
    if (connection.connectionStarted) {
      try {
        await connection.send("SendMessage", "flag");
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  }

  function dialogBox() {
    return (
      <>
        <div className="container" id="scrollTgt">
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
          <div className="filler"></div>
        </div>
        <div className="msgInputBox">
          <input
            className="inputObj"
            type="text"
            onChange={(e) => {
              SetInput(e.target.value);
            }}
            ref={msgObj}
            placeholder="Input message"
          ></input>
          <button className="btnObj" onClick={submit}>
            Send
          </button>
        </div>
      </>
    );
  }
  function userInput() {
    return (
      <div className="inputBox">
        <input
          ref={inputObj}
          onAnimationEnd={() => {
            inputObj.current.classList.toggle("inputObjWarn");
          }}
          className="inputObj"
          type="text"
          onChange={(e) => {
            SetInput(e.target.value);
          }}
          placeholder="Input user name"
        ></input>
        <button
          className="btnObj"
          onClick={() => {
            if (input === null) {
              inputObj.current.classList.toggle("inputObjWarn");
            } else {
              SetUser(input);
              SetInput(null);
            }
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
      <div className="header">Jessenger</div>
      {content}
    </>
  );
}
