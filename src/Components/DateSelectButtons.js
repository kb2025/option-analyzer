import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap'
import useTransformData from '../DataHandlers/useTransformData'
import { useSelectedDate } from '../Providers/SelectedDateProvider'

const DateSelectButtons = () => {
    const { expDates } = useTransformData()

    const { selectedDate, setSelectedDate } = useSelectedDate()

    if (expDates) {

        const handleChange = (date) => {
            setSelectedDate(date);
        }

        return (
            <ToggleButtonGroup type="radio" name="options" onChange={handleChange}>
                {expDates?.map((date, id) => {
                    return (
                        <ToggleButton className='btn-sm outline-light text-center p-2 rounded' variant='outline-light' key={id} id={id} value={date}>
                            <strong>
                            {date.split('-').pop().split('-').pop().split(':')[0]}
                            </strong>
                        </ToggleButton>
                    )
                })}
            </ToggleButtonGroup>
        )
    } else { return null }

}

export default DateSelectButtons
