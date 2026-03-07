const path = require("path");
const fastify = require("fastify")({ logger: true });
const fastifyStatic = require("@fastify/static");
const cors = require("@fastify/cors");
const gamesRoutes = require("./routes/games");
const movesRoutes = require("./routes/moves");

async function build() {
  await fastify.register(cors, { origin: true });
  await fastify.register(gamesRoutes);
  await fastify.register(movesRoutes);

  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    const distPath = path.join(__dirname, "..", "dist");

    await fastify.register(fastifyStatic, {
      root: distPath
    });

    fastify.get("/*", async (request, reply) => {
      return reply.sendFile("index.html");
    });
  }

  const port = process.env.PORT || 3000;
  await fastify.listen({ port, host: "0.0.0.0" });
}

build().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
