const Storage = {
  setData(data) {
    localStorage.setItem('todoData', JSON.stringify(data));
  },
  
  getData() {
    const data = localStorage.getItem('todoData');
    return data ? JSON.parse(data) : null;
  }
};

export default Storage;