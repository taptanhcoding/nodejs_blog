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

router.get('/:detail', newsController.detail)
router.get('/', newsController.index) => /news thì trả về hàm được trả về trong object newsController


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


# # # Model [MVC]

# tạo db monggo

# 1 install mongoose : mongoose github => quản lý mô hình hóa cái bảng để tránh trường hợp 1 object trả về mà nhiều loại key
ví dụ {
    data: [
        {
        id : 1,
        name: 'chuyen'
        },
        {
            curId: 2,
            list: none
        }
    ]
}
=> nói đwon giản là đồng nhất

cài đặt : npm install mongoose

# 2 đồng bộ mongodb:
1. trong src tạo : config/db/index.js :

const mongoose = require('mongoose');

async function connect() {
    try {

        await mongoose.connect('mongodb://localhost:27017/f8_eduction_dev'); (có 1 tùy chọn ,{
                                                                                                userNewUrlParser: true,
                                                                                                useUnifiedTopology: true
                                                                                            }, thêm sau ủl mà thêm vào nó ko cho kết noois nhưng cứ để đây)
        console.log('connect successfully');
    }
    catch (error) {
        console.log('connect failure');

    }
}

module.exports = {connect}

ra index gọi :

const db = require('./config/db')

//Connect db

db.connect()

# 3 tạo model : trong app tạo models/Course.js:

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
<!-- const ObjectId = Schema.ObjectId; --> => cái này để đẻ ra id tự động

const Course = new Schema({
  name: { type: String, maxLenght: 255 },
  description: { type: String, maxLenght: 600 },
  iamge : {type: String},
  createAt : { type: Date, default: Date.now},
  updateAt : { type: Date, default: Date.now},
});
=> khai báo cấu trúc của bảng gồm những key gì và nhận về dữ liệu kiểu gì

module.exports = mongoose.model('Course', Course); => export thế này để mongoose nó đọc và convert nó sang , suy ra table chúng 
tạo ra trên database có tên courses

=> tạo xong model để chọc vào database
# dùng model chọc vào db :
 trong siteController.js
    1. import Course vào : const Course = require('../models/Course')
    2. giả sử tại home muốn nó tương tác db(lấy dữ liệu về) :  
    index(req, res) {
        Course.find({}, function (err, courses) { ///=> find({} => lấy tất,callback => hàm xử lý dwux liệu trả về)
            if(!err) {
                res.json(courses)
            }
            else {
                res.status(400).json({error: 'Error'})
            }
          });
        // res.render('home');
    }
npm start thì trang chủ sẽ trả về dữ liệu như api

# cấu hình lại resource path từ app.set('views', path.join(__dirname, 'resource/views')); => app.set('views', path.join(__dirname, 'resource','views')); mục đích là tại các hđh khác nhau thì cái phân cách / này sẽ khác nhau nên để thế cho nó tự thêm

# CRUD - Read from DB: 
lấy db dạng promise : 
    1 tại SiteController.js : 
        const Course = require('../models/Course')

        class SiteController {
            // [GET] /
            index(req, res,next) {
                Course.find({})
                .then(courses =>  res.render('home',{đối số thứ 2 là cái mà nó sẽ gửi vào page home-object})) => lấy db dạng promise
                .catch(next)
            ;
            }

            //[GET] /search
            search(req, res) {
                res.render('search');
            }
        }

        module.exports = new SiteController();


nhận db tại home page : {{person.firstname}} {{person.lastname}} => nếu đối số gửi vào dạng {person : {
    firstname: 'a',
    lastname: 'b'
}} 
thì tại home page nó in ra a b (tạo home: <p>{{person.firstname}} {{person.lastname}}</p>)

trường hợp dữ liệu nhận là mảng thì duyệt mảng qua cú pháp: 
<ul class="people_list">
  {{#each people}} => people là mảng
    <li>{{this}}</li> => this là từng con của mảng people
  {{/each}}
</ul>

=> và nó lỗi tè le do từ handlebars 4.7.6 không hỗ trợ truyền mảng kiểu qua định nghĩa tại course.js nữa
=> cách fix: c1 cài lại handlebars thấp:=> lỗi bảo mật hơi toang
             c2 sửa lại cách nhận dữ liệu : courses = courses.map(course => course.toObject()) => toObject là một hàm của 
             mongoose chuyển từ object tạo từ contructor function thành mobject thường
                rồi res.render('home',{
            courses
            }) như bình thường

để tránh chỗ nào cũng phải xử lý như cách 2 thì ta tạo một cái function ở ngoài để khi nào cần import vào là xong
1 trong src tạo util/mongoose.js:
        module.exports = {
            multipleMongooseToObject :(mongooseArray) => mongooseArray.map(mongoose => mongoose.toObject()),
            MongooseToObject: (mongoose) => mongoose ? mongoose.toObject() : mongoose
        }
2 trong Controller thì import vào rồi ở object gửi đi {tên mảng : multipleMongooseToObject(dữ liệu mảng mà mongoose trả về)}
# Course detail page : lấy params từ url => req.params => trả về 1 object dùng findOne({key:value},callback) dạng promise để trả về 1 cái : find, findOne luôn trả về mảng nên thay vì ta array.toObject() => không thể thì ta lấy object trong array  rồi toObject()

# CRUD - Create a course : tạo router như mọi khi:(để thêm sửa xóa vào phần models của mongoosejs)
    1. xử lý submit của form : action='course/store'
    2. trong CourseController tạo thêm store cấu hình :
        store(req, res,next) {
        const formData = req.body
        formData.image= `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
        const course = new Course(formData) =>tạo thêm course trong db
        course.save() => có hai phương thức là call back và promise
            .then(() => res.redirect('../')) => chuyển trang khi save thành công
            .catch(error => { 
                
            })
    }

    3. xử lý lại Course: thêm thư viện , tùy chỉnh date data:
        + thêm thư viện: npm install mongoose-slug-generator => chuyển 1 property thành slug
        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;
        const slug = require('mongoose-slug-generator') => sử dụng
        mongoose.plugin(slug)

        // const ObjectId = Schema.ObjectId;

        const Course = new Schema({
        name: { type: String,required:true},
        description: { type: String},
        image : {type: String},
        slug: { type: String, slug: "name",unique: true }, => chuyển name thành slug nhưng không cho trùng bằng thuộc tính unique
        videoId : {type: String,required:true},
        level: {type: String}
        },{timestamps:true});=> khi thêm course tạo thêm ngày thêm và ngày cập nhật

        module.exports = mongoose.model('Course', Course);
 