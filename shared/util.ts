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

export function number_to_ansers(num) {
  let ansers = [num]
  if (num === 1) {
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
    ansers.push("キュウ")
  } else if (num === 10) {
    ansers.push("ジュウ")
  }
  return ansers
}
