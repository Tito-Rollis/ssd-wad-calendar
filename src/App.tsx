import { EventCardComponent } from './components/eventCard';
import './index.css';

const Days_Name = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function App() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const currentDay = new Date().getDay();
    const firstDayInMonth = new Date(year, month, 1).getDay(); // <0-6>
    const lastDayInMonth = new Date(year, month + 1, 0).getDate();

    const daysInMonth: () => number[] = () => {
        const days = [];

        // Get empty days before first day in a month
        for (let d = 0; d < firstDayInMonth; d++) {
            days.push(d);
        }

        // Get the total days in a month
        for (let d = 1; d <= lastDayInMonth; d++) {
            days.push(d);
        }
        return days;
    };

    return (
        <>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 w-screen h-screen auto-rows-max overflow-x-hidden">
                {Days_Name.map((day) => {
                    return (
                        <div className="justify-self-stretch bg-black p-2">
                            <h1 className=" font-medium text-white text-center">{day}</h1>
                        </div>
                    );
                })}
                {daysInMonth().map((day, index) => {
                    if (index < firstDayInMonth) {
                        return (
                            <div className="w-full border h-fit min-h-24 justify-center bg-gray-500 flex justify-self-stretch "></div>
                        );
                    }
                    return (
                        <div className="w-full border p-2 h-fit min-h-24 bg-blue-500 flex flex-col justify-self-stretch gap-y-1">
                            <h1 className="text-white font-medium ">{day}</h1>
                            {/* CARDS */}
                            <EventCardComponent color="bg-white" invitee="asd@asdd" name="Event 1" time="12:00 pm" />
                            <EventCardComponent
                                color="bg-yellow-500"
                                invitee="asd@asdd"
                                name="Event 2"
                                time="12:00 pm"
                            />
                            <EventCardComponent
                                color="bg-purple-500"
                                invitee="asd@asdd"
                                name="Event 2"
                                time="12:00 pm"
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default App;
