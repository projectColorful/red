-- 사용자
create table users(
user_no serial not null,
user_id varchar(20) not null,
user_pw varchar(100) not null,
user_name varchar(20) not null,
state integer not null DEFAULT 1,
reg_dt timestamp not null DEFAULT now(),
CONSTRAINT users_pkey PRIMARY KEY (user_no)
);
COMMENT ON COLUMN public.users.state IS '0 탈퇴 1 정상 2 계정잠금';

--메모
create table note(
note_no serial not null,
note_data jsonb null DEFAULT '{"note_index": null, "note_text":{ "deadline":null,"content":null }}'::jsonb,
state integer not null DEFAULT 1, 
reg_dt timestamp not null DEFAULT now(),
user_no serial ,
CONSTRAINT note_pkey PRIMARY KEY (note_no),
CONSTRAINT users_user_no_fkey FOREIGN KEY (user_no) references public.users(user_no) ON DELETE CASCADE ON UPDATE CASCADE
);
COMMENT ON COLUMN public.note.state IS '0 삭제 1 정상';
COMMENT ON COLUMN public.note.reg_dt IS '생성시간';-- 사용자
create table users(
user_no serial not null,
user_id varchar(20) not null,
user_pw varchar(100) not null,
user_name varchar(20) not null,
state integer not null DEFAULT 1,
reg_dt timestamp not null DEFAULT now(),
CONSTRAINT users_pkey PRIMARY KEY (user_no)
);
COMMENT ON COLUMN public.users.state IS '0 탈퇴 1 정상 2 계정잠금';

--메모
create table note(
note_no serial not null,
note_data jsonb null DEFAULT '{"note_index": null, "note_text":{ "deadline":null,"content":null }}'::jsonb,
state integer not null DEFAULT 1, 
reg_dt timestamp not null DEFAULT now(),
user_no serial ,
CONSTRAINT note_pkey PRIMARY KEY (note_no),
CONSTRAINT users_user_no_fkey FOREIGN KEY (user_no) references public.users(user_no) ON DELETE CASCADE ON UPDATE CASCADE
);
COMMENT ON COLUMN public.note.state IS '0 삭제 1 정상';
COMMENT ON COLUMN public.note.reg_dt IS '생성시간';