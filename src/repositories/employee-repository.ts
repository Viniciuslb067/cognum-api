import { PrismaClient, Employee } from "@prisma/client";

const prisma = new PrismaClient();

export default class EmployeeRepository {
  async getById(id: string) {
    return await prisma.employee.findFirst({ where: { id } });
  }

  async list() {
    return await prisma.employee.findMany();
  }

  async create(data: Pick<Employee, "name" | "role">) {
    return await prisma.employee.create({ data });
  }

  async update(id: string, data: Pick<Employee, "name" | "role">) {
    return await prisma.employee.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await prisma.employee.delete({ where: { id } });
  }
}
