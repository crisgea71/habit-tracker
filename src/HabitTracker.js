import React, { useState } from 'react';

function HabitTracker() {
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');
    const [tracker, setTracker] = useState({});
    const [streaks, setStreaks] = useState({});

    // Add a new habit
    const addHabit = () => {
        if (newHabit) {
            setHabits([...habits, newHabit]);
            setTracker({ ...tracker, [newHabit]: Array(7).fill(false) });
            setStreaks({ ...streaks, [newHabit]: 0 });
            setNewHabit('');
        }
    };

    // Toggle habit completion and update streak
    const toggleCompletion = (habit, dayIndex) => {
        setTracker(prevTracker => {
            const updatedDays = prevTracker[habit].map((completed, index) =>
                index === dayIndex ? !completed : completed
            );
            return { ...prevTracker, [habit]: updatedDays };
        });

        // Update streak
        const newStreak = tracker[habit][dayIndex] ? streaks[habit] + 1 : 0;
        setStreaks(prevStreaks => ({
            ...prevStreaks,
            [habit]: newStreak
        }));
    };

    // Reset progress for all habits
    const resetProgress = () => {
        setTracker(prevTracker =>
            Object.fromEntries(Object.keys(prevTracker).map(habit => [habit, Array(7).fill(false)]))
        );
        setStreaks({});
    };

    return (
        <div>
            <h2>Habit Tracker</h2>

            {/* Input to Add New Habits */}
            <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Enter a new habit"
            />
            <button onClick={addHabit}>Add Habit</button>

            {/* Reset Button */}
            <button onClick={resetProgress}>Reset Weekly Progress</button>

            {/* Habit Tracker Table */}
            <table>
                <thead>
                    <tr>
                        <th>Habit</th>
                        {[...Array(7).keys()].map(day => (
                            <th key={day}>Day {day + 1}</th>
                        ))}
                        <th>Streak</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.map(habit => (
                        <tr key={habit}>
                            <td>{habit}</td>
                            {tracker[habit].map((completed, index) => (
                                <td
                                    key={index}
                                    onClick={() => toggleCompletion(habit, index)}
                                    style={{
                                        backgroundColor: completed ? 'lightgreen' : 'lightcoral',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {completed ? '✔️' : '✖️'}
                                </td>
                            ))}
                            <td>{streaks[habit]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HabitTracker;