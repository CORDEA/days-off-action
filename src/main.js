import * as core from "@actions/core";

async function main() {
    const rawDate = core.getInput("date", {required: true});
    const date = new Date(Date.parse(rawDate));
    const country = core.getInput("country", {required: true});
    const state = core.getInput("state");
    const region = core.getInput("region");
    const includeTypes = core.getInput("include-types").split(",");
    const encoding = core.getInput("result-encoding");
}

main().catch((e) => {
    core.setFailed(`Got an unhandled error. ${e}`);
});
