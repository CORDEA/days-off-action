import * as core from "@actions/core";
import HolidaysAction from "./holidays.js";

async function main() {
  const rawDate = core.getInput("date", { required: true });
  const date = new Date(Date.parse(rawDate));
  const country = core.getInput("country", { required: true });
  const state = core.getInput("state");
  const region = core.getInput("region");
  const includeTypes = core.getInput("include-types").split(",");
  const encoding = core.getInput("result-encoding");

  const holiday = new HolidaysAction(
    country,
    state,
    region,
    includeTypes,
  ).execute(date);
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
