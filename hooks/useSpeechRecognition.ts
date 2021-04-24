import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'

export const waitForKuromojiWorker = async () => {
  await new Promise(function (resolve, reject) {
    if (window.kuromojiWorker) {
      return resolve()
    }
    const id = setInterval(() => {
      if (window.kuromojiWorker) {
        clearInterval(id)
        resolve()
      }
    }, 100)
  })
}

export const useSpeechRecognition = () => {
  const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  const SpeechGrammarList = window.webkitSpeechGrammarList || window.SpeechGrammarList
  const rec = new SpeechRecognition()
  rec.lang = "ja-JP"
  rec.interimResults = true
  rec.maxAlternatives = 5

  const grammar = "#JSGF V1.0; grammar numbers; public <numbers> = 1 | 2 | 3 | 4 | 5;"
  const speechRecognitionList = new SpeechGrammarList()
  speechRecognitionList.addFromString(grammar, 1)
  rec.grammars = speechRecognitionList
  rec.onresult = (e) => {
    ld.map(e.results, (arr) => {
      return ld.map(arr, (speechRecognitionAlternative) => {
        window.kuromojiWorker.postMessage({ str: speechRecognitionAlternative.transcript })
      })
    })
  }
  rec.onend = function (e) {
    rec.start()
  }
  rec.start()
  return rec
}
