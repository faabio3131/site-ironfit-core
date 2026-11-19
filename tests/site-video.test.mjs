import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const styles = readFileSync('assets/site.css', 'utf8');
const demo = html.match(/<section class="sec dark iron-video-section" id="demo"[\s\S]*?<\/section>/)?.[0];

// Vídeo corrigido em 2026-11-18 (removida a repetição do bloco financeiro e
// adicionado o bloco de controle de acesso) e passado a hospedar localmente
// em assets/video/demo.mp4, em vez do CDN externo do Picsart.
test('commercial IRON home embeds the local demo video with a poster and manual playback', () => {
  assert.ok(demo, 'missing accessible #demo section');
  assert.match(demo, /aria-labelledby="iron-video-heading"/);
  assert.match(demo, /<video controls playsinline preload="none"/);
  assert.match(demo, /poster="assets\/img\/iron-fit\/treino.webp"/);
  assert.match(demo, /<source src="assets\/video\/demo\.mp4" type="video\/mp4">/);
  assert.doesNotMatch(demo, /gcdn\.picsart\.com/);
  assert.ok(existsSync('assets/video/demo.mp4'));
  assert.doesNotMatch(demo, /\sautoplay(?:\s|=|>)/);
});

test('commercial video is discoverable and responsive without affecting the SaaS entry', () => {
  assert.match(html, /<a href="#demo">Vídeo<\/a>/);
  assert.match(html, /https:\/\/app\.ironfitcore\.com\.br\/\?iniciar-teste=1/);
  assert.match(styles, /\.iron-video-frame video\{[^}]*aspect-ratio:16\/9/);
  assert.match(styles, /@media\(max-width:640px\)\{\.iron-video-section/);
});
