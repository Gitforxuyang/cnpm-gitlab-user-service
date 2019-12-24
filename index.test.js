const service = require('./index');
(async () => {
    const userService = new service.UserService('https://gitlab.neoclub.cn', '123213213', {
        login: 'admin12123',
        password: '123456',
        email: 'admin@qq.com',
        site_admin: true
    })
    // console.log(userService)
    const auth = await userService.auth('admin', '12321321')
    console.log(auth)
    // console.log(await userService.get('xuyang'))
    // console.log(await userService.get('admin'))
})()