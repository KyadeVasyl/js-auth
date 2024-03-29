class Confirm {

  static #list = []

  constructor(data) {
    this.code = Confirm.generateCode();
    this.data = data;
  }


  static generateCode = () => {
    const random = Math.floor(1000 + (Math.random() * 9000));
    return random
  }

  static create = (data) => {
    this.#list.push(new Confirm(data))
    setTimeout(() => {
      this.delete(code)
    }, 24 * 60 * 60 * 1000)
    console.log(this.#list)
  }


  static delete = (code) => {
    const length = this.#list;
    this.#list.filter((item) => item.code !== code)
    return length > this.#list.length;
  }


  static getData = (code) => {
    const obj = this.#list.find((item) => item.code === code,);
    return obj ? obj.data : null
  }
}


module.exports = {
  Confirm,
}
