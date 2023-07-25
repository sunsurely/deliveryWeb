const { User, Address } = require('../models/');

exports.renderJoin = (req, res) => {
  res.render('join', { title: '회원 가입' });
};

exports.renderCategoryStore = (req, res) => {
  res.render('category_store', { title: '식당들' });
};

exports.renderLoading = (req, res) => {
  res.render('loading', { title: '로딩페이지' });
};

exports.renderOrderComplete = (req, res) => {
  res.render('orderComplete', { title: '주문완료' });
};

exports.renderOrderpage = (req, res) => {
  res.render('order', { title: '주문확인' });
};

exports.renderRegistor = (req, res) => {
  res.render('store_create');
}

exports.renderAdminpage = (req,res)=>{
  res.render('adminpage')
}

exports.renderCreateMenuPage = (req,res)=>{
  res.render('menu_create')
}

exports.renderSignIn = (req, res) => {
  res.render('signin', { title: '로그인' });
};

exports.renderProfile = (req, res) => {
  res.render('profile', { title: '프로필' });
};

exports.renderSelectedMenu = (req, res) => {
  res.render('select_menu');
};

exports.renderReview = (req, res) => {
  res.render('review', { title: '리뷰' });
};

