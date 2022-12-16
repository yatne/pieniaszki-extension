document.getElementById("generateCSVButton").addEventListener("click", async () => {
  scrapMData().then(mData => {
    transformMData(mData).then(csv =>
      navigator.clipboard.writeText(csv).then(() => alert(`Data copied do clipboard.`))
    );
  })
})

document.getElementById("newRuleForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  loadRules().then((res) => {
    const {ruleSet} = res;
    const maxId = Math.max(...ruleSet.map(rule => rule.id), 0);
    ruleSet.push({
      id: maxId + 1,
      name: {
        condition: e.target['name-condition'].value,
        value: e.target['name-value'].value,
      },
      value: {
        condition: e.target['value-condition'].value,
        value: e.target['value-value'].value,
      },
      category: e.target['category'].value,
      description: e.target['description'].value,
    })
    saveRules(ruleSet);
    populateTableWithRules();
  })
})

document.getElementById("rulesExport").addEventListener('click', async function () {
  var link = document.createElement('a');
  link.setAttribute('download', 'info.txt');
  const rules = await loadRules();
  link.href = makeTextFile(JSON.stringify(rules.ruleSet));
  document.body.appendChild(link);

  // wait for the link to be added to the document
  window.requestAnimationFrame(function () {
    var event = new MouseEvent('click');
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });

}, false);

const openDialog = () => {
  document.getElementById("hiddenFileInput").click();
}
document.getElementById("rulesImport").addEventListener('click', openDialog);

document.getElementById("hiddenFileInput").addEventListener('change', (e) => {
  var fr=new FileReader();
  fr.onload=function(){
    saveRules(JSON.parse(fr.result));
    populateTableWithRules();
  }

  fr.readAsText(e.target.files[0]);
})
let textFile = null;
const makeTextFile = (text) => {
  var data = new Blob([text], {type: 'text/plain'});
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }
  textFile = window.URL.createObjectURL(data);
  return textFile;
};

async function populateTableWithRules() {
  loadRules().then((res) => {
    const table = document.getElementById("rulesTable");
    const head = table.children[0].children[0];
    const tBody = table.children[0];
    tBody.innerHTML = '';
    tBody.appendChild(head);

    res.ruleSet.forEach((rule, index) => {
      const row = table.insertRow(index + 1);

      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);
      const cell7 = row.insertCell(6);

      cell1.innerHTML = rule.name.condition || "";
      cell2.innerHTML = rule.name.value || "";
      cell3.innerHTML = rule.value.condition || "";
      cell4.innerHTML = rule.value.value || "";
      cell5.innerHTML = rule.category || "";
      cell6.innerHTML = rule.description || "";

      let btn = document.createElement("button");
      btn.innerHTML = "x";
      btn.onclick = function () {
        deleteRule(rule.id);
      };
      cell7.appendChild(btn);
    })
  });
}

async function deleteRule(ruleId) {
  loadRules().then((res) => {
    const filtered = res.ruleSet.filter(rule => rule.id !== ruleId);
    saveRules(filtered);
    populateTableWithRules();
  })
}

populateTableWithRules();
