
import { useState } from "react";
import { Flex, Button, ActionIcon, Group } from "@mantine/core";
import { DatePickerInput, DateValue } from '@mantine/dates';
import { IconCaretLeftFilled, IconCaretRightFilled } from '@tabler/icons-react';

const oneDayInMilliseconds = 86400000;

type DateSelectorProps = {
    currentDate: Date,
    onChange: CallableFunction
}

export function DateSelector({ currentDate, onChange }: DateSelectorProps): React.JSX.Element {

    const [selectedDate, setSelectedDate] = useState<Date>(currentDate);

    function createNewDate(d: Date, additionalTime: number): Date {
        return new Date(d.getTime() + additionalTime);
    }

    function increaseDate() {
        const increasedDate: Date = createNewDate(selectedDate, oneDayInMilliseconds);
        setSelectedDate(increasedDate);
        onChange(increasedDate)
    }

    function decreaseDate() {
        const increasedDate: Date = createNewDate(selectedDate, -oneDayInMilliseconds);
        setSelectedDate(increasedDate);
        onChange(increasedDate)
    }

    function pickerChanged(v: DateValue) {
        if (v !== null) {
            setSelectedDate(v);
            onChange(v);
        }
    }

    return <>
        <Flex
            direction="row"
            justify="center"
            align="center"
        >
            <ActionIcon onClick={decreaseDate} aria-label="Decrease date" variant="subtle" size="xl">
                <IconCaretLeftFilled />
            </ActionIcon>
            <DatePickerInput
                placeholder="Pick a date"
                value={selectedDate}
                onChange={pickerChanged}
            />
            <ActionIcon onClick={increaseDate} aria-label="Increase date" variant="subtle" size="xl">
                <IconCaretRightFilled />
            </ActionIcon>
        </Flex>
    </>;
}