const formatDateToString = (date: Date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = "" +d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (year.length === 1) year = "000"+year;

    return [year, month, day].join("-");
};

const formatDateTimeToStringWithDot = (dateStr: string) => {
    const curDate = new Date(dateStr);
    return curDate.toLocaleDateString('en-GB').split('/').join('.')+' '+curDate.toLocaleTimeString('en-GB');
}

const formatDateTimeToStringWithDotWithoutSeconds = (dateStr: string) => {
    const curDate = new Date(dateStr);
    return curDate.toLocaleDateString('en-GB').split('/').join('.')+' '+curDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'});
}

const formatDateToDisplayString = (date: Date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = "" +d.getFullYear();

    if (year==="1") return '';

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (year.length === 1) year = "000"+year;

    return [day, month, year].join(".");
};

const formatDateStringToDisplayString = (dateString: string) => {
    if (dateString === '0001-01-01T00:00:00') return "";
    return formatDateToDisplayString(new Date(dateString));
}

const formatDateToDisplayStringWithTime = (selectedDate: Date) => {
    const date = formatDateToDisplayString(selectedDate);
    const time = formatTimeStringFromString(selectedDate.toString());
    return `${date}  ${time}`//formatDateToDisplayString(new Date(dateString));
}

const formatTimeStringFromString = (dateString: string) => {
    const d = new Date(dateString);
    const hours = d.getHours().toString();
    const minutes = d.getMinutes().toString();
    return `${hours.length<2 ? "0"+hours : hours}:${minutes.length<2 ? "0"+minutes : minutes}`;
}

const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

const getFirstDayOfYear = (date: Date) => {
    return new Date(date.getFullYear(), 0, 1);
};

const getLastFewDays = (date: Date, days: number) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}


const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const formatDateToShowMonthYear = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

const formatDateToWeekRange = (dateStr: string) => {
    const startDate = new Date(dateStr);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    return `${startDate.getDate()} ${MONTHS[startDate.getMonth()]} ${startDate.getFullYear()} - ${endDate.getDate()} ${MONTHS[endDate.getMonth()]} ${endDate.getFullYear()}`;
}

const adjustDisabledDaysAfterTodayConsideringTime = (disableDaysAfterToday: number, time='0') => {
    if (time==='0' || disableDaysAfterToday === 0) {
        return disableDaysAfterToday;
    }
    const [hours, minutes] = time.split(':');

    const now = new Date();
    const timeZoneItaly = 'Europe/Rome';
    const timeFormat = Intl.DateTimeFormat('en-US', {
        timeZone: timeZoneItaly,
        hourCycle: 'h24',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    const timeItaly = timeFormat.format(now);

    const [curHours, curMinutes] = timeItaly.split(':');
    const isBeforeTime = (Number(curHours) < Number(hours) || (Number(curHours) === Number(hours) && Number(curMinutes) < Number(minutes)));

    return isBeforeTime ? disableDaysAfterToday : disableDaysAfterToday+1;
}

const addWorkingDays = (days: number, time='0') => {
    const result = new Date();

    const adjustedDays = adjustDisabledDaysAfterTodayConsideringTime(days, time);

    if (adjustedDays !== 0) {
        let count = 0;
        while (count < adjustedDays) {
            result.setDate(result.getDate() + 1);
            if (result.getDay() != 0 && result.getDay() != 6) // Skip weekends
                count++;
        }
    }

    return result;
}

export const addCurrentTimeToDate = (date: Date) => {
    const curDay = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), curDay.getHours(), curDay.getMinutes());
}

export const setTimeToDate = (date: Date, time: string) => {
    const [hours, minutes] = time ? time.split(':') : [0,0];
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), +hours, +minutes);
}

export const getMonthPresentation = (current: Date) => {
    const year = current.getFullYear();
    const month = MONTHS_LONG[current.getMonth()];

    return `${month} ${year}`;
}


export const generateMonths = (startDate: Date, endDate: Date): string[] => {
    const months: string[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, "0");
        const day = String(current.getDate()).padStart(2, "0");

        months.push(`${year}-${month}-${day}T00:00:00`);
        current.setMonth(current.getMonth() + 1);
    }

    return months;
};

export const areDatesEqual = (date1: Date, date2:Date) => date1.getTime() === date2.getTime();

export const getEndMonth = (date: Date) => {
    const month = date.getMonth();
    const month31 = [0,2,4,6,7,9,11];
    const month30 = [3,5,8,10];
    if (month31.includes(month)) {
        return new Date(date.getFullYear(), month, 31);
    } else if (month30.includes(month)) {
        return new Date(date.getFullYear(), month, 30);
    } else {
        //february
        if (date.getFullYear() % 4 === 0) {
            return new Date(date.getFullYear(), month, 29);
        } else {
            return new Date(date.getFullYear(), month, 28);
        }
    }
}

export {
    formatDateToString,
    formatDateTimeToStringWithDot,
    formatDateStringToDisplayString,
    getFirstDayOfMonth,
    formatDateToDisplayString,
    formatDateToDisplayStringWithTime,
    formatTimeStringFromString,
    getFirstDayOfYear,
    getLastFewDays,
    formatDateToShowMonthYear,
    formatDateToWeekRange,
    formatDateTimeToStringWithDotWithoutSeconds,
    addWorkingDays,

}