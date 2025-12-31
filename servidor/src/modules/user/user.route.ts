import { FastifyInstance } from "fastify";
import { controller } from ".";

export default function userRoute(fastify:FastifyInstance) {
    fastify.get("/", controller.getAll);
}