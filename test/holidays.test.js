import HolidaysAction from "../src/holidays";
import Holidays from "date-holidays";
import * as assert from "assert";

describe("HolidaysAction#execute", () => {
  it("New Year's Day - public only", () => {
    const date = new Date("2020-01-01T12:00:00.000Z");
    const result = new HolidaysAction("US", "", "", ["public"]).execute(date);
    const expected = new Holidays("US").isHoliday(date);

    assert.deepEqual(result, expected);
  });

  it("New Year's Eve - public only", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    const result = new HolidaysAction("US", "", "", ["public"]).execute(date);

    assert.equal(result.length, 0);
  });

  it("New Year's Eve - observance only", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    const result = new HolidaysAction("US", "", "", ["observance"]).execute(
      date,
    );

    assert.equal(result.length, 1);
  });

  it("Independence Day - US", () => {
    const date = new Date("2020-07-04T12:00:00.000Z");
    const result = new HolidaysAction("US", "", "", ["public"]).execute(date);

    assert.equal(result.length, 1);
  });

  it("Independence Day - JP", () => {
    const date = new Date("2020-07-04T12:00:00.000Z");
    const result = new HolidaysAction("JP", "", "", ["public"]).execute(date);

    assert.equal(result.length, 0);
  });
});
