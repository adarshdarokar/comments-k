const comments = [
  {
    id: 1,
    user: "user1",
    text: "This is the first comment. I love this post!",
    replies: [
      {
        id: 2,
        user: "user2",
        text: "nice",
        replies: [
          {
            id: 3,
            user: "user3",
            text: "glad you liked it !",
            replies: []
          }
        ]
      }
    ]
  }
];

const container = document.querySelector(".comments");

function render(comments, parent) {
  comments.forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment bg-white p-4 rounded shadow mb-4 ml-4";
    div.innerHTML = `
      <div class="flex items-center mb-2">
        <span class="font-semibold text-gray-800 mr-2">${c.user}</span>
        <span class="text-xs text-gray-500">Just now</span>
      </div>
      <p class="text-gray-700 mb-2">${c.text}</p>
      <div class="flex space-x-4 text-sm text-gray-500">
        <button class="reply hover:underline">Reply</button>
      </div>
    `;

    const replyBtn = div.querySelector(".reply");
    replyBtn.onclick = () => {
      const inputBox = document.createElement("div");
      inputBox.innerHTML = `
        <input type="text" class="reply-input border px-2 py-1 text-sm mr-2" placeholder="Reply..." />
        <button class="submit-reply text-blue-500 text-sm">Send</button>
      `;
      div.appendChild(inputBox);
      inputBox.querySelector(".submit-reply").onclick = () => {
        const txt = inputBox.querySelector(".reply-input").value.trim();
        if (txt) {
          const reply = { id: Date.now(), user: "you", text: txt, replies: [] };
          c.replies.push(reply);
          div.removeChild(inputBox);
          render([reply], div);
        }
      };
      replyBtn.disabled = true;
    };

    parent.appendChild(div);
    if (c.replies.length) render(c.replies, div);
  });
}

render(comments, container);
