import { Router } from "express";
import { requestSchema } from "../lib/schemas.js";
import { createPlan } from "../services/planner.js";
import { limitRequests } from "../middleware/limit.js";
const router = Router();
router.post(
  "/plan",
  (req, res, next) => {
    const parsed = requestSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({
        error: "Confira cidade, orçamento (R$ 0 a 2.000), pessoas (1 a 10) e preferências.",
      });
    res.locals.request = parsed.data;
    next();
  },
  limitRequests,
  async (_req, res) => {
    try {
      res.json(await createPlan(res.locals.request));
    } catch (error) {
      res.status(error.status || 502).json({
        error: error.status ? error.message : "Não foi possível montar o roteiro. Tente novamente.",
      });
    } finally {
      res.locals.release();
    }
  },
);
export default router;
