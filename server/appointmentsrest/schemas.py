from typing import Optional
import uuid

from ninja import Schema, FilterSchema
from datetime import date, time

from appointmentsrest.models import Department


class EmployeeSchema(Schema):
    id: uuid.UUID
    name: str
    email: str
    position: str

class CreateEmployeeSchema(Schema):
    name: str
    email: str
    position: str
    department_id: str

class DepartmentSchema(Schema):
    id: uuid.UUID
    name: str
    manager: EmployeeSchema
    description: str

class CreateDepartmentSchema(Schema):
    name: str
    manager: str
    description: str

class AppointmentSchema(Schema):
    id: uuid.UUID
    employee: EmployeeSchema
    department: DepartmentSchema
    title: str
    description: str
    start_date: date
    end_date: date
    start_time: time
    end_time: time

class CreateAppointmentSchema(Schema):
    employee: str
    title: str
    description: str
    department: str
    start_date: date
    end_date: date
    start_time: time
    end_time: time

class EmployeeFilterSchema(FilterSchema):
    name: Optional[str] = None
    email: Optional[str] = None
