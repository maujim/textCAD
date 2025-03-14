const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function processCommand(command, selectedFace) {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Process this CAD model modification command: "${command}". Selected face: ${selectedFace}. 
                   Return a JSON response with the following structure:
                   {
                     "action": "add_hole" | "extrude" | "fillet" | etc,
                     "parameters": { ... action specific parameters ... },
                     "reasoning": "explanation of what will be done"
                   }`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to process command');
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    try {
      // Extract JSON from the response text
      const jsonStr = text.match(/\{[\s\S]*\}/)[0];
      return JSON.parse(jsonStr);
    } catch (e) {
      throw new Error('Failed to parse AI response');
    }
  } catch (error) {
    console.error('Error processing command:', error);
    throw error;
  }
}
