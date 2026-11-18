import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const styles = readFileSync('assets/site.css', 'utf8');
const demo = html.match(/<section class="sec dark iron-video-section" id="demo"[\s\S]*?<\/section>/)?.[0];

test('commercial IRON home embeds the supplied public video with a poster and manual playback', () => {
  assert.ok(demo, 'missing accessible #demo section');
  assert.match(demo, /aria-labelledby="iron-video-heading"/);
  assert.match(demo, /<video controls playsinline preload="none"/);
  assert.match(demo, /poster="assets\/img\/iron-fit\/treino.webp"/);
  assert.match(demo, /<source src="https:\/\/gcdn\.picsart\.com\/picsart-mcp\/21969df7-c943-496a-a359-b209b01b101d\.mp4" type="video\/mp4">/);
  assert.doesNotMatch(demo, /\sautoplay(?:\s|=|>)/);
});

test('commercial video is discoverable and responsive without affecting the SaaS entry', () => {
  assert.match(html, /<a href="#demo">Vídeo<\/a>/);
  assert.match(html, /https:\/\/app\.ironfitcore\.com\.br\/\?iniciar-teste=1/);
  assert.match(styles, /\.iron-video-frame video\{[^}]*aspect-ratio:16\/9/);
  assert.match(styles, /@media\(max-width:640px\)\{\.iron-video-section/);
});
