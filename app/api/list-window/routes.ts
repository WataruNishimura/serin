import { db } from "@/app/_db/client";
import { windowTable } from "@/database/schema";
import { count } from "drizzle-orm";
import { NextRequest } from "next/server";
import * as v from "valibot";

const QueryStringSchema = v.object({
  limit: v.optional(
    v.pipe(
      v.union([v.number(), v.array(v.number())]),
      v.transform((value) => (Array.isArray(value) ? value : [value]))
    ),
    10
  ),
  offset: v.optional(
    v.pipe(
      v.union([v.number(), v.array(v.number())]),
      v.transform((value) => (Array.isArray(value) ? value : [value]))
    ),
    0
  ),
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const parsedQuery = v.safeParse(QueryStringSchema, {
    limit: searchParams.getAll("limit"),
    offset: searchParams.getAll("offset"),
  });

  if (!parsedQuery.success) {
    return {
      status: 400,
      error: parsedQuery.issues,
    };
  }

  const query = parsedQuery.output;

  console.log(`api list-windows: query: ${JSON.stringify(query)}`);

  const limit = query.limit[0];
  const offset = query.offset[0];

  try {
    const windows = await db
      .select()
      .from(windowTable)
      .limit(limit)
      .offset(offset);
    const totalCount = await db.select({ count: count() }).from(windowTable);

    return {
      data: windows,
      totalCount: totalCount[0].count,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        status: 500,
        error: error.message,
      };
    }

    console.error(`UNKOWN ERROR: ${JSON.stringify(error)}`);

    return {
      status: 500,
      error: "An unknown error occurred",
    };
  }
}
