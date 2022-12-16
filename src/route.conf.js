import ServiceRoutes from "./service.routes.js";

export function initRoutes(app) {
  const startTime = new Date();

  // Insert routes belowW
  app.use("/api", ServiceRoutes);

  app.route("/*").get((req, res) => {
    const uptime = `${new Date() - startTime}ms`;
    res.status(200).json({ startTime, uptime });
  });
}
