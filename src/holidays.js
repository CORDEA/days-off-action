import Holidays from "date-holidays";

class HolidaysAction {
  constructor(country, state, region, includeTypes) {
    this.holidays = new Holidays(country, state, region);
    this.includeTypes = includeTypes;
  }

  execute(date) {
    return (this.holidays.isHoliday(date) || []).filter((e) =>
      this.includeTypes.includes(e.type),
    );
  }
}

export default HolidaysAction;
