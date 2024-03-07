import prisma from "@/libs/prisma"
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';



export async function GET(request: Request) {


  await prisma.todo.deleteMany(); // delet * from todo
  await prisma.user.deleteMany(); // delet * from user

  const user = await prisma.user.create({
    data: {
      email: 'pepe@pepe.com',
      name: "Pepe",
      password: bcrypt.hashSync('123123'),
      roles: ['admin', 'client'],
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true },
          { description: 'Piedra del poder' },
          { description: 'Piedra del tiempo' },
          { description: 'Piedra del espacio' },
          { description: 'Piedra del realidad' }
        ]
      }
    }
  })

  // await prisma.todo.createMany({
  //   data: [
  //     ,
  //   ]
  // })


  return NextResponse.json({ message: 'Seed Executed' })
}