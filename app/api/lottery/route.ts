import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const prizes = await prisma.prize.findMany({
    where: {
      remaining: {
        gt: 0,
      },
    },
  });

  if (prizes.length === 0) {
    return NextResponse.json({ message: 'No prizes available' }, { status: 404 });
  }

  const randomIndex = Math.floor(Math.random() * prizes.length);
  const prize = prizes[randomIndex];

  // 当選数を減らす
  await prisma.prize.update({
    where: { id: prize.id },
    data: { remaining: prize.remaining - 1 },
  });

  return NextResponse.json(prize);
}
