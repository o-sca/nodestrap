const automaticCommitPattern = /^chore\(release\):.*\[skip ci]/;

/**
 * @type {import('@commitlint/types').UserConfig}
 */
export default {
	extends: ['@commitlint/config-conventional'],
	ignores: [(commitMsg) => automaticCommitPattern.test(commitMsg)],
};
