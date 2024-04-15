import { events } from "../../../../data/events"
import { inter } from "@/fonts"
import { Event } from "../../../../types/Event"

interface Props {
    event: Event
}

export default function EventDetails({ event }: Props) {

    return (
        <div className={inter.className}>
            <h1>{event.id}</h1>
            <h1>{event.title}</h1>
            <h1>{event.description}</h1>
        </div>
    )
}


export function getServerSideProps(context: any) {
    const { params } = context
    let event = events.find((event) => event.id === Number(params.eventId))

    if (!event) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            event: event
        }
    }
}