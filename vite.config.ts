export default {
  optimizeDeps: {
    exclude: ['x-spectrogram', 'x-waveform'],
  },
  server: {
    fs: {
      allow: ['/'],
    },
  },
}
