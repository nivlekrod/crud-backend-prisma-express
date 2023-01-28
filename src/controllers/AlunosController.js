import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createAlunos(req, res) {
    try {
      const { name, email, course } = req.body;

      let alunos = await prisma.alunos.findUnique({ where: { email } });

      if (alunos) {
        return res.json({ error: "email already used" });
      }

      alunos = await prisma.alunos.create({
        data: {
          name,
          email,
          course,
        },
      });

      return res.json(alunos);
    } catch (error) {
      return res.json({ error });
    }
  },

  async findAllAlunos(req, res) {
    try {
      const alunos = await prisma.alunos.findMany();
      return res.json(alunos);
    } catch (error) {
      return res.json({ error });
    }
  },

  async findAluno(req, res) {
    try {
      const { id } = req.params;

      const alunos = await prisma.alunos.findUnique({
        where: { id },
        select: {
          name: true,
          email: true,
        },
      });

      if (!alunos) return res.json({ error: "doesn't exist" });

      return res.json(alunos);
    } catch (error) {
      return res.json({ error });
    }
  },

  async updateAluno(req, res) {
    try {
      const { id } = req.params;
      const { name, email, course } = req.body;

      let alunos = await prisma.alunos.findUnique({ where: { id } });

      if (!alunos) return res.json({ error: "doesn't exist" });

      alunos = await prisma.alunos.update({
        where: { id },
        data: { name, email, course },
      });

      return res.json(alunos);
    } catch (error) {
      res.json({ error });
    }
  },

  async deleteAluno(req, res) {
    try {
      const { id } = req.params;

      const alunos = await prisma.alunos.findUnique({
        where: { id },
        select: {
          name: true,
          email: true,
        },
      });

      if (!alunos) return res.json({ error: "doesn't exist" });

      await prisma.alunos.delete({ where: { id } });
      return res.json({ message: "deleted" });
    } catch (error) {
      return res.json({ error });
    }
  },
};
