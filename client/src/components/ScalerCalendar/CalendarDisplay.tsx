import { Flex, Divider, Container, Group, Button, Modal, Paper, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { CreateAppointment } from "./CreateAppointment";
import { Appointment } from "./types";

type CalendarDisplayProps = {
    currentDate: Date,
    onChange: CallableFunction,
    appointments: Appointment[]
}

export function CalendarDisplay({ currentDate, onChange, appointments }: CalendarDisplayProps): React.JSX.Element {
    const [creatorOpened, creator] = useDisclosure(false);
    const theme = useMantineTheme();

    function createDisplayHours(): React.JSX.Element[] {
        const stack: React.JSX.Element[] = [];
        for (let i = 9; i < 22; i++) {
            let colored = 0;
            for ( const j in appointments ) {
                if ( appointments[j].starts.getDate() === currentDate.getDate() && appointments[j].starts.getHours() === i ) {
                    colored++;
                }
            }
            stack.push(
                <Paper style={{backgroundColor: colored?theme.colors.blue[0]:"inherit"}} onClick={() => console.log("alma")} key={i}>
                    <Divider
                        my="xs"
                        label={`${i}:00`}
                        labelPosition="left"
                        style={{ paddingTop: "5px", paddingBottom: "5px", marginTop: "0px", marginBottom: "0px" }}
                    />
                </Paper>
            );
        }
        return stack;
    }

    function AppointmentCreated() {
        creator.close();
        onChange();
    }

    return <Flex direction="column" align="center">
        <Container fluid style={{ width: "100%" }}>
            {createDisplayHours()}
        </Container>
        <Group justify="flex-end" style={{ width: "100%" }}>
            <Button onClick={creator.open}>New appointment</Button>
        </Group>
        <Modal opened={creatorOpened} onClose={creator.close} title="Create appointment">
            <CreateAppointment onSuccess={AppointmentCreated}/>
        </Modal>
    </Flex>;
}