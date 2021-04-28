import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'

export async function run(...cmd: string[]) {
  const p = Deno.run({
    cmd,
    stdout: 'piped',
    stderr: 'inherit'
  })
  const output = await p.output()
  p.close()
  return new TextDecoder().decode(output)
}

export function charToAnsers(num) {
  let ansers = charToAnsersUnder99(num)
  return ansers
}

export function charToAnsersUnder99(num) {
  const first = Math.floor(num / 1) % 10
  const firstAnsers = charToAnsersUner9(first)
  if (num < 10) return firstAnsers

  const second = Math.floor(num / 10) % 10
  let secondAnsers = []
  ld.forEach(charToAnsersUner9(second), (ans) => {
    secondAnsers = secondAnsers.concat([ans + "ジュウ", ans + "ジュー"])
  })

  if (first == 0) {
    return secondAnsers.concat([num + ""])
  }

  return ld.flatten(ld.map(firstAnsers, (firstAnser) => {
    return ld.map(secondAnsers, (secondAnser) => {
      return secondAnser + firstAnser
    })
  })).concat([num + ""])
}

export function charToAnsersUner9(num) {
  let ansers = []
  if (num === 0) {
    ansers.push("ゼロ")
  } else if (num === 1) {
    ansers.push("イチ")
  } else if (num === 2) {
    ansers.push("ニ", "ニー")
  } else if (num === 3) {
    ansers.push("サン")
  } else if (num === 4) {
    ansers.push("ヨン", "シー")
  } else if (num === 5) {
    ansers.push("ゴ", "ゴー")
  } else if (num === 6) {
    ansers.push("ロク")
  } else if (num === 7) {
    ansers.push("ナナ", "シチ")
  } else if (num === 8) {
    ansers.push("ハチ")
  } else if (num === 9) {
    ansers.push("キュウ", "キュ", "キュー")
  }
  ansers.push(num + "")
  return ansers
}

export function kanaToHira(str) {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    var chr = match.charCodeAt(0) - 0x60
    return String.fromCharCode(chr)
  })
}

export function hiraToKana(str) {
  return str.replace(/[\u3041-\u3096]/g, function (match) {
    var chr = match.charCodeAt(0) + 0x60
    return String.fromCharCode(chr)
  })
}
