from ninja import NinjaAPI, Query
from .models import Employee, Department, Appointment
from .schemas import EmployeeSchema, CreateEmployeeSchema
from .schemas import DepartmentSchema, CreateDepartmentSchema
from .schemas import AppointmentSchema, CreateAppointmentSchema
from .schemas import EmployeeFilterSchema
from django.shortcuts import get_object_or_404

api = NinjaAPI()

@api.get("/employees", response=list[EmployeeSchema])
def list_employees(request):
    employees = Employee.objects.all()
    return employees

@api.get("/employees-filtered", response=list[EmployeeSchema])
def list_employees(request, filters: EmployeeFilterSchema = Query(...)):
    employees = Employee.objects.all()
    employees = filters.filter(employees)
    return employees

@api.post("/employees", response=EmployeeSchema)
def create_employee(request, payload: CreateEmployeeSchema):
    employee = Employee.objects.create(**payload.dict())
    return employee

@api.get("/epmloyees/{employee_id}", response=EmployeeSchema)
def get_book(request, employee_id: str):
    employee = get_object_or_404(Employee, id=employee_id)
    return employee

@api.put("/employees/{employee_id}", response=EmployeeSchema)
def update_book(request, employee_id: str, payload: CreateEmployeeSchema):
    employee = get_object_or_404(Employee, id=employee_id)
    for attr, value in payload.dict().items():
        setattr(employee, attr, value)
    employee.save()
    return employee

@api.delete("/employees/{employee_id}")
def delete_book(request, employee_id: str):
    employee = get_object_or_404(Employee, id=employee_id)
    employee.delete()
    return {"success": True}

@api.get("/departments", response=list[DepartmentSchema])
def list_departments(request):
    departments = Department.objects.all()
    return departments

@api.post("/departments", response=DepartmentSchema)
def create_department(request, payload: CreateDepartmentSchema):
    employee = get_object_or_404(Employee, id=payload.manager)
    payload.manager = employee
    department = Department.objects.create(**payload.dict())
    return department

@api.get("/departments/{department_id}", response=DepartmentSchema)
def get_department(request, department_id: str):
    department = get_object_or_404(Department, id=department_id)
    return department

@api.put("/departments/{department_id}", response=DepartmentSchema)
def update_department(request, department_id: str, payload: CreateDepartmentSchema):
    department = get_object_or_404(Department, id=department_id)
    for attr, value in payload.dict().items():
        setattr(department, attr, value)
    department.save()
    return department

@api.delete("/departments/{department_id}")
def delete_department(request, department_id: str):
    department = get_object_or_404(Department, id=department_id)
    department.delete()
    return {"success": True}

@api.get("/appointments", response=list[AppointmentSchema])
def list_appointments(request):
    appointments = Appointment.objects.all()
    return appointments

@api.post("/appointments", response=AppointmentSchema)
def create_appointment(request, payload: CreateAppointmentSchema):
    employee = get_object_or_404(Employee, id=payload.employee)
    department = get_object_or_404(Department, id=payload.department)
    payload.employee = employee
    payload.department = department
    appointment = Appointment.objects.create(**payload.dict())
    return appointment

@api.get("/appointments/{appointment_id}", response=AppointmentSchema)
def get_appointment(request, appointment_id: str):
    appointment = get_object_or_404(Appointment, id=appointment_id)
    return appointment

@api.put("/appointments/{appointment_id}", response=AppointmentSchema)
def update_appointment(request, appointment_id: str, payload: CreateAppointmentSchema):
    appointment = get_object_or_404(Appointment, id=appointment_id)
    for attr, value in payload.dict().items():
        setattr(appointment, attr, value)
    appointment.save()
    return appointment

@api.delete("/appointments/{appointment_id}")
def delete_appointment(request, appointment_id: str):
    appointment = get_object_or_404(Department, id=appointment_id)
    appointment.delete()
    return {"success": True}
