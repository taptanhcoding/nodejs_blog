# Xây dựng mô hình MVC node js

# 1 trong src tạo folder routes
# 2 trong src tạo app/controllers

# 3  định nghĩa ra func controller: 
    ví dụ : class NewController {

    // [GET] /news    
    index(req,res) {
        res.render('news');
    }

    //[GET] /news/:detail
    detail(req,res) {
        res.send('news detail')
    }
}

module.exports = new NewController


 => nói đwon giản là tạo ra một contructor function(function tạo mảng) , kiểu trả ra 1 mảng {trong này là func}

# định nghĩa ra tuyến đường :

const newsRoute = require('./news')
const siteRoute = require('./site')


function route(app) {
    app.use('/news', newsRoute) => khi trình duyệt có địa chỉ local/news thì nó trỏ vào newsRoute được định nghĩa trong file news.js
    app.use('/',siteRoute);

}

module.exports = route

trog news.js : 
const express = require('express')
const router = express.Router() => gọi hàm router trong express

const newsController = require('../app/controllers/NewController')

router.use('/:detail', newsController.detail)
router.use('/', newsController.index) => /news thì trả về hàm được trả về trong object newsController


module.exports = router


=> trong index gọi router và truyền vào app = require('express')() là ok


# 4 Install MongoDB; tải về rồi cài đặt application là xong


# 5 Prettier - Code formatter ; cài thư viện tại môi trường dev : npm i prettier lint-staged husky --save-dev
   
cấu hình thêm trong script : "beautiful" : "prettier --single-quote --trailing-comma all --tab-width 4 --write src/**/*.{js,scss,json}",,
=> npm run beautiful

+ cấu hình thư viện lint-staged: chỉnh lại cho đẹp tất cả các file đã add vào git
sửa trong script : "beautiful" : "lint-staged"
tại cấp 1 của package.json thêm : "lint-staged" : {
      "src/**/*.{js,scss,json}": "prettier --single-quote --trailing-comma all --tab-width 4 --write"
    }
+ cấu hình thư viện husky : tự động hóa việc format
 "husky" : {
    "hooks" : {
      "pre-commit" : "lint-staged"
    }
  },
  => tại cấp 1 của package.json