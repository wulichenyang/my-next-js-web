"use client";

import Image from "next/image";

import TodoForm from "../app/components/TodoForm";
import TodoList from "../app/components/TodoList";
import {
  createCategory,
  getCategoryList,
  deleteCategory,
  initCategory,
  deleteAllCategory,
} from "./database/data";
import { useEffect, useState } from "react";
import "./index.css";

export default function Home() {
  const [categoryList, setCategoryList] = useState<any>([]);
  const [categoryId, setCategoryId] = useState();
  const [todoList, setTodoList] = useState([]);

  const handleInitData = () => {
    getCategoryList().then((res) => {
      setCategoryList((res || []) as never[]);
      setCategoryId(res?.[0]?.id as any);
    });
  };

  useEffect(() => {
    handleInitData();
  }, []);

  // getCategoryList()
  return (
    <main>
      curCategory: {categoryId}
      <ul>
        {categoryList?.map((e: any) => (
          <li
            className={categoryId === e?.id ? "activeCategoryWrap" : ""}
            key={e?.id}
            onClick={() => {
              setCategoryId(e?.id);
            }}
          >
            {e?.id}: {e?.title}
          </li>
        ))}
      </ul>
      <TodoForm categoryId={categoryId as any} />
      <TodoList categoryId={categoryId as any} />
      <button
        onClick={() => {
          initCategory({
            categoryList: [
              {
                title: "默认任务",
                content: "默认任务详细描述",
              },
              {
                title: "Jira 任务",
                content: "Jira 任务详细描述",
              },
              {
                title: "学习任务",
                content: "学习任务详细描述",
              },
            ],
          });
          handleInitData();
        }}
      >
        Init Category
      </button>
      <button
        onClick={() => {
          deleteAllCategory();
          handleInitData();
        }}
      >
        Delete Category
      </button>
    </main>
  );
}
