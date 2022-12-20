async function loadRules() {
  return chrome.storage.sync.get("ruleSet");
}

function saveRules(ruleSet) {
  chrome.storage.sync.set({ ruleSet });
}

async function loadCategories() {
  return chrome.storage.sync.get("categories");
}

function saveCategories(categories) {
  chrome.storage.sync.set({ categories });
}

async function loadScrapperLiClass() {
  return chrome.storage.sync.get("classname");
}

function saveScrapperLiClass(classname) {
  chrome.storage.sync.set({ classname });
}
