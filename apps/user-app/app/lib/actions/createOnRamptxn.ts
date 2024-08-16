"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function creataOnRampTransaction(amount: number, provider: string){
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session?.user?.id;
    if(!userId){
        return {
            message : 
            "Unauthenticated Request"
        }
    }

    await prisma.onRampTransaction.create({
        data:{
            token,
            startTime: new Date(),
            provider,
            amount,
            userId: Number(userId),
            status: "Processing"
        }
    });

    return {
        message: "Done"
    }
}