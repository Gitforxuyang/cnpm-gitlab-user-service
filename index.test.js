const service = require('./index');
(async () => {
    const userService = new service.UserService('https://gitlab.neoclub.cn', 'akE1dLS5EuB-KDcwGdym', {
        login: 'admin',
        password: 'admin@123456',
        email: 'admin@neoclub.com',
        site_admin: true
    })
    // console.log(userService)
    const auth = await userService.auth('admin', 'admin@123456')
    console.log(auth)
    // console.log(await userService.get('xuyang'))
    // console.log(await userService.get('admin'))
})()