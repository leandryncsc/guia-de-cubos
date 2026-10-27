import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const config = JSON.parse(readFileSync(new URL('../capacitor.config.json', import.meta.url), 'utf8'));

test('Android shell loads the published Cubo Fácil origin', () => {
  assert.equal(config.server.url, 'https://cubotech.lovable.app');
});

test('Android shell rejects cleartext and mixed HTTP content', () => {
  assert.equal(config.server.cleartext, false);
  assert.equal(config.android.allowMixedContent, false);
});