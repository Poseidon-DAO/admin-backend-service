import { Request, Response } from "express";

import { prismaClient } from "../db-client";

const PAGE_SIZE = 20;

/**
 * @route GET /
 */
export const getPolls = async (
  req: Request<{ page: number }>,
  res: Response
) => {
  const { page = 1 } = req.params;

  let start = PAGE_SIZE * (page - 1);

  const polls = await prismaClient.poll.findMany({
    skip: start,
    take: PAGE_SIZE,
  });
  return res.json(polls);
};

/**
 * @route POST /
 */
export const createPoll = async (
  req: Request<{}, {}, { hex: string; description: string }>,
  res: Response
) => {
  const { description = "", hex } = req.body;

  try {
    const pollExists = await prismaClient.poll.findUnique({ where: { hex } });

    if (pollExists) {
      res.statusCode = 409;
      throw new Error("Poll exists!");
    }

    const result = await prismaClient.poll.create({
      data: {
        hex,
        description,
      },
    });

    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};
