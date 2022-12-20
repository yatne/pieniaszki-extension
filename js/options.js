document.getElementsByClassName("addCategory")[0].addEventListener("submit", async (e) => {
  e.preventDefault();

  loadCategories().then((res) => {
    console.log(res)
    const categories = res.categories ? res.categories : [];
    const maxId = Math.max(...categories.map(category => category?.id), 0);
    categories.push({
      id: maxId + 1,
      category: e.target['categoryInput'].value,
    })
    saveCategories(categories);
    populateTableWithCategories();
  })
})

async function populateTableWithCategories() {
  loadCategories().then((res) => {
    const table = document.getElementById("categoriesTable");
    const tBody = table.children[0];
    tBody.innerHTML = '';

    res.categories.forEach((category, index) => {
      const row = table.insertRow(index);

      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);

      cell1.innerHTML = category.category || "";
      cell1.style.width = '80%';

      let btn = document.createElement("button");
      btn.innerHTML = "x";
      btn.classList.add('removeRuleButton')
      btn.onclick = function () {
        deleteCategory(category.id);
      };
      cell2.appendChild(btn);
    });

    const categoriesList = document.getElementById('category');
    categoriesList.innerHTML = '';
    const nullOption = document.createElement("option");
    nullOption.value = 'null';
    nullOption.innerHTML = '';
    const ignoreOption = document.createElement("option");
    nullOption.value = 'IGNORE';
    nullOption.innerHTML = 'IGNORE';
    categoriesList.appendChild(nullOption);
    res.categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.category;
      option.innerHTML = category.category;
      categoriesList.appendChild(option);
    })
    categoriesList.appendChild(ignoreOption)
  });
}

async function deleteCategory(categoryId) {
  loadCategories().then((res) => {
    const filtered = res.categories.filter(category => category.id !== categoryId);
    saveCategories(filtered);
    populateTableWithCategories();
  })
}

populateTableWithCategories();
