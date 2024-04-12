"use client";

import { useCallback } from "react";
import { createTodo } from "../database/data";

type Props = {
  categoryId: number;
};

const TodoForm = (props: Props) => {
  const { categoryId } = props;
  const submit = useCallback(
    async (e: React.MouseEvent<HTMLFormElement>) => {
      if (!categoryId) return;
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      await createTodo({
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        note: formData.get("note") as string,
        done: false,
        categoryId,
      });
      location.reload();
    },
    [categoryId]
  );
  return (
    <form className="flex items-center space-x-3" onSubmit={submit}>
      <input
        name="title"
        className="w-48 border rounded px-2"
        placeholder="请输入任务名称"
      />
      <textarea
        name="content"
        className="w-48 border rounded px-2"
        placeholder="请输入任务详细描述"
      />
      <textarea
        name="note"
        className="w-48 border rounded px-2"
        placeholder="请输入任务备注信息"
      />
      <button type="submit" className="border rounded px-2 min-w-16">
        添加
      </button>
    </form>
  );
};

export default TodoForm;
