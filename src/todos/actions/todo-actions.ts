'use server';

import prisma from "@/libs/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = (seconds: number = 0) => {

  return new Promise((resolve) => {

    setTimeout(() => {
      resolve(true)
    }, seconds * 1000);
  })

}


export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

  // await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id: id } })

  if (!todo) {
    throw `Todo con el id ${id} no encontrado`
  }

  const updatedTodo = await prisma.todo.update({
    where: { id: id },
    data: { complete: complete }
  })

  revalidatePath('/dashboard/server-todos')
  return updatedTodo
}

export const addTodo = async (description: string): Promise<Todo | {}> => {

  try {

    const todo = await prisma.todo.create({ data: { description } })
    revalidatePath('/dashboard/server-todos')

    return todo
  } catch (error) {
    return {
      message: 'Error creando un todo',
      error: error
    }

  }
}

export const deleteCompleted = async (): Promise<void> => {


  await prisma.todo.deleteMany({ where: { complete: { equals: true } } })

  revalidatePath('/dashboard/server-todos')

}