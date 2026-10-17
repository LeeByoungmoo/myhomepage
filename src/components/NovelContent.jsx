import React from 'react';

// 인라인 서식 파서 (**bold**, *italic/sound/thought*)
function parseInlineFormatting(text) {
  if (!text) return text;
  
  const parts = [];
  let lastIndex = 0;
  const regex = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // **bold**
      parts.push(
        <strong key={key++} className="novel-bold" style={{ color: '#ffffff', fontWeight: 700 }}>
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // *italic / 효과음 / 내면 독백*
      parts.push(
        <em key={key++} className="novel-emphasis">
          {match[4]}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

const NovelContent = ({ rawText }) => {
  if (!rawText) return null;

  // 줄 단위 분리 및 단락 구성
  const lines = rawText.split('\n');
  const renderedElements = [];
  let paragraphBuffer = [];
  let keyIndex = 0;

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const paragraphText = paragraphBuffer.join(' ').trim();
      if (paragraphText) {
        renderedElements.push(
          <p key={`p-${keyIndex++}`} className="novel-paragraph">
            {parseInlineFormatting(paragraphText)}
          </p>
        );
      }
      paragraphBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // 1. 빈 줄 -> 단락 종료
    if (!line) {
      flushParagraph();
      continue;
    }

    // 2. 장면 전환선 (Scene Break: *** or --- or * * *)
    if (line === '***' || line === '---' || line === '* * *' || line === '*** ') {
      flushParagraph();
      renderedElements.push(
        <div key={`divider-${keyIndex++}`} className="novel-scene-break">
          <span>✦ ✦ ✦</span>
        </div>
      );
      continue;
    }

    // 3. 마크다운 제목 태그 (# or ##)
    if (line.startsWith('# ')) {
      flushParagraph();
      renderedElements.push(
        <h2 key={`h1-${keyIndex++}`} className="novel-heading-1">
          {parseInlineFormatting(line.replace(/^#\s+/, ''))}
        </h2>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      renderedElements.push(
        <h3 key={`h2-${keyIndex++}`} className="novel-heading-2">
          {parseInlineFormatting(line.replace(/^##\s+/, ''))}
        </h3>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      renderedElements.push(
        <h4 key={`h3-${keyIndex++}`} className="novel-heading-3">
          {parseInlineFormatting(line.replace(/^###\s+/, ''))}
        </h4>
      );
      continue;
    }

    // 4. 일반 본문 문장 (각 줄을 독립 단락으로 렌더링하여 단일 줄바꿈 대사 병합 방지)
    flushParagraph();
    renderedElements.push(
      <p key={`p-${keyIndex++}`} className="novel-paragraph">
        {parseInlineFormatting(line)}
      </p>
    );
  }

  // 마지막 남은 단락 출력
  flushParagraph();

  return <div className="novel-content-wrapper">{renderedElements}</div>;
};

export default NovelContent;
