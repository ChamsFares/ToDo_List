// Storage.js
const Storage = (() => {
  function saveData(data) {
    localStorage.setItem('todoAppData', JSON.stringify(data));
  }

  function loadData() {
    const data = localStorage.getItem('todoAppData');
    return data ? JSON.parse(data) : null;
  }

  return { saveData, loadData };
})();

export default Storage;