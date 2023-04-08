

const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'yash.dcpd@gmail.com',
            pass: 'fvsfwxubojxztjnw'
        }
    },
    google_client_id: "405811649293-ei4hpa9e44tenfrfmqml1320khkofjcp.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
}


const production = {
    name : 'production'
}


module.exports = development;