<h1>
x-visualizer <a href="https://npmjs.org/package/x-visualizer"><img src="https://img.shields.io/badge/npm-v0.0.1-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-113-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/x-visualizer@0.0.1/dist/x-visualizer.min.js"><img src="https://img.shields.io/badge/brotli-24.3K-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

Oscilloscope, spectrogram, spectrum, waveform audio visualizers.

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i x-visualizer </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add x-visualizer </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add x-visualizer</code>
</td></tr></table>
</h4>

## Examples

<details id="example$web" title="web" open><summary><span><a href="#example$web">#</a></span>  <code><strong>web</strong></code></summary>  <ul>    <details id="source$web" title="web source code" ><summary><span><a href="#source$web">#</a></span>  <code><strong>view source</strong></code></summary>  <a href="example/web.tsx">example/web.tsx</a>  <p>

```tsx
/** @jsxImportSource sigl */
import $ from 'sigl'

import { VisualizerElement } from 'x-visualizer'

const ctx = new AudioContext({ sampleRate: 44100, latencyHint: 'playback' })

interface AppElement extends $.Element<AppElement> {}

@$.element()
class AppElement extends HTMLElement {
  input?: AudioNode
  Visualizer = $.element(VisualizerElement)
  visualizer?: VisualizerElement
  mounted($: AppElement['$']) {
    $.render(({ Visualizer, input }) => (
      <div
        onpointerdown={$.event.stop(function() {
          console.log('cycle')
          $.ref.visualizer?.current?.cycle()
        })}
      >
        <style>
          {/*css*/ `
          div {
            width: 300px;
            height: 150px;
          }
        `}
        </style>
        <Visualizer
          ref={$.ref.visualizer}
          input={input}
          kind="oscilloscope"
        />
      </div>
    ))
  }
}

const App = $.element(AppElement)

const fetchAudioBuffer = async (audio: AudioContext, url: string) => {
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()
  const audioBuffer = await audio.decodeAudioData(arrayBuffer)
  return audioBuffer
}

let playing = false
let source: AudioBufferSourceNode
const toggle = async () => {
  window.onclick = null
  if (playing) {
    ctx.suspend()
    playing = false
    console.log('stopped')
    return
  }

  ctx.resume()
  playing = true
  if (source) return

  const audioBuffer = await fetchAudioBuffer(
    ctx,
    './example/alpha_molecule.ogg'
  )
  source = ctx.createBufferSource()
  source.buffer = audioBuffer
  source.loop = true
  source.connect(ctx.destination)
  source.start(0, 33)

  // for (let i = 0; i < 1; i++) {
  $.render(<App input={source} />, document.body)
  console.log('rendered')
  // }

  // const osc = ctx.createOscillator()
  // osc.frequency.value = 40
  // osc.type = 'sine'
  // osc.start()
  // osc.connect(analyser)

  // const noise = ctx.createScriptProcessor(512, 1, 1)
  // noise.onaudioprocess = e => {
  //   const output = e.outputBuffer.getChannelData(0)
  //   for (let i = 0; i < output.length; i++)
  //     output[i] = Math.random() * 2 - 1
  // }
  // noise.connect(analyser)

  // spectrogram.current!.analyser = analyser
  console.log('playing')
  // setTimeout(() => {
  //   analyser.fftSize = 16384 * 2
  //   waveform.current!.analyser = null
  //   waveform.current!.analyser = analyser
  // }, 1000)
}

// window.onclick = toggle
toggle()
```

</p>
</details></ul></details>

## API

