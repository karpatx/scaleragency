import uuid

from django.db import models


POSITION = [
    ('EMP', 'Employee'),
    ('MAN', 'Manager'),
]

class Employee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    position = models.CharField(
        max_length=3,
        choices=POSITION,
        default=POSITION[0][0]
    )
    department_id = models.CharField(max_length=100, default='')

    def __str__(self):
        return self.name


class Department(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    manager = models.ForeignKey(Employee, on_delete=models.CASCADE)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, default='')
    title = models.CharField(max_length=200, default='')
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return self.employee.name
