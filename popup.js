document.getElementById("generateCSVButton").addEventListener("click", async () => {
  scrapMData().then(mData => {
    transformMData(mData).then(csv =>
      navigator.clipboard.writeText(csv).then(() => alert(`Data copied do clipboard.`))
    );
  })
})

document.getElementById("rulesToggleButton").addEventListener("click", () => {
  toggleRules();
})

document.getElementById("optionsToggleButton").addEventListener("click", () => {
  toggleOptions();
})

const toggleRules = () => {
  const rulesDiv = document.getElementsByClassName("rulesContent")[0];
  const toggleButton = document.getElementById("rulesToggleButton");
  if (toggleButton.textContent === 'Open') {
    rulesDiv.classList.remove('hidden');
    toggleButton.textContent = "Close"
  } else {
    rulesDiv.classList.add('hidden');
    toggleButton.textContent = "Open"
  }
}

const toggleOptions = () => {
  const optionsDiv = document.getElementsByClassName("optionsContent")[0];
  const toggleButton = document.getElementById("optionsToggleButton");
  if (toggleButton.textContent === 'Open') {
    optionsDiv.classList.remove('hidden');
    toggleButton.textContent = "Close"
  } else {
    optionsDiv.classList.add('hidden');
    toggleButton.textContent = "Open"
  }
}
