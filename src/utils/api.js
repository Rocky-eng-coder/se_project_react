const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) =>
    res.ok
      ? res.json()
      : res.json().then((err) => {
          console.error("Backend error response:", err);
          console.log("payload sent to backend:", { name, imageUrl, weather });
          return Promise.reject(`Error: ${res.status}`);
        })
  );
}

function deleteItem(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}

function addCardLike(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}

function removeCardLike(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}

function updateUser({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}

export {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateUser,
};
