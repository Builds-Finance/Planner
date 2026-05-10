function generatePrompt() {

  const stock = document.getElementById("stock").value;
  const time = document.getElementById("time").value;
  const rsi = document.getElementById("rsi").value || "Not provided";
  const channel = document.getElementById("channel").value;
  const alignment = document.getElementById("alignment").value;
  const tradeType = document.getElementById("tradeType").value;

  const prompt = `
You are a STRICT rule-based trade validator.

RULEBOOK (NON-NEGOTIABLE – v1):
- No trade before 10:00 AM
- Buy trades allowed only until 10:55 AM
- Channel break valid only after 15-min candle close
- Bollinger Band + Pivot alignment mandatory
- Missing even one confirmation = NO TRADE
- False breakout must be ruled out
- No emotional or early averaging

TASK:
Evaluate the trade context strictly using the rules.
DO NOT suggest trades.
DO NOT predict price.
DO NOT override rules.

TRADE CONTEXT:
Stock: ${stock}
Time: ${time}
RSI (15-min): ${rsi}
Channel Break Status: ${channel}
Bollinger + Pivot Aligned: ${alignment}
Trade Type Considered: ${tradeType}

Return verdict ONLY in this format:

TRADE STATUS: (YES / NO)
DIRECTION BIAS: (Bullish / Bearish / Neutral)
BLOCKING RULES:
- (list)
NEXT ACTION:
`;

  document.getElementById("output").value = prompt;
  navigator.clipboard.writeText(prompt);
  alert("Prompt copied. Paste into ChatGPT with chart.");
}
