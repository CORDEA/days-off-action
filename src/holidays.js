import Holidays from "date-holidays";

class HolidaysAction {
  constructor(country, state, region, includeTypes, weekend) {
    this.holidays = new Holidays(country, state, region);
    this.includeTypes = includeTypes;
    this.weekend = weekend;
  }

  execute(date) {
    const holidays = (this.holidays.isHoliday(date) || []).filter((e) =>
      this.includeTypes.includes(e.type),
    );
    if (this.weekend.includes(date.getDay())) {
      holidays.push({
        name: "User defined weekend",
        type: "weekend",
      });
    }
    return holidays;
  }
}

export default HolidaysAction;
