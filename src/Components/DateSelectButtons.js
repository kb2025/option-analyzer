import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import useTransformData from '../DataHandlers/useTransformData'
import { useSelectedDate } from '../Providers/SelectedDateProvider'

const DateSelectButtons = () => {
    const { expDates } = useTransformData()

    const { setSelectedDate } = useSelectedDate()

    if (expDates) {

        const handleChange = (date) => {
            setSelectedDate(date);
        }

        return (
            <ToggleButtonGroup type="radio" name="options" onChange={handleChange}>
                {expDates?.map((date, id) => {
                    if(date.split('-').pop().split('-').pop().split(':')[1]){
                    return (
                        <ToggleButton className='btn-sm text-center m-1 p-1 rounded' variant='outline-light' key={id} id={id} value={date}>
                            <strong>
                            {date.split('-').pop().split('-').pop().split(':')[0]}
                            </strong>
                        </ToggleButton>
                    )}else{return null}
                })}
            </ToggleButtonGroup>
        )
    } else { return null }

}

export default DateSelectButtons
