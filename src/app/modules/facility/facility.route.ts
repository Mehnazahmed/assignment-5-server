import { Router } from "express";

const router = Router();

router.get("/");
router.post("/");
router.put("/:id");
router.delete("/:id");

export const FacilityRoutes = router;
