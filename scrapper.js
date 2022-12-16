function transformMData(mData) {
  return loadRules().then((res) => {
    const {ruleSet} = res;
    const transformed = mData.map(m => {
      const parsedData = {
        date: changeDateFormat(m.date),
        value: prepareValue(m.value),
        category: findCategory(m, ruleSet),
        description: findDescription(m, ruleSet),
      }
      if (parsedData.category !== "IGNORE")
        return parsedData
    })
    let csv = '';
    transformed.filter((el) => el != null).reverse().forEach(v => {
      csv += `${v.date},${v.value},${v.category},${v.description};`;
    });
    return csv;
  });
}


function findCategory(m, ruleSet) {
  const ruleFound = ruleSet.find(rule => (checkName(m.desc, rule) && checkValue(m.value, rule)))
  return ruleFound ? ruleFound.category : ''
}

function findDescription(m, ruleSet) {
  const ruleFound = ruleSet.find(rule => (checkName(m.desc, rule) && checkValue(m.value, rule)))
  return ruleFound ? ruleFound.description : ''
}

function checkName(description, rule) {
  if (!rule.name.condition || rule.name.condition === 'null') {
    return true;
  }
  if (rule.name.condition === 'contains') {
    return description.includes(rule.name.value);
  }
  if (rule.name.condition === 'equals') {
    return description === rule.name.value;
  }
}

function checkValue(value, rule) {
  if (!rule.value.condition || rule.value.condition === 'null') {
    return true;
  }
  if (rule.value.condition === 'greater') {
    return parseFloat(value) > parseFloat(rule.value.value);
  }
  if (rule.value.condition === 'equals') {
    return parseFloat(value) === parseFloat(rule.value.value);
  }
  if (rule.value.condition === 'less') {
    return parseFloat(value) < parseFloat(rule.value.value);
  }
}

function changeDateFormat(date) {
  const parts = date.split('.');
  return `${parts[0]}-${parts[1]}-${parts[2]}`;
}

function prepareValue(val) {
  return parseFloat(val.replaceAll('-','')
    .replaceAll(' ','')
    .replaceAll(' ','')
    .replaceAll(',','.')
    .replace('PLN','')
    .replaceAll(' ',''));
}