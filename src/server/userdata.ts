import { getUserById, fullUserData, adminData } from "./user";

export const userData = async (id: string) => {
  const user = await getUserById(id as string);

  return user;
};

export const adminUsersData = async () => {
  const user = await adminData();

  return user;
};
