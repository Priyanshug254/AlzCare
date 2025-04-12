export async function POST(req) {
    const { message } = await req.json();
  
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: message }],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
  
      console.log("Gemini API response:", data); // <- Add this line
  
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";
  
      return Response.json({ response: reply });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return Response.json({ response: "Something went wrong." });
    }
  }
  