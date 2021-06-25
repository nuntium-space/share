import "dotenv/config";

import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";

const server = Hapi.server({
    port: process.env.PORT,
    routes: {
        cors: {
            origin: [ process.env.CLIENT_URL as string ],
        },
    },
});

const init = async () =>
{
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
        handler: async (request, h) =>
        {
            const id = request.params.id;

            // TODO: Fetch article from DB

            return h.view("index", {
                CLIENT_URL: process.env.CLIENT_URL,
                article: {
                    id: "art_test",
                    title: "Title",
                    author: {
                        user: {
                            full_name: "Alex Sandri",
                        },
                    },
                    created_at: "2021-06-25T13:12:23Z",
                    updated_at: "2021-06-25T13:12:23Z",
                },
            });
        },
    });

    server.start();
}

init();
