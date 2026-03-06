import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Setup the AI with your key
const API_KEY = "YOUR_GEMINI_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

async function analyzePatientRisk() {
    const rawText = document.getElementById("patientText").value;
    const resultArea = document.getElementById("resultArea");
    const riskDisplay = document.getElementById("riskLevel");

    if (!rawText) return alert("Please enter notes!");

    // Show loading state
    resultArea.style.display = "block";
    riskDisplay.innerText = "Gemini is analyzing...";

    try {
        // 2. Talk to the AI
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Analyze these medical notes: "${rawText}". Give a Risk Level (Low/Med/High) and a 1-sentence reason.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        // 3. Show the result on screen
        riskDisplay.innerText = response.text();

        // NEXT STEP: Save this to Firebase here!
        saveToFirebase(rawText, response.text());

    } catch (error) {
        riskDisplay.innerText = "Error: " + error.message;
    }
}

// Attach the function to the window so the button can see it
window.analyzePatientRisk = analyzePatientRisk;