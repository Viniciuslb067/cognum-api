import { Employee } from "@prisma/client";

import axios from "axios";

import EmployeeRepository from "../repositories/employee-repository";

export default class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  async getById(id: string) {
    return await this.employeeRepository.getById(id);
  }

  async list() {
    return await this.employeeRepository.list();
  }

  async create(data: Pick<Employee, "name"> & { role: string | null }) {
    return await this.employeeRepository.create(data);
  }

  async update(id: string, data: Pick<Employee, "name" | "role">) {
    if (!(await this.employeeRepository.getById(id))) {
      throw new Error("Employee not found");
    }

    return await this.employeeRepository.update(id, data);
  }

  async delete(id: string) {
    if (!(await this.employeeRepository.getById(id))) {
      throw new Error("Employee not found");
    }

    return await this.employeeRepository.delete(id);
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
      throw new Error("Failed to populate employees");
    }
  }
}
