const users = [];

const addUser = ({ id, username, room }) => {
  //clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validate
  if (!username || !room) {
    return {
      error: "username and room required...!",
    };
  }

  //checking for existing user
  const existinguser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  //validate username
  if (existinguser) {
    return {
      error: "Username is in use",
    };
  }

  //store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  const getuser = users.find((temp) => temp.id === id);

  if (!getuser) {
    return "user not found";
  }

  return { username: getuser.username, room: getuser.room };
};

const getUsersInRoom = (room) => {
  roomName = room.trim().toLowerCase();
  const getUserInRoom = users.filter((temp) => temp.room === roomName);
  if (getUserInRoom) {
    return getUserInRoom;
  }
  return [];
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};

// addUser({
//   id: 22,
//   username: "Bharath",
//   room: "abcd",
// });

// addUser({
//   id: 111,
//   username: "arjun",
//   room: "abcd",
// });

// addUser({
//   id: 222,
//   username: "tikky",
//   room: "gmail",
// });
// console.log(users);

// // // const rem = getUser(212);
// // // console.log(rem);
// const rooms = getUsersInRoom("ABCD");
// console.log(rooms);
// // // console.log(users);
