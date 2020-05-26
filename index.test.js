const service = require('./index');
(async () => {
    const userService = new service.UserService('https://gitlab.com', '123123', {
        login: 'admin',
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