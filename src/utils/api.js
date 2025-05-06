import { defaultClothingItems } from "../utils/constants";

function getItems() {
  // This simulates an API call by returning a Promise
  return Promise.resolve(defaultClothingItems);
}

function addItem({ name, link, weather }) {
  const timestamp = Date.now();
  // Create a new item
  const newItem = {
    _id: timestamp,
    name,
    weather,
    link,
  };

  // Return a Promise that resolves with the new item
  return Promise.resolve(newItem);
}

export { getItems, addItem };
