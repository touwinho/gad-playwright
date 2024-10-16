import {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult
} from '@playwright/test/reporter';

class CustomReporter implements Reporter {
  private totalTests: number = 0;
  private completedTests: number = 0;
  private passedTests: number = 0;
  private failedTests: number = 0;
  private skippedTests: number = 0;
  private barLength: number = 20;

  onBegin(config: FullConfig, suite: Suite): void {
    this.totalTests = suite.allTests().length;
    if (this.totalTests === 0) {
      process.stdout.write(`🏁 No tests to run.\n`);
    } else {
      process.stdout.write(
        `🚀 Starting tests: ${this.totalTests} tests to run\n`
      );
    }
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    if (this.totalTests === 0) return;

    this.completedTests++;

    const statusIcon =
      result.status === 'passed'
        ? '✅'
        : result.status === 'failed'
          ? '❌'
          : result.status === 'skipped'
            ? '⏩️'
            : '❓';

    if (result.status === 'passed') {
      this.passedTests++;
    } else if (result.status === 'failed') {
      this.failedTests++;
    } else if (result.status === 'skipped') {
      this.skippedTests++;
    }

    this.updateProgress(statusIcon);
  }

  updateProgress(statusIcon: string) {
    const progressPercentage = this.completedTests / this.totalTests;
    const completedBarLength = Math.floor(this.barLength * progressPercentage);
    const bar =
      '█'.repeat(completedBarLength) +
      ' '.repeat(this.barLength - completedBarLength);
    const percentage = Math.floor(progressPercentage * 100);

    const progress = `${statusIcon} Tests completed: ${this.completedTests}/${this.totalTests} [${bar}] ${percentage}%`;
    process.stdout.write(`\r${progress}`);
  }

  onEnd(): void {
    console.log('\n🏁 All tests finished.');

    console.log(`📝 Total tests: ${this.totalTests}`);
    console.log(`\t✅ Passed: ${this.passedTests}`);
    console.log(`\t❌ Failed: ${this.failedTests}`);
    console.log(`\t⏩️ Skipped: ${this.skippedTests}`);
  }
}

export default CustomReporter;
