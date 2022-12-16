async function loadRules() {
  return chrome.storage.sync.get("ruleSet");
}

function saveRules(ruleSet) {
  chrome.storage.sync.set({ ruleSet });
}

function exportRules(ruleSet) {

}
