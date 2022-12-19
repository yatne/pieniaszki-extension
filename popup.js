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
