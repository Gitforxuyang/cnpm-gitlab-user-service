const request = require('request');
class UserService {
    //必传gitlab api地址和私有token
    constructor(api, privateToken, admin) {
        this.api = api
        this.privateToken = privateToken
        this.userMap = new Map()
        this.userMap.set(admin.login, admin)
    }
    //验证用户名密码
    authUser(username, password) {
        return new Promise((resolve, reject) => {
            request({
                url: `${this.api}/oauth/token`,
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                    "PRIVATE-TOKEN": this.privateToken,
                },
                body: {
                    grant_type: 'password',
                    username,
                    password,
                }
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(1)
                } else {
                    reject(1)
                }
            });
        })
    }
    //获得用户邮箱
    getUserEmail(username) {
        return new Promise((resolve, reject) => {
            request({
                url: `${this.api}/api/v4/users?username=${username}`,
                method: "get",
                json: true,
                headers: {
                    "content-type": "application/json",
                    "PRIVATE-TOKEN": this.privateToken,
                },
                body: {
                }
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (body.length > 0) {
                        resolve(body[0])
                    } else {
                        reject(1)
                    }
                } else {
                    reject(1)
                }
            });
        })
    }
    async auth(login, password) {
        try {
            const admin = this.userMap.get('admin')
            if (login == admin.login && password == admin.password) {
                return admin
            }
            await this.authUser(login, password)
            const info = await this.getUserEmail(login)
            if (info.state != 'active') {
                return {}
            }
            const user = {
                login,
                password,
                email: info.email,
                site_admin: false,
            }
            this.userMap.set(login, user)
            return user
        } catch (e) {
            return {
            }
        }
    }

    async get(login) {
        const user = this.userMap.get(login)
        return user
    }

    async list(logins) {
        const l = []
        const users = [...this.userMap.values()]
        users.forEach(user => {
            if (logins.indexOf(user.login) >= 0) {
                l.push(user)
            }
        })
        return l
    }

    async search(query, options) {
        const users = [...this.userMap.values()]
        return users
    }
}
exports.UserService = UserService