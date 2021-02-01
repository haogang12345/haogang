let server = require("express")();
let mysql = require("mysql")
let port = 8080;
let sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gucci',
    timezone: "08:00",
    port: 3306
})
sql.connect();

server.all("*", function(req, res, next) {
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin", "*");
        //允许的header类型
        res.header("Access-Control-Allow-Headers", "content-type");
        //跨域允许的请求方式 
        res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
        if (req.method.toLowerCase() == 'options')
            res.send(200); //让options尝试请求快速结束
        else
            next();
    })
    // ================列表================================
server.get("/getlist", (request, response) => {
        sql.query(`SELECT id,img,name,money,liulan FROM list`, (error, data) => {
            if (error) {
                console.log(error)
                response.end("error")
                return
            }
            response.end(JSON.stringify(data))
        })
    })
    // ==============================详情=======================
server.get("/getdetails", (request, response) => {
    let id = request.query.id;
    sql.query(`SELECT * FROM details join list on details.id=list.id WHERE list.id=${id}`, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
            return;
        } else {
            response.end(JSON.stringify(data[0]))
        }
    })
})


// server.get("/shoppingcart", (request, response) => {
//     sql.query(`SELECT * FROM list`, (error, data) => {
//         if (error) {
//             console.log(error)
//             response.end("error")
//             return
//         }
//         response.end(JSON.stringify(data))
//     })
// })

// ==================注册======================
server.get(`/reg`, (request, response) => {
    let username = request.query.username;
    let password = request.query.password;

    sql.query(`SELECT * FROM user WHERE username="${username}"`, (error, data) => {
        if (error) {
            console.log(error)
            response.end("error")
            return
        }
        if (data.length === 0) {
            sql.query(`INSERT INTO user (username,password) VALUES ("${username}","${password}")`, (error, result) => {
                if (error) {
                    console.log(error);
                    response.end("error");
                    return
                }
                response.end("success")
            })
        } else {
            response.end("exist")
        }
    })
})

// ===========================登录=============================
server.get("/login", function(request, response) {
    let username = request.query.username;
    let password = request.query.password;
    //执行sql任务
    sql.query(`SELECT * FROM user WHERE username="${username}"`, function(error, data) {
        if (error) {
            console.log(error)
            response.end("error")
            return;
        }
        if (data.length === 0) {
            sql.query(`INSERT INTO user (username,password) VALUES ("${username}",${password}")`, function(error, data) {
                if (error) {
                    console.log(error);
                    response.end("error");
                    return;
                }
                response.end("success");
            })
        } else {
            response.end("exist")
        }
    })
})

server.listen(port)
console.log(`server is running at ${port}`)