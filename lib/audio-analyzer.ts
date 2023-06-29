export class AudioAnalyzer {
  audioContext: AudioContext
  analyserNode: AnalyserNode
  audioSourceNode: MediaElementAudioSourceNode

  constructor(audioElement: HTMLAudioElement) {
    this.audioContext = new AudioContext()
    this.analyserNode = this.audioContext.createAnalyser()
    this.audioSourceNode =
      this.audioContext.createMediaElementSource(audioElement)

    // FIXME: Parameterize these values
    this.analyserNode.minDecibels = -70 // -60
    this.analyserNode.smoothingTimeConstant = 0.75 // 0.85
    this.analyserNode.fftSize = 256 // 512

    this.audioSourceNode.connect(this.analyserNode)
    this.audioSourceNode.connect(this.audioContext.destination)
  }

  getFFT(): Uint8Array {
    const data = new Uint8Array(this.analyserNode.frequencyBinCount)
    this.analyserNode.getByteFrequencyData(data)
    return data
  }
}
