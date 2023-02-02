
const netConfig = {
    baseUrl: process.env.CORE_BASE_URL ? process.env.CORE_BASE_URL : 'http://localhost:8080',
    okStatus: 200,
    unauthorizedStatus: 401,
    getMethod: "GET",
    postMethod: "POST",
    putMethod: "PUT",
    deleteMethod: "DELETE",
    app: {
        // appName: 'سامانه مدیریتی',
        // appLogoImage: require('@src/assets/images/logo/logo.png').default
    }
}

export default netConfig