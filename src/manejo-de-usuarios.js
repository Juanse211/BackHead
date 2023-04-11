const fs = require('fs')
const path = './User.json'
const { createHash } = require('crypto')

class UserManager {
  constructor(path) {
    this.path = path
  }
  async addUser(name, lastName, user, password) {
    const passwordHashed = this.#hashPassword(password)
    const userUser = { name, lastName, user, password: passwordHashed }
    const existsUser = await this.consultUser(user)
    if (!existsUser) {
      const userAlreadyLoaded = await this.consultUsers()
      const newUser = [...userAlreadyLoaded, userUser]
      const dataStr = JSON.stringify(newUser)
      console.log("path: ", dataStr)
      await fs.promises.writeFile(this.path, dataStr)
    } else {
      console.log("User already loaded")
    }
  }

  async consultUser(user) {
    const allUsers = await this.consultUsers()
    const userLoaded = allUsers.find((ubd) => ubd.user === user)
    return userLoaded
  }

  async consultUsers() {
    try {
      const users = await fs.promises.readFile(this.path)
      return JSON.parse(users)
    } catch (err) {
      console.error(err)
      return []
    }
  }

  async validateUser(user, password) {
    const userDb = await this.consultUser(user)
    if (userDb) {
      const passwordHashed2 = this.#hashPassword(password)
      if (passwordHashed2 === userDb.password) {
        return "Logged in"
      }
    }
    throw new Error("User or password not exist")
  }

  #hashPassword(password) {
    return createHash('sha256').update(password).digest('hex')
  }
}

async function main() {
  const manager = new UserManager('./User.json')
  await manager.addUser("Juan", "Torres", "jTorres", "password123")
  console.log(await manager.validateUser("jTorres", "password123"))
}
main()