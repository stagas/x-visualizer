/** @jsxImportSource sigl */
import $ from 'sigl'

import { VisualizerElement } from '..'

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

  const audioBuffer = await fetchAudioBuffer(ctx, './example/alpha_molecule.ogg')
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