<p>  <details id="VisualizerElement$2" title="Class" open><summary><span><a href="#VisualizerElement$2">#</a></span>  <code><strong>VisualizerElement</strong></code>    </summary>  <a href="src/x-visualizer.tsx#L16">src/x-visualizer.tsx#L16</a>  <ul>        <p>  <details id="constructor$11" title="Constructor" ><summary><span><a href="#constructor$11">#</a></span>  <code><strong>constructor</strong></code><em>()</em>    </summary>    <ul>    <p>  <details id="new VisualizerElement$12" title="ConstructorSignature" ><summary><span><a href="#new VisualizerElement$12">#</a></span>  <code><strong>new VisualizerElement</strong></code><em>()</em>    </summary>    <ul><p><a href="#VisualizerElement$2">VisualizerElement</a></p>        </ul></details></p>    </ul></details><details id="analyser$27" title="Property" ><summary><span><a href="#analyser$27">#</a></span>  <code><strong>analyser</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>false</code></span>  </summary>  <a href="src/x-visualizer.tsx#L68">src/x-visualizer.tsx#L68</a>  <ul><p><code>false</code> | <span>AnalyserNode</span></p>        </ul></details><details id="autoResize$15" title="Property" ><summary><span><a href="#autoResize$15">#</a></span>  <code><strong>autoResize</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>true</code></span>  </summary>  <a href="src/x-visualizer.tsx#L31">src/x-visualizer.tsx#L31</a>  <ul><p>boolean</p>        </ul></details><details id="background$16" title="Property" ><summary><span><a href="#background$16">#</a></span>  <code><strong>background</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'#123'</code></span>  </summary>  <a href="src/x-visualizer.tsx#L32">src/x-visualizer.tsx#L32</a>  <ul><p>string</p>        </ul></details><details id="color$17" title="Property" ><summary><span><a href="#color$17">#</a></span>  <code><strong>color</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>'#1ff'</code></span>  </summary>  <a href="src/x-visualizer.tsx#L33">src/x-visualizer.tsx#L33</a>  <ul><p>string</p>        </ul></details><details id="cycle$25" title="Property" ><summary><span><a href="#cycle$25">#</a></span>  <code><strong>cycle</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-visualizer.tsx#L48">src/x-visualizer.tsx#L48</a>  <ul><p><span>Fn</span>&lt;[    ], void&gt;</p>        </ul></details><details id="disabled$14" title="Property" ><summary><span><a href="#disabled$14">#</a></span>  <code><strong>disabled</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>false</code></span>  </summary>  <a href="src/x-visualizer.tsx#L29">src/x-visualizer.tsx#L29</a>  <ul><p>boolean</p>        </ul></details><details id="height$18" title="Property" ><summary><span><a href="#height$18">#</a></span>  <code><strong>height</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>50</code></span>  </summary>  <a href="src/x-visualizer.tsx#L34">src/x-visualizer.tsx#L34</a>  <ul><p>number</p>        </ul></details><details id="input$26" title="Property" ><summary><span><a href="#input$26">#</a></span>  <code><strong>input</strong></code>    </summary>  <a href="src/x-visualizer.tsx#L67">src/x-visualizer.tsx#L67</a>  <ul><p><code>null</code> | <span>AudioNode</span></p>        </ul></details><details id="kind$13" title="Property" ><summary><span><a href="#kind$13">#</a></span>  <code><strong>kind</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-visualizer.tsx#L28">src/x-visualizer.tsx#L28</a>  <ul><p><a href="#VisualizerKind$1">VisualizerKind</a></p>        </ul></details><details id="onmounted$40" title="Property" ><summary><span><a href="#onmounted$40">#</a></span>  <code><strong>onmounted</strong></code>    </summary>    <ul><p><span>EventHandler</span>&lt;<a href="#VisualizerElement$2">VisualizerElement</a>, <span>CustomEvent</span>&lt;any&gt;&gt;</p>        </ul></details><details id="onunmounted$41" title="Property" ><summary><span><a href="#onunmounted$41">#</a></span>  <code><strong>onunmounted</strong></code>    </summary>    <ul><p><span>EventHandler</span>&lt;<a href="#VisualizerElement$2">VisualizerElement</a>, <span>CustomEvent</span>&lt;any&gt;&gt;</p>        </ul></details><details id="oscilloscope$21" title="Property" ><summary><span><a href="#oscilloscope$21">#</a></span>  <code><strong>oscilloscope</strong></code>    </summary>  <a href="src/x-visualizer.tsx#L43">src/x-visualizer.tsx#L43</a>  <ul><p><span>OscilloscopeElement</span></p>        </ul></details><details id="spectrogram$22" title="Property" ><summary><span><a href="#spectrogram$22">#</a></span>  <code><strong>spectrogram</strong></code>    </summary>  <a href="src/x-visualizer.tsx#L44">src/x-visualizer.tsx#L44</a>  <ul><p><span>SpectrogramElement</span></p>        </ul></details><details id="spectrum$23" title="Property" ><summary><span><a href="#spectrum$23">#</a></span>  <code><strong>spectrum</strong></code>    </summary>  <a href="src/x-visualizer.tsx#L45">src/x-visualizer.tsx#L45</a>  <ul><p><span>SpectrumElement</span></p>        </ul></details><details id="visualizer$20" title="Property" ><summary><span><a href="#visualizer$20">#</a></span>  <code><strong>visualizer</strong></code>    </summary>  <a href="src/x-visualizer.tsx#L38">src/x-visualizer.tsx#L38</a>  <ul><p><span>OscilloscopeElement</span> | <span>SpectrogramElement</span> | <span>SpectrumElement</span> | <span>WaveformElement</span></p>        </ul></details><details id="waveform$24" title="Property" ><summary><span><a href="#waveform$24">#</a></span>  <code><strong>waveform</strong></code>    </summary>  <a href="src/x-visualizer.tsx#L46">src/x-visualizer.tsx#L46</a>  <ul><p><span>WaveformElement</span></p>        </ul></details><details id="width$19" title="Property" ><summary><span><a href="#width$19">#</a></span>  <code><strong>width</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>150</code></span>  </summary>  <a href="src/x-visualizer.tsx#L35">src/x-visualizer.tsx#L35</a>  <ul><p>number</p>        </ul></details><details id="visualizers$3" title="Property" ><summary><span><a href="#visualizers$3">#</a></span>  <code><strong>visualizers</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-visualizer.tsx#L17">src/x-visualizer.tsx#L17</a>  <ul><p>{<p>  <details id="oscilloscope$5" title="Property" ><summary><span><a href="#oscilloscope$5">#</a></span>  <code><strong>oscilloscope</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>    <ul><p><span>Component</span>&lt;<span>OscilloscopeElement</span>, <span>HTMLElement</span>&gt;</p>        </ul></details><details id="spectrogram$6" title="Property" ><summary><span><a href="#spectrogram$6">#</a></span>  <code><strong>spectrogram</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>    <ul><p><span>Component</span>&lt;<span>SpectrogramElement</span>, <span>HTMLElement</span>&gt;</p>        </ul></details><details id="spectrum$7" title="Property" ><summary><span><a href="#spectrum$7">#</a></span>  <code><strong>spectrum</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>    <ul><p><span>Component</span>&lt;<span>SpectrumElement</span>, <span>HTMLElement</span>&gt;</p>        </ul></details><details id="waveform$8" title="Property" ><summary><span><a href="#waveform$8">#</a></span>  <code><strong>waveform</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>    <ul><p><span>Component</span>&lt;<span>WaveformElement</span>, <span>HTMLElement</span>&gt;</p>        </ul></details></p>}</p>        </ul></details><details id="kinds$9" title="Accessor" ><summary><span><a href="#kinds$9">#</a></span>  <code><strong>kinds</strong></code>    </summary>  <a href="src/x-visualizer.tsx#L24">src/x-visualizer.tsx#L24</a>  <ul>        </ul></details><details id="mounted$28" title="Method" ><summary><span><a href="#mounted$28">#</a></span>  <code><strong>mounted</strong></code><em>($)</em>    </summary>  <a href="src/x-visualizer.tsx#L70">src/x-visualizer.tsx#L70</a>  <ul>    <p>    <details id="$$30" title="Parameter" ><summary><span><a href="#$$30">#</a></span>  <code><strong>$</strong></code>    </summary>    <ul><p><span>Context</span>&lt;<a href="#VisualizerElement$2">VisualizerElement</a> &amp; <span>JsxContext</span>&lt;<a href="#VisualizerElement$2">VisualizerElement</a>&gt; &amp; <span>Omit</span>&lt;{<p>    <details id="ctor$34" title="Parameter" ><summary><span><a href="#ctor$34">#</a></span>  <code><strong>ctor</strong></code>    </summary>    <ul><p><span>Class</span>&lt;<a href="#T$33">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctor)</em>  &nbsp;=&gt;  <ul><span>CleanClass</span>&lt;<a href="#T$33">T</a>&gt;</ul></p>  <details id="ctx$38" title="Parameter" ><summary><span><a href="#ctx$38">#</a></span>  <code><strong>ctx</strong></code>    </summary>    <ul><p><a href="#T$37">T</a> | <span>Class</span>&lt;<a href="#T$37">T</a>&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>T</span>&gt;<em>(ctx)</em>  &nbsp;=&gt;  <ul><span>Wrapper</span>&lt;<a href="#T$37">T</a>&gt;</ul></p></p>} &amp; <span>__module</span> &amp; {}, <code>"transition"</code>&gt;&gt;</p>        </ul></details>  <p><strong>mounted</strong><em>($)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details></p></ul></details><details id="VisualizerKind$1" title="TypeAlias" open><summary><span><a href="#VisualizerKind$1">#</a></span>  <code><strong>VisualizerKind</strong></code>    </summary>  <a href="src/x-visualizer.tsx#L11">src/x-visualizer.tsx#L11</a>  <ul><p><code>"oscilloscope"</code> | <code>"spectrogram"</code> | <code>"spectrum"</code> | <code>"waveform"</code></p>        </ul></details></p>

## Credits

- [everyday-utils](https://npmjs.org/package/everyday-utils) by [stagas](https://github.com/stagas) &ndash; Everyday utilities
- [sigl](https://npmjs.org/package/sigl) by [stagas](https://github.com/stagas) &ndash; Web framework
- [x-oscilloscope](https://npmjs.org/package/x-oscilloscope) by [stagas](https://github.com/stagas) &ndash; Audio oscilloscope visualizer Web Component
- [x-spectrogram](https://npmjs.org/package/x-spectrogram) by [stagas](https://github.com/stagas) &ndash; Audio spectrogram Web Component.
- [x-spectrum](https://npmjs.org/package/x-spectrum) by [stagas](https://github.com/stagas) &ndash; Audio spectrum analyser Web Component
- [x-waveform](https://npmjs.org/package/x-waveform) by [stagas](https://github.com/stagas) &ndash; Audio waveform visualizer Web Component

## Contributing

[Fork](https://github.com/stagas/x-visualizer/fork) or [edit](https://github.dev/stagas/x-visualizer) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
