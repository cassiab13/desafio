import UserModel from "../src/schema/user.schema";

// const users = [
//   {
//     username: "Alice",
//     weight: 50,
//     password: "abc123456",
//     email: "aliceb@gmail.com",
//   },
//   {
//     username: "Beatriz",
//     weight: 60,
//     password: "987654321",
//     email: "beatrizc@gmail.com",
//   },
//   {
//     username: "Cesar",
//     weight: 85,
//     password: "azaz1234",
//     email: "cesard@gmail.com",
//   },
// ];
// export { users };
const createUsers = () => {
  const users = [
    {
      username: "Alice",
      weight: 50,
      password: "abc123456",
      email: "aliceb@gmail.com",
    },
    {
      username: "Beatriz",
      weight: 60,
      password: "987654321",
      email: "beatrizc@gmail.com",
    },
    {
      username: "Cesar",
      weight: 85,
      password: "azaz1234",
      email: "cesard@gmail.com",
    },
  ];
  return users;
};

export { createUsers };

const getUsersIds = async () => {
  try {
    const users = await UserModel.find({}, "_id");
    console.log("ID de users: ", users);
    const userIds = users.map((user) => user._id);

    return userIds;
  } catch (error) {
    console.error("Erro ao recuperar IDs dos usuários:", error);
    return [];
  }
};

export { getUsersIds };
