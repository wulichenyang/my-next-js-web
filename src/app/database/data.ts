"use server";

import prisma from "./prisma";

export const createCategory = async (data: {
  title: string;
  content: string;
}) => {
  const { title, content } = data;
  const category = await prisma.category.create({
    data: {
      title,
      content,
    },
  });
  return category;
};

export const getCategoryList = async () => {
  const categoryList = await prisma.category.findMany();
  return categoryList;
};

export const deleteCategory = async (payload: { categoryId: number }) => {
  const { categoryId } = payload;
  const deletedCategory = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return deletedCategory;
};

export const deleteAllCategory = async () => {
  const deletedCategoryList = await prisma.category.deleteMany({});
  return deletedCategoryList;
};

export const initCategory = async (payload: {
  categoryList: { title: string; content: string }[];
}) => {
  const { categoryList } = payload;
  await prisma.category.createMany({
    data: categoryList,
  });
};

export const createTodo = async (payload: {
  title: string;
  content?: string;
  note?: string;
  done: boolean;
  categoryId: number;
}) => {
  const { title, content, note, done, categoryId } = payload;
  const todo = await prisma.todo.create({
    data: {
      title,
      content,
      note,
      done,
      category: {
        connect: { id: categoryId }, // 连接到现存Category
      },
    },
  });
  return todo;
};

export const updateTodo = async (payload: { todoId: number; data: any }) => {
  const { todoId, data } = payload;
  const updatedTodo = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data,
  });
  return updatedTodo;
};

export const getTodoList = async () => {
  const categoryList = await prisma.todo.findMany();
  return categoryList;
};

export const getTodoListByCategoryId = async (payload: {
  categoryId: number;
}) => {
  const { categoryId } = payload;
  const todoList = await prisma.todo.findMany({
    where: {
      categoryId,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return todoList;
};

export const getTodoById = async (payload: { todoId: number }) => {
  const { todoId } = payload;
  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  });
  return todo;
};

export const deleteTodo = async (payload: { todoId: number }) => {
  const { todoId } = payload;
  const deletedTodo = await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
  return deletedTodo;
};
