import { DayCardComponent } from './components/dayCard';
import './index.css';

const Days_Name = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function App() {
    return (
        <>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 w-screen h-screen auto-rows-max overflow-x-hidden">
                {Days_Name.map((day, index) => {
                    return (
                        <div key={index} className="justify-self-stretch bg-black p-2">
                            <h1 className=" font-medium text-white text-center">{day}</h1>
                        </div>
                    );
                })}
                <DayCardComponent />
            </div>
        </>
    );
}

export default App;
