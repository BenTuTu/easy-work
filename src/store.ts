class Store {
  info = {
    name: "btt",
    age: 25,
  };

  name = "qianxuan";

  constructor() {
    this.getName = this.getName.bind(this);
  }

  getName() {
    return this.info;
  }
}

const store = new Store();
export default store;
export const s1 = 123;
