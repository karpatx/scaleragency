
enum Position {
    Employee = "EMP",
    Manager = "MAN"
  }

export type Employee = {
    id: string
    name: string
    email: string
    position: Position
    departmentId: string
}

export type Department = {
    id: string
    name: string
    manager: Employee
    description: string
}


export type Appointment = {
    id: string
    title: string
    description: string
    department: Department
    employee: Employee
    starts: Date
    ends: Date
}

export type AppointmentApiFormat = {
    id?: string
    title: string
    description: string
    employee: string
    department: string
    start_date: string
    end_date: string
    start_time: string
    end_time: string
}

export type AppointmentApiResponseFormat = {
    id?: string
    title: string
    description: string
    employee: Employee
    department: Department
    start_date: string
    end_date: string
    start_time: string
    end_time: string
}
