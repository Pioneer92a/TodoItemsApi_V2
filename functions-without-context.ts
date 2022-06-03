import prisma from "./client";

interface CreateUser {
  id: number;
  uuid: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  isLoggedIn: boolean;
}

export async function createUser(user: CreateUser) {
  return await prisma.user.create({
    data: user,
  });
}

interface UpdateUser {
  id: number;
  name: string;
  email: string;
}

export async function updateUsername(user: UpdateUser) {
  return await prisma.user.update({
    where: { id: user.id },
    data: user,
  });
}
