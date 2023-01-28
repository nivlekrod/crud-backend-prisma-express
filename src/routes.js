import { Router } from "express";
import AlunosController from "./controllers/AlunosController";

const router = Router();

router.post("/", AlunosController.createAlunos);
router.get("/", AlunosController.findAllAlunos);
router.get("/table/:id", AlunosController.findAluno);
router.put("/table/:id", AlunosController.updateAluno);
router.delete("/table/:id", AlunosController.deleteAluno);

export { router };
