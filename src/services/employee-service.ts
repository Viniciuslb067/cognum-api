import { Employee } from "@prisma/client";

import axios from "axios";

import EmployeeRepository from "../repositories/employee-repository";
import { Api404Error, Api500Error } from "../util/errors";
import { logger } from "../util/logger/logger";

export default class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  async getById(id: string) {
    try {
      return await this.employeeRepository.getById(id);
    } catch (error: any) {
      logger?.error(error);
      throw new Api500Error(
        `Ocorreu um erro inesperado ao tentar pegar o funcionário ${id}.`
      );
    }
  }

  async list() {
    try {
      return await this.employeeRepository.list();
    } catch (error: any) {
      logger?.error(error);
      throw new Api500Error(
        "Ocorreu um erro inesperado ao tentar listar os funcionários."
      );
    }
  }

  async create(data: Pick<Employee, "name"> & { role: string | null }) {
    try {
      return await this.employeeRepository.create(data);
    } catch (error: any) {
      logger?.error(error);
      throw new Api500Error(
        "Ocorreu um erro inesperado ao tentar criar o funcionário."
      );
    }
  }

  async update(id: string, data: Pick<Employee, "name" | "role">) {
    try {
      if (!(await this.employeeRepository.getById(id))) {
        throw new Error("Funcionário não encontrado.");
      }

      return await this.employeeRepository.update(id, data);
    } catch (error: any) {
      logger?.error(error);
      throw new Api500Error(
        "Ocorreu um erro inesperado ao tentar atualizar o funcionário."
      );
    }
  }

  async delete(id: string) {
    try {
      if (!(await this.employeeRepository.getById(id))) {
        throw new Api404Error("Funcionário não encontrado.");
      }

      return await this.employeeRepository.delete(id);
    } catch (error: any) {
      logger?.error(error);
      throw new Api500Error(
        "Ocorreu um erro inesperado ao tentar excluir o funcionário."
      );
    }
  }

  async populate() {
    try {
      const { data } = await axios.get("https://randomuser.me/api/?results=10");

      const usersThatAreCreated: Employee[] = [];

      for (const user of data.results) {
        const employeeData = {
          role: null,
          name: `${user.name.first} ${user.name.last}`,
        };

        const newEmployee = await this.create(employeeData);

        usersThatAreCreated.push(newEmployee);
      }

      return usersThatAreCreated;
    } catch (error: any) {
      logger?.error(error);
      throw new Api500Error(
        "Ocorreu um erro ao tentar popular os novos funcionários."
      );
    }
  }
}
