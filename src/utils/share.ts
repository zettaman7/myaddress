interface PlaceInfo {
  alias?: string
  name: string
  address: string
}

export async function sharePlace({ alias, name, address }: PlaceInfo) {
  const mapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`
  const text = [
    alias ? `@${alias}` : '',
    `장소명: ${name}`,
    `주소: ${address}`,
    '',
    `📍 지도 보기: ${mapUrl}`,
  ].filter(Boolean).join('\n')

  if (navigator.share) {
    try {
      await navigator.share({ title: alias ?? name, text })
    } catch {
      // user cancelled — ignore
    }
  } else {
    await navigator.clipboard.writeText(text)
    alert('클립보드에 복사되었습니다.')
  }
}
