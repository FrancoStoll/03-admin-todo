import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import prisma from "@/libs/prisma";
import { Todo } from "@prisma/client";
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

interface Segments {
  params: {
    id: string;
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {

  const user = await getUserServerSession();

  if (!user) {
    return null;
  }

  const todo = await prisma.todo.findFirst({
    where: {
      id
    }
  })


  if (todo?.userId !== user.id) {

    return null;
  }

  return todo

}

export async function GET(request: Request, { params }: Segments) {

  const todo = await getTodo(params.id)

  if (!todo) {
    return NextResponse.json({ message: 'Este todo no existe' }, { status: 404 })
  }

  return NextResponse.json(todo)
}


const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().required().optional()
})

export async function PUT(request: Request, { params }: Segments) {

  const todo = await getTodo(params.id)

  if (!todo) {
    return NextResponse.json({ message: `Todo con el id ${params.id} no existe` }, { status: 404 })
  }

  try {
    const { description, complete } = await putSchema.validate(await request.json())

    const updateTodo = await prisma.todo.update({
      where: {
        id: params.id
      },
      data: { description, complete }
    })
    return NextResponse.json(updateTodo)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}