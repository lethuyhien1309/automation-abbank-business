import { test, expect } from '@playwright/test';
import { query, closeDb } from '../utils/db';

test.afterAll(async () => {
  await closeDb();
});

test('kết nối DB thành công', async () => {
  const rows = await query<{ ok: number }>(
    `SELECT *
     FROM APP_ACCESSCONTROL_PANDP_SERVICE.LEGAL_ENTITY le
     WHERE le.EXTERNAL_ID = :externalId`,
    { externalId: '13020962' },
  );
  console.log('Rows:', rows);
  expect(rows.length).toBeGreaterThan(0);
});