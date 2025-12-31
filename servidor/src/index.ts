import fastify from "fastify";
import { prisma } from "./lib/prisma";

import UserRoutes from "./modules/user/UserRoutes";

// Definir o servidor Fastify
const server = fastify({
	logger: true,
});

// Definir o plugin de rotas de usuario(src/routes/UserRoutes.ts)
server.register(UserRoutes, {
	prefix: "/users",
});

// Inicializar o servidor Fastify
(async () => {
	try {
		await server.listen({ port: 3000 });
		console.log(`Servidor rodando em http://localhost:3000`);
		console.log("Prisma status:", prisma ? "Conectado" : "Desconectado");
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
})();
