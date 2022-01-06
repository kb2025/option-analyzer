import { useState } from 'react'
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap'
import useTransformData from '../DataHandlers/TransformData'
import { useSelectedDate } from '../Providers/SelectedDateProvider'

const DateSelectButtons = () => {
    let defaultDate;
    const { selectedDate, setSelectedDate } = useSelectedDate(defaultDate)
    const { expDates } = useTransformData()

    if (expDates) {

    defaultDate = expDates[0]

    const handleChange = (val) => setSelectedDate(val);

    return (
        <ToggleButtonGroup type="radio" name="options" defaultValue={selectedDate} onChange={handleChange}>
            {expDates?.map((date, id) => {
                return (
                    <ToggleButton className='btn-sm outline-light text-center mt-2 pt-2 rounded' variant='outline-light' key={id} id={id} value={date}>
                        <strong>{date}</strong>
                    </ToggleButton>
                )
            })}
        </ToggleButtonGroup>
    )
        } else {return null}
}

export default DateSelectButtons
