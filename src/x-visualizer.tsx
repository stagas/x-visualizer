/** @jsxImportSource sigl */
import $ from 'sigl'

import { keys } from 'everyday-utils'

import { OscilloscopeElement } from 'x-oscilloscope'
import { SpectrogramElement } from 'x-spectrogram'
import { SpectrumElement } from 'x-spectrum'
import { WaveformElement } from 'x-waveform'

export type VisualizerKind = 'oscilloscope' | 'spectrogram' | 'spectrum' | 'waveform'

export interface VisualizerElement extends $.Element<VisualizerElement> {}

@$.element()
export class VisualizerElement extends HTMLElement {
  static visualizers = {
    oscilloscope: $.element(OscilloscopeElement),
    spectrogram: $.element(SpectrogramElement),
    spectrum: $.element(SpectrumElement),
    waveform: $.element(WaveformElement),
  } as const

  static get kinds() {
    return keys(VisualizerElement.visualizers)
  }

  @$.attr.out() kind: VisualizerKind = $.String as VisualizerKind
  @$.attr.out() disabled = false

  @$.attr() autoResize = true
  @$.attr() background = '#123'
  @$.attr() color = '#1ff'
  @$.attr() height = 50
  @$.attr() width = 150

  // the active visualizer ref
  visualizer?: OscilloscopeElement | SpectrogramElement | SpectrumElement | WaveformElement

  // we keep refs to keep them in memory
  // so they don't lose what's drawn on the canvas
  // when they cycle
  oscilloscope?: OscilloscopeElement
  spectrogram?: SpectrogramElement
  spectrum?: SpectrumElement
  waveform?: WaveformElement

  cycle = $(this).callback(({ $, kind, disabled }) => (() => {
    const { kinds } = VisualizerElement
    if (disabled) {
      const newKind = VisualizerElement.kinds[0]
      //!? 'cycle visualizer', newKind
      $.kind = newKind
      $.disabled = false
    } else {
      const newKindIndex = kinds.indexOf(kind) + 1
      if (newKindIndex === kinds.length) {
        $.disabled = true
      } else {
        const newKind = VisualizerElement.kinds[newKindIndex]
        //!? 'cycle visualizer', newKind
        $.kind = newKind
      }
    }
  }))

  input?: AudioNode | null
  analyser: AnalyserNode | false = false

  mounted($: VisualizerElement['$']) {
    $.effect(({ spectrogram }) => () => spectrogram.destroy())
    $.effect(({ waveform }) => () => waveform.destroy())

    $.effect(({ input, disabled }) => {
      if (disabled) return

      const analyser = $.analyser = new AnalyserNode(
        input.context,
        {
          smoothingTimeConstant: 0,
          maxDecibels: 0,
          minDecibels: -100,
        }
      )

      input.connect(analyser)

      return () => {
        input.disconnect(analyser)
        analyser.disconnect()
        $.analyser = false
      }
    })

    $.effect(({ analyser, kind }) => {
      if (analyser === false) return

      switch (kind) {
        case 'oscilloscope':
          analyser.fftSize = 8192
          break
        case 'spectrum':
          analyser.fftSize = 16384
          break
        case 'spectrogram':
          analyser.fftSize = 4096
          break
        case 'waveform': {
          analyser.fftSize = 512
          break
        }
      }
      setTimeout(() => {
        $.ref.visualizer.current = $.ref[kind].current
      }, 10)
    })

    $.effect(({ visualizer, analyser: _ }) => (() => {
      visualizer.loop?.stop()
    }))

    $.effect(({ cycle, host }) => $.on(host).click.stop(cycle))

    $.render(({ analyser, autoResize, width, height, background, color, kind, disabled }) => {
      if (disabled) return <></>

      const Visualizer = VisualizerElement.visualizers[kind]
      return (
        <Visualizer
          ref={$.ref[kind]}
          analyser={analyser || void 0}
          autoResize={autoResize}
          width={width}
          height={height}
          background={background}
          divider={4}
          color={color}
        />
      )
    })
  }
}
