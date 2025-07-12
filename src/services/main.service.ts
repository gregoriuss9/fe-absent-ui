import mainApiClient from "../lib/mainAxios";

interface SingleEmployeePayload {
  username: string;
  password: string;
  name: string;
  department: string;
  email: string;
}

interface UpdateEmployeePayload {
  name: string;
  department: string;
  email: string;
}

export const mainService = {
  getAllEmployeeData: async (
    page: number,
    limit: number,
    search?: string,
    department?: string
  ) => {
    const response = await mainApiClient.get(
      `/employees/?page=${page}&limit=${limit}&search=${search}&department=${department}`
    );

    return response.data;
  },
  getAllDepartments: async () => {
    const response = await mainApiClient.get("/employees/department");
    return response.data.data;
  },

  createSingleEmployee: async (payload: SingleEmployeePayload) => {
    const response = await mainApiClient.post("/employees", payload);
    return response.data;
  },

  getEmployeeById: async (id: string) => {
    const response = await mainApiClient.get(`/employees/${id}`);
    return response.data.data;
  },

  updateSingleEmployee: async (id: string, payload: UpdateEmployeePayload) => {
    const response = await mainApiClient.put(`/employees/${id}`, payload);
    return response.data;
  },

  deleteEmployeeById: async (id: string) => {
    const response = await mainApiClient.delete(`/employees/${id}`);
    return response.data;
  },

  isPresenceToday: async () => {
    const response = await mainApiClient.get("/attendances/presence-today");
    return response.data.data;
  },

  getOwnPresences: async (page: number, limit: number) => {
    const response = await mainApiClient.get(
      `/attendances/own/?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  checkIn: async (payload: FormData) => {
    const response = await mainApiClient.post(
      "/attendances/check-in",
      payload,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },

  checkOut: async (id: string) => {
    const response = await mainApiClient.post(`/attendances/check-out/${id}`);
    return response.data;
  },

  getAttendancesToday: async () => {
    const response = await mainApiClient.get("/attendances/employees-today");
    return response.data;
  },

  getAllAttendances: async (page: number, limit: number) => {
    const response = await mainApiClient.get(
      `/attendances/?page=${page}&limit=${limit}`
    );
    return response.data;
  },
};
