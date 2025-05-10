import { test as base, mergeTests, request } from '@playwright/test';
import { test as pageObjectFixture } from './page-object-fixture';

const test = mergeTests(pageObjectFixture);

const expect = base.expect;
export { test, expect, request };
