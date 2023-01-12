import { prismaClient } from "db-client";

export async function getBlockOnDatabase() {
  console.log("FETCHING BLOCK NUMBER FROM DATABASE START...");

  const blockNumberOnDatabase = await prismaClient.block.findFirst();

  console.log("FETCHING BLOCK NUMBER FROM DATABASE END...");

  return blockNumberOnDatabase;
}

export async function createBlockOnDatabase(blockNumberOnChain: string) {
  console.log("CREATING BLOCK NUMBER ON DATABASE START...");

  await prismaClient.block.create({
    data: { blockNo: blockNumberOnChain },
  });

  console.log("CREATING BLOCK NUMBER ON DATABASE END...");
}

export async function updateBlockOnDatabase(
  id: number,
  blockNumberOnChain: string
) {
  console.log("UPDATING BLOCK NUMBER ON DATABASE START...");

  await prismaClient.block.update({
    data: { blockNo: blockNumberOnChain },
    where: { id },
  });

  console.log("UPDATING BLOCK NUMBER ON DATABASE END...");
}
