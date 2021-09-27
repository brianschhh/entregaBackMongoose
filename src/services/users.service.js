import { UsersModel } from "../models/users.model.js";

export async function createUser(data) {
  try {
    await UsersModel.create(data);
    return;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUsers() {
  try {
    const users = await UsersModel.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteUser(usersid) {
  try {
    await UsersModel.findByIdAndDelete(usersid);
    return;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateUser(usersid, data) {
  try {
    await UsersModel.findByIdAndDelete(usersid, data);
    const updated = await UsersModel.findById(usersid);
    return;
  } catch (error) {
    throw new Error(error);
  }
}
