const inputText = document.getElementById("inputText");
const summarizeBtn = document.getElementById("summarizeBtn");
const outputText = document.getElementById("outputText");

const API_URL = "/api/summarize";



summarizeBtn.addEventListener("click", async function () {

  const text = inputText.value;

  if (!text) {
    outputText.innerText = "Please enter text first.";
    return;
  }

  document.getElementById("loadingDots").style.display = "block";
outputText.innerText = "";

  summarizeBtn.disabled = true;

  try {

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "Summarize this clearly:\n\n" + text
          }
        ]
      })
    });

    const data = await response.json();

    console.log(data);

    const result = data.choices?.[0]?.message?.content;

    if (result) {

  document.getElementById("loadingDots").style.display = "none";

  outputText.style.opacity = "0";

  setTimeout(() => {
    outputText.innerText = result;
    outputText.style.opacity = "1";
  }, 200);

} else {

  document.getElementById("loadingDots").style.display = "none";

  outputText.innerText = "No AI response received.";

}

  } catch (error) {
    console.log(error);
    document.getElementById("loadingDots").style.display = "none";
outputText.innerText = "Error occurred.";
  }

  summarizeBtn.disabled = false;

});
const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", function () {

  const text = outputText.innerText;

  if (!text) {
    alert("No summary to copy.");
    return;
  }

  navigator.clipboard.writeText(text);

  copyBtn.innerText = "Copied ✅";

  setTimeout(() => {
    copyBtn.innerText = "Copy Summary";
  }, 1500);

});
