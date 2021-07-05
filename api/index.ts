import "dotenv/config";

import Boom from "@hapi/boom";
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import Database from "../src/utilities/Database";
import serverless from "serverless-http";

const server = Hapi.server({
  port: process.env.PORT,
  routes: {
    cors: {
      origin: [process.env.CLIENT_URL as string],
    },
  },
});

const init = async () => {
  Database.init();

  await server.register(Vision);

  server.views({
    engines: {
      html: Handlebars,
    },
    path: "templates",
    relativeTo: path.resolve(__dirname, "..", "src"),
  });

  server.route({
    method: "GET",
    path: "/{id}",
    handler: async (request, h) => {
      const id = request.params.id;

      const result = await Database.pool.query(
        `
        select "art"."title", "art"."created_at", "art"."updated_at", "usr"."full_name"
        from
            "articles" as "art"
            inner join
            "authors" as "aut"
            on "art"."author" = "aut"."id"
            inner join
            "users" as "usr"
            on "aut"."user" = "usr"."id"
        where "art"."id" = $1
        `,
        [id]
      );

      if (result.rowCount === 0) {
        throw Boom.notFound();
      }

      const row = result.rows[0];

      return h.view("index", {
        CLIENT_URL: process.env.CLIENT_URL,
        article: {
          id,
          title: row.title,
          author: {
            user: {
              full_name: row.full_name,
            },
          },
          created_at: (row.created_at as Date).toISOString(),
          updated_at: (row.updated_at as Date).toISOString(),
        },
      });
    },
  });

  server.start();
};

init();

let cachedHandler: any;

export async function handler(event: any, context: any) {
  if (!cachedHandler) {
    cachedHandler = serverless(server as any, {
      request: (request: any) => {
        request.serverless = { event, context };
      },
    });
  }

  const res = await cachedHandler(event, context);

  return res;
}
