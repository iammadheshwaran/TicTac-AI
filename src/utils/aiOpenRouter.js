// utils/aiOpenRouter.js
export const getAIMoverFromOpenRouter = async (board) => {
  const systemPrompt = `You are a smart Tic Tac Toe AI playing as "O".
Follow these rules strictly:
1. Win immediately if possible.
2. Block "X" if they are about to win.
3. Otherwise: choose center > corner > side.
Return ONLY one number (0–8), nothing else.`;

  const userPrompt = `Current board state:
${board.map((cell, i) => (cell === null ? i : cell)).join(" | ")}

Board layout:
[0][1][2]
[3][4][5]
[6][7][8]

"O" = you (AI)
"X" = human
Number = empty cell index

What is your move? (Return only the number)`;

  const getMoveFromModel = async () => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`, // From .env
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // You can change to deepseek/deepseek-r1, etc.
        temperature: 0,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    const data = await response.json();
    console.log("API Response:", data);

    if (data.error) {
      throw new Error(data.error.message);
    }

    const text = data.choices?.[0]?.message?.content?.trim();
    console.log("AI raw text:", text);

    const match = text?.match(/\d+/);
    let move = match ? parseInt(match[0], 10) : null;

    // Fallback: choose a random empty spot if AI returns invalid
    if (move === null || board[move] !== null) {
      const emptyCells = board
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);
      move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    return move;
  };

  try {
    return await getMoveFromModel();
  } catch (err) {
    console.error("AI Error:", err);

    // Backup priority order if AI fails
    const preferredOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];
    return preferredOrder.find(i => board[i] === null) ?? null;
  }
};
