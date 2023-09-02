import React, { useState } from "react";

export default function InputBar(props: {
  onClickFunction: (message: string) => void;
}) {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-0 w-[100%]">
      <hr />
      <div className="flex bg-white p-6">
        <input
          className="flex-1 bg-[#F6F8FC] p-4 rounded-md mr-6"
          placeholder="Type a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.onClickFunction(message);
              setMessage("");
            }
          }}
        />
        <div
          className="bg-[#4B86F8] text-white p-4 rounded-md cursor-pointer"
          onClick={() => {
            props.onClickFunction(message);
            setMessage("");
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2594 15.7057L24.3193 3.64578M12.4059 16.0825L15.4245 23.8446C15.6904 24.5284 15.8234 24.8702 16.015 24.9701C16.181 25.0566 16.3789 25.0567 16.5451 24.9704C16.7368 24.8708 16.8701 24.529 17.1369 23.8456L24.7063 4.44886C24.9471 3.83187 25.0675 3.52338 25.0016 3.32625C24.9444 3.15506 24.8101 3.02071 24.6389 2.96352C24.4418 2.89767 24.1333 3.01806 23.5163 3.25883L4.11957 10.8283C3.43609 11.095 3.09434 11.2284 2.99475 11.4201C2.90842 11.5863 2.90853 11.7841 2.99506 11.9502C3.09488 12.1418 3.43678 12.2747 4.12057 12.5406L11.8826 15.5592C12.0214 15.6132 12.0908 15.6402 12.1492 15.6819C12.201 15.7188 12.2463 15.7641 12.2833 15.8159C12.325 15.8743 12.352 15.9437 12.4059 16.0825Z"
              stroke="white"
              stroke-width="2.29713"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
