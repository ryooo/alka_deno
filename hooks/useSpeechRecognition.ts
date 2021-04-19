
export const useSpeechRecognition = () => {
    const SpeechRecognition = webkitSpeechRecognition
    const SpeechGrammarList = webkitSpeechGrammarList
    const rec = new SpeechRecognition()
    rec.continuous = false
    rec.interimResults = false
    rec.lang = "ja-JP"
    rec.maxAlternatives = 5

    const grammar = "#JSGF V1.0; grammar numbers; public <numbers> = 1 | 2 | 3 | 4 | 5;"
    const speechRecognitionList = new SpeechGrammarList()
    speechRecognitionList.addFromString(grammar, 1)
    rec.grammars = speechRecognitionList

    rec.start()
    return rec
}