import { useState, useRef, useEffect } from 'react';
import styles from './DateRangePicker.module.scss';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStartMonth, setCurrentStartMonth] = useState(() => {
    return startDate ? new Date(startDate) : new Date();
  });
  const [currentEndMonth, setCurrentEndMonth] = useState(() => {
    if (endDate) return new Date(endDate);
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  });
  const [selectingStart, setSelectingStart] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplayDate = () => {
    if (!startDate && !endDate) return 'дд.мм.гггг - дд.мм.гггг';

    const formatDate = (date: string) => {
      if (!date) return 'дд.мм.гггг';
      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const handleDateSelect = (date: string) => {
    if (selectingStart) {
      onChange('', '');  
      setSelectingStart(false);
      onChange(date, '');
    } else {
      const startDateTime = new Date(startDate).getTime();
      const selectedDateTime = new Date(date).getTime();

      if (selectedDateTime < startDateTime) {
        onChange(date, startDate);
      } else {
        onChange(startDate, date);
      }
      setSelectingStart(true);
      setIsOpen(false);
    }
  };

  const navigateMonth = (monthDate: Date, direction: 'prev' | 'next'): Date => {
    const newDate = new Date(monthDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    return newDate;
  };

  const handleStartMonthNavigation = (direction: 'prev' | 'next') => {
    const newStartMonth = navigateMonth(currentStartMonth, direction);
    setCurrentStartMonth(newStartMonth);

    if (
      newStartMonth.getMonth() === currentEndMonth.getMonth() &&
      newStartMonth.getFullYear() === currentEndMonth.getFullYear()
    ) {
      setCurrentEndMonth(navigateMonth(newStartMonth, 'next'));
    }
  };

  const handleEndMonthNavigation = (direction: 'prev' | 'next') => {
    const newEndMonth = navigateMonth(currentEndMonth, direction);
    setCurrentEndMonth(newEndMonth);

    if (
      newEndMonth.getMonth() === currentStartMonth.getMonth() &&
      newEndMonth.getFullYear() === currentStartMonth.getFullYear()
    ) {
      setCurrentStartMonth(navigateMonth(newEndMonth, 'prev'));
    }
  };

  const generateCalendar = (baseDate: Date, isEndCalendar: boolean) => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayIndex = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weeks = [];
    let currentWeek = [];
    const monthStr = (month + 1).toString().padStart(2, '0');

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayIndex; i++) {
      currentWeek.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = `${year}-${monthStr}-${day.toString().padStart(2, '0')}`;
      const isToday = date.getTime() === today.getTime();
      const isSelected = dateStr === (selectingStart ? endDate : startDate);
      const isInRange = startDate && endDate && dateStr >= startDate && dateStr <= endDate;
      const isDisabled = isEndCalendar && startDate && dateStr < startDate;

      currentWeek.push({
        day,
        date: dateStr,
        isToday,
        isSelected,
        isInRange,
        isDisabled
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Add empty cells for remaining days
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    if (currentWeek.some(day => day !== null)) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const renderCalendar = (baseDate: Date, isEndCalendar: boolean) => {
    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const weeks = generateCalendar(baseDate, isEndCalendar);

    return (
      <div className={styles.calendar}>
        <div className={styles.header}>
          <button
            onClick={() => isEndCalendar
              ? handleEndMonthNavigation('prev')
              : handleStartMonthNavigation('prev')}
          >
            ←
          </button>
          <span>
            {monthNames[baseDate.getMonth()]} {baseDate.getFullYear()}
          </span>
          <button
            onClick={() => isEndCalendar
              ? handleEndMonthNavigation('next')
              : handleStartMonthNavigation('next')}
          >
            →
          </button>
        </div>
        <div className={styles.weekdays}>
          {dayNames.map(day => (
            <div key={day} className={styles.weekday}>{day}</div>
          ))}
        </div>
        <div className={styles.days}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.week}>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`${styles.day} ${
                    day?.isToday ? styles.today : ''
                  } ${day?.isSelected ? styles.selected : ''} ${
                    day?.isInRange ? styles.inRange : ''
                  } ${day?.isDisabled ? styles.disabled : ''}`}
                  onClick={() => day && !day.isDisabled && handleDateSelect(day.date)}
                >
                  {day?.day || ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.dateRangePicker}>
      <div
        className={styles.input}
        onClick={() => setIsOpen(!isOpen)}
      >
        {formatDisplayDate()}
      </div>
      {isOpen && (
        <div className={styles.popup} ref={popupRef}>
          <div className={styles.calendars}>
            {renderCalendar(currentStartMonth, false)}
            {renderCalendar(currentEndMonth, true)}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
