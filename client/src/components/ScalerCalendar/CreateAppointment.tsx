import axios from "axios";
import { useEffect, useState } from "react";
import { TextInput, Group, Button, Select, ComboboxData, ComboboxItem } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form"
import { Department, Employee, AppointmentApiFormat } from './types';

const oneHourInMilliseconds = 60 * 60 * 1000;

type CreateAppointmentProps = {
  onSuccess?: CallableFunction,
  onError?: CallableFunction
}

export function CreateAppointment({onSuccess, onError}: CreateAppointmentProps): React.JSX.Element {
  const [departments, setDepartments] = useState<ComboboxData | undefined>(undefined);
  const [employees, setEmployees] = useState<ComboboxData | undefined>(undefined);


  const fetchDepartments = () => {
    axios.get("/api/departments").then((response) => {
      setDepartments((response.data as Department[]).map<ComboboxItem>((department: Department) => {
        return { value: department.id, label: department.name };
      }));
    }).catch(e => {
      console.error("Error fetching data:", e);
    });
  };

  const fetchEmployees = () => {
    axios.get("/api/employees").then((response) => {
      setEmployees((response.data as Employee[]).map<ComboboxItem>((employee: Employee) => {
        return { value: employee.id, label: employee.name };
      }));
    }).catch(e => {
      console.error("Error fetching data:", e);
    });
  };


  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const appointmentForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      startDateTime: new Date(),
      endDateTime: new Date(new Date().getTime() + oneHourInMilliseconds),
      department: '',
      employee: '',
      description: ''
    },

    validate: {
      title: (value) => (value !== '' ? null : 'Appointment title cannot be empty'),
      description: (value) => (value !== '' ? null : 'Appointment description cannot be empty'),
      startDateTime: (value: Date) => (value.getTime() > new Date().getTime() ? null : 'Invalid start time'),
      endDateTime: (value: Date) => (value.getTime() > new Date().getTime() ? null : 'Invalid end time'),
    }
  });

  function createAppointment(values: typeof appointmentForm.values) {
    const toApi: AppointmentApiFormat = {
      title: values.title,
      description: values.description,
      employee: values.employee,
      department: values.department,
      start_date: values.startDateTime.toISOString().slice(0, 10),
      end_date: values.endDateTime.toISOString().slice(0, 10),
      start_time: values.startDateTime.toISOString().slice(11, 16),
      end_time: values.endDateTime.toISOString().slice(11, 16)
    }
    axios.post('/api/appointments', toApi).then((response) => {
      console.log(response);
      if ( onSuccess ) {
        onSuccess();
      }
    }).catch((err) => {
      console.log(err);
      if ( onError ) {
        onError();
      }
    });
  }

  return <form onSubmit={appointmentForm.onSubmit((values) => createAppointment(values))}>
    <TextInput
      withAsterisk
      label="Title"
      placeholder="appointment title"
      key={appointmentForm.key('title')}
      {...appointmentForm.getInputProps('title')}
    />
    <TextInput
      withAsterisk
      label="Description"
      placeholder="appointment description"
      key={appointmentForm.key('description')}
      {...appointmentForm.getInputProps('description')}
    />
    <DateTimePicker withAsterisk label="Start time" key={appointmentForm.key('startDateTime')} {...appointmentForm.getInputProps('startDateTime')} />
    <DateTimePicker withAsterisk label="End time" key={appointmentForm.key('endDateTime')} {...appointmentForm.getInputProps('endDateTime')} />

    <Select
      key={appointmentForm.key('department')}
      withAsterisk
      label="Select department"
      placeholder="Select department"
      data={departments}
      {...appointmentForm.getInputProps('department')}
    />
    <Select
      key={appointmentForm.key('employee')}
      withAsterisk
      label="Select employee"
      placeholder="Select employee"
      data={employees}
      {...appointmentForm.getInputProps('employee')}
    />

    <Group justify="flex-end" mt="md">
      <Button type="submit" >Submit</Button>
    </Group>
  </form>;
}