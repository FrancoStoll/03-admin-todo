import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import prisma from "@/libs/prisma"
import { NextResponse, NextRequest } from 'next/server'

import * as yup from 'yup'

export async function GET(request: Request) {
  

  const { searchParams } = new URL(request.url);
  console.log(request.url)

  const take = +(searchParams.get('take') ?? '10');
  const skip = +(searchParams.get('skip') ?? '0');

  if (isNaN(take)) {
    return NextResponse.json({ message: 'Take tiene que ser un número' }, { status: 400 })
  }

  if (isNaN(skip)) {
    return NextResponse.json({ message: 'Skip tiene que ser un número' }, { status: 400 })
  }

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  });

  return NextResponse.json(todos)

}


const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false)
})

export async function POST(request: Request) {


  const user = await getUserServerSession();

  if (!user) {
    return NextResponse.json('No autorizado', { status: 401 });
  }

  try {
    const { description, complete } = await postSchema.validate(await request.json());

    const todo = await prisma.todo.create({ data: { description, complete, userId: user.id } })

    return NextResponse.json(todo)
  } catch (error) {

    return NextResponse.json({ msg: error }, { status: 400 })
  }

}


export async function DELETE(request: Request) {

  const user = await getUserServerSession();
  if (!user) {
    return NextResponse.json('no autorizado', { status: 401 })
  }

  try {
    await prisma.todo.deleteMany({
      where: {
        complete: { equals: true },
        userId: user.id
      }
    })

    return NextResponse.json(({ message: 'Todos eliminados correctamente' }))
  } catch (error) {
    return NextResponse.json(({ message: error }))
  }

}