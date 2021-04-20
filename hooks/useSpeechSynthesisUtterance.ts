
export const useSpeechSynthesisUtterance = (text: string, callback: () => void): void => {
    const u = new SpeechSynthesisUtterance()
    const voice = speechSynthesis.getVoices()
    u.voice = voice.find((v) => { v.lang == "ja-JP" })
    u.text = text
    u.lang = "ja-JP"
    u.rate = 1.0
    speechSynthesis.speak(u)
    console.log("speaking: " + text)
    u.addEventListener("end", callback)
}