import * as core from "@actions/core";
import Holidays from "date-holidays";

async function main() {
  const rawDate = core.getInput("date", { required: true });
  const date = new Date(Date.parse(rawDate));
  const country = core.getInput("country", { required: true });
  const state = core.getInput("state");
  const region = core.getInput("region");
  const includeTypes = core.getInput("include-types").split(",");
  const encoding = core.getInput("result-encoding");

  const holidays = new Holidays(country, state, region);
  const holiday = (holidays.isHoliday(date) || []).filter((e) =>
    includeTypes.includes(e.type),
  );
  switch (encoding ? encoding : "json") {
    case "json":
      core.setOutput("result", JSON.stringify(holiday));
      break;
    case "bool":
      core.setOutput("result", holiday.length !== 0);
      break;
    default:
      throw new Error("Unsupported encoding type.");
  }
}

main().catch((e) => {
  core.setFailed(`Got an unhandled error. ${e}`);
});
