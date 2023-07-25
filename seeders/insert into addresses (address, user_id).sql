insert into users (`account`, `nickname`, `phone`, `password`, `point`, `status`)
values ('bbb@gmail.com', 'bbb', '010-1111-1111', '1234', 1000000, 'normal');

insert into categories (name) values ('전체');
insert into categories (name) values ('치킨');
insert into categories (name) values ('버거');
insert into categories (name) values ('한식');
insert into categories (name) values ('족발');
insert into categories (name) values ('고기');
insert into categories (name) values ('분식');
insert into categories (name) values ('샐러드');
insert into categories (name) values ('일식');
insert into categories (name) values ('죽');
insert into categories (name) values ('중국집');

insert stores (`user_id`, `name`, `call`, `category_id`, `address`, `content`, `img_url`)
values (1, "버거킹", "010-1234-5678",  1, "서울", "맛있는 버거집", "가게 이미지경로");

insert menus (name, price, store_id, img_url, `desc`)
values ("통새우와퍼", 6500,  1, "가게 이미지경로", "큰 새우가 가득!");
insert menus (name, price, store_id, img_url, `desc`)
values ("기네스와퍼", 7500,  1, "가게 이미지경로", "큰 새우가 가득!");
insert menus (name, price, store_id, img_url, `desc`)
values ("주니어와퍼", 8500,  1, "가게 이미지경로", "큰 새우가 가득!");
insert menus (name, price, store_id, img_url, `desc`)
values ("스태커와퍼", 9500,  1, "가게 이미지경로", "큰 새우가 가득!");


insert into addresses (address, user_id) values ("주소", 1);