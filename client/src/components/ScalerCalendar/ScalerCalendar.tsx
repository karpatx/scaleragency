import axios from 'axios';
import { useEffect, useState } from 'react';
import { Flex } from '@mantine/core';
import { CalendarDisplay } from './CalendarDisplay';
import { DateSelector } from './DateSelector';
import { Appointment, AppointmentApiResponseFormat } from './types';

export function ScalerCalendar() {
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);

  function dateTimeConvertor(date: string, time: string): Date {
    const [year, month, day] = date.split('-');
    const [hours, minutes, seconds] = time.split(':');
    const d = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
    return d;
  }

  function appointmentResponseToAppointment(response: AppointmentApiResponseFormat[]) {
    return response.map<Appointment>((appointment: AppointmentApiResponseFormat) => {
      return {
        id: appointment.id !== undefined?appointment.id:'',
        title: appointment.title,
        description: appointment.description,
        department: appointment.department,
        employee: appointment.employee,
        starts: dateTimeConvertor(appointment.start_date, appointment.start_time),
        ends: dateTimeConvertor(appointment.end_date, appointment.end_time)
      };
    });
  }

  const fetchAppointments = () => {
    axios.get("/api/appointments").then((response) => {
      setAppointments(appointmentResponseToAppointment(response.data));
    }).catch(e => {
      console.error("Error fetching data:", e);
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, [pickedDate]);

  function onPickedDateChange(value: Date) {
    setPickedDate(value);
  }

  return <Flex direction="column">
    <DateSelector currentDate={pickedDate} onChange={onPickedDateChange} />
    <CalendarDisplay currentDate={pickedDate} onChange={() => {fetchAppointments()}} appointments={appointments===null?[]:appointments}/>
  </Flex>;
}
