import DaysOffAction from "../src/days-off";
import Holidays from "date-holidays";
import * as assert from "assert";

describe("DaysOffAction#execute", () => {
  it("New Year's Day - public only", () => {
    const date = new Date("2020-01-01T12:00:00.000Z");
    const result = new DaysOffAction("US", "", "", ["public"], []).execute(
      date,
    );
    const expected = new Holidays("US").isHoliday(date);

    assert.deepEqual(result, expected);
  });

  it("New Year's Eve - public only", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    const result = new DaysOffAction("US", "", "", ["public"], []).execute(
      date,
    );

    assert.equal(result.length, 0);
  });

  it("New Year's Eve - observance only", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    const result = new DaysOffAction("US", "", "", ["observance"], []).execute(
      date,
    );

    assert.equal(result.length, 1);
  });

  it("Independence Day - US", () => {
    const date = new Date("2020-07-04T04:00:00.000-08:00");
    const result = new DaysOffAction("US", "", "", ["public"], []).execute(
      date,
    );

    assert.equal(result.length, 1);
  });

  it("Independence Day - JP", () => {
    const date = new Date("2020-07-04T21:00:00.000+09:00");
    const result = new DaysOffAction("JP", "", "", ["public"], []).execute(
      date,
    );

    assert.equal(result.length, 0);
  });

  it("Saturday - matches weekend", () => {
    const date = new Date("2020-02-01T10:00:00.000+10:00");
    const result = new DaysOffAction("AU", "", "", [], [6]).execute(date);

    assert.equal(result.length, 1);
    assert.equal(result[0].type, "weekend");
  });

  it("Saturday - does not match weekend", () => {
    const date = new Date("2020-02-01T10:00:00.000+10:00");
    const result = new DaysOffAction("AU", "", "", ["public"], [0]).execute(
      date,
    );

    assert.equal(result.length, 0);
  });

  it("Labor Day & weekend", () => {
    const date = new Date("2020-09-07T12:00:00.000Z");
    const result = new DaysOffAction("US", "", "", ["public"], [1, 6]).execute(
      date,
    );

    assert.equal(result.length, 2);
    assert.equal(result[0].type, "public");
    assert.equal(result[1].type, "weekend");
  });
});
