import * as core from "@actions/core";
import DaysOffAction from "./days-off.js";

async function main() {
  const rawDate = core.getInput("date", { required: true });
  const date = new Date(Date.parse(rawDate));
  const country = core.getInput("country", { required: true });
  const state = core.getInput("state");
  const region = core.getInput("region");
  const includeTypes = core.getInput("include-types").split(",");
  const weekend = core
    .getInput("weekend")
    .split(",")
    .map((e) => parseInt(e));
  const encoding = core.getInput("result-encoding");

  const dayOff = new DaysOffAction(
    country,
    state,
    region,
    includeTypes,
    weekend,
  ).execute(date);
  switch (encoding ? encoding : "json") {
    case "json":
      core.setOutput("result", JSON.stringify(dayOff));
      break;
    case "bool":
      core.setOutput("result", dayOff.length !== 0);
      break;
    default:
      throw new Error("Unsupported encoding type.");
  }
}

main().catch((e) => {
  core.setFailed(`Got an unhandled error. ${e}`);
});
