import { PrismaClient, Employee } from "@prisma/client";

import { Api404Error, Api500Error } from "../util/errors";

const prisma = new PrismaClient();

export default class EmployeeRepository {
  async getById(id: string) {
    try {
      const employee = await prisma.employee.findFirst({ where: { id } });

      if (!employee) throw new Api404Error("Funcionário não encontrado.");

      return employee;
    } catch (error: any) {
      throw new Api500Error(
        "Ocorreu um erro ao tentar buscar um funcionário.",
        error.stack
      );
    }
  }

  async list() {
    try {
      return await prisma.employee.findMany();
    } catch (error: any) {
      throw new Api500Error(
        "Ocorreu um erro ao tentar listar os funcionários.",
        error.stack
      );
    }
  }

  async create(data: Pick<Employee, "name" | "role">) {
    try {
      return await prisma.employee.create({ data });
    } catch (error: any) {
      throw new Api500Error(
        "Ocorreu um erro ao tentar criar o funcionário.",
        error.stack
      );
    }
  }

  async update(id: string, data: Pick<Employee, "name" | "role">) {
    try {
      return await prisma.employee.update({ where: { id }, data });
    } catch (error: any) {
      throw new Api500Error(
        `Ocorreu um erro ao tentar atualizar o funcionário(a) ${data.name}.`,
        error.stack
      );
    }
  }

  async delete(id: string) {
    try {
      return await prisma.employee.delete({ where: { id } });
    } catch (error: any) {
      throw new Api500Error(
        "Ocorreu um erro ao tentar excluir o funcionário(a)",
        error.stack
      );
    }
  }
}
