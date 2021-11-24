import {Octokit} from "@octokit/rest";
import semver, {SemVer} from "semver";
import {exec, cd} from "shelljs";
import * as fs from "fs";

const octokit = new Octokit({auth: process.env.GITHUB_TOKEN});

function sh(command: string) {
    console.log(command);
    exec(command);
}

async function getReleaseBuckets(owner: string, repo: string) {
    const releasesResponse = await octokit.rest.repos.listReleases({owner, repo, per_page: 100});
    const releases = releasesResponse.data.filter((x) => !x.prerelease && semver.satisfies(x.tag_name, ">=1.18.0"));

    let releaseBuckets: {[key: string]: {version: SemVer; release: typeof releases[0]}} = {};

    for (let release of releases) {
        const version = semver.parse(release.tag_name);
        if (!version) continue;

        const bucket = `${version?.major}.${version?.minor}`;
        if (!releaseBuckets[bucket]) {
            releaseBuckets[bucket] = {version, release};
        } else {
            if (semver.gt(version, releaseBuckets[bucket].version)) {
                releaseBuckets[bucket] = {version, release};
            }
        }
    }

    return releaseBuckets;
}

async function main() {
    const forceRelease = process.argv.includes("--force");

    const kubernetesReleases = await getReleaseBuckets("kubernetes", "kubernetes");
    const kubernateReleases = await getReleaseBuckets("laurci", "kubernate");

    async function doRelease() {
        const currentKubernateVersion = "1.19.13";

        const nextKubernateVersion = semver.inc(currentKubernateVersion, "patch")!;
        const nextKubernateReleaseName = `v${nextKubernateVersion} for Kubernetes ${currentKubernateVersion}`;

        console.log("will release", nextKubernateVersion, nextKubernateReleaseName);

        sh(`yarn run schema:generate ${currentKubernateVersion}`);
        sh(`KUBERNATE_VERSION="${nextKubernateVersion}" yarn run build`);

        sh(`yarn config:generate`);
    }

    await doRelease();
}

main().catch(console.error);
