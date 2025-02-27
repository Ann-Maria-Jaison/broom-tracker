const API_URL = "https://broom-tracker-backend.onrender.com"; // Replace with your Render URL

async function getStatus() {
    const response = await fetch(`${API_URL}/status`);
    const data = await response.json();

    document.getElementById("status").innerText = data.broomHolder 
        ? `Broom is with ${data.broomHolder}` 
        : "Broom is available";
}

async function takeBroom() {
    const name = document.getElementById("nameInput").value;
    if (!name) return alert("Enter your name first!");

    await fetch(`${API_URL}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ broomHolder: name }),
    });

    getStatus();
}

async function returnBroom() {
    await fetch(`${API_URL}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ broomHolder: null }),
    });

    getStatus();
}

// Load status on page load
getStatus();
