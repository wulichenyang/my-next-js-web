"use client";

import { useCallback, useEffect } from "react";
import { getTodoListByCategoryId } from "../database/data";
import moment from "moment";
import { useState } from "react";

export default function TodoList({ categoryId }: { categoryId: number }) {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    if (categoryId) {
      getTodoListByCategoryId({ categoryId }).then((res) => {
        setTodoList((res || []) as any);
      });
    }
  }, [categoryId]);

  return (
    <div className="p-10 mx-auto w-[500px]">
      <ul className="mb-4 px-3">
        {todoList?.map((item: any) => (
          <li key={item.id}>
            <span className="mx-2">标题</span>
            <span className="text-sky-500">{item?.title}</span>
            <span className="mx-2">内容</span>
            <span className="text-orange-500">{item?.content}</span>
            <span className="mx-2">备注</span>
            <span className="text-orange-500">{item?.note}</span>
            <span className="mx-2">创建时间：</span>
            <span>{moment(item?.created_at).format("YYYY-MM-DD HH:mm")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
