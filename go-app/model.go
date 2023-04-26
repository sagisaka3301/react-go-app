package main

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"

	_ "github.com/go-sql-driver/mysql"
)

type Post struct {
	Id     int    `json:"id"`
	Title  string `json:"title"`
	Body   string `json:"body"`
	Author string `json:"author"`
}

var Db *sql.DB

func init() {
	var err error

	err = godotenv.Load(".env")
	if err != nil {
		panic("Error loading .env file")
	}

	// dsn := "root:root@tcp(127.0.0.1:3306)/react-go-app?charset=utf8mb4&parseTime=True&loc=Local"
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	dbname := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", user, password, host, port, dbname)

	Db, err = sql.Open("mysql", dsn)

	/* nilはGo言語ならではの値で、ポインタやインターフェース、
	   ライス、マップ、チャネルなどのデータ型のゼロ値を表すために使用される。 */
	if err != nil {
		panic(err)
	}

	// データベースに接続できているか確認する
	err = Db.Ping()
	if err != nil {
		panic(err.Error())
	}

	fmt.Println("Successfully connected to database")

}

func getPosts(limit int) (posts []Post, err error) {
	stmt := "SELECT id, title, body, author FROM posts LIMIT ?"
	rows, err := Db.Query(stmt, limit)
	if err != nil {
		return
	}

	for rows.Next() {
		post := Post{}
		err = rows.Scan(&post.Id, &post.Title, &post.Body, &post.Author)
		if err != nil {
			return
		}
		posts = append(posts, post)
	}
	rows.Close()
	return
}

// retrieve get a specified post.
func retrieve(id int) (post Post, err error) {
	post = Post{}
	stmt := "SELECT id, title, body, author FROM posts WHERE id = ?"
	err = Db.QueryRow(stmt, id).Scan(&post.Id, &post.Title, &post.Body, &post.Author)
	return
}

// create a new post.
/*
func (post *Post) create() (err error) {
	stmt := "INSERT INTO posts (title, body, author) values ($1, $2, $3) RETURNING id"
	err = Db.QueryRow(stmt, post.Title, post.Body, post.Author).Scan(&post.Id)
	return
}*/

func (post *Post) create() (err error) {
	stmt := "INSERT INTO posts (title, body, author) values (?, ?, ?)"
	res, err := Db.Exec(stmt, post.Title, post.Body, post.Author)
	if err != nil {
		return err
	}
	lastInsertId, err := res.LastInsertId()
	if err != nil {
		return err
	}
	post.Id = int(lastInsertId)
	return nil
}

// update a specified post.
func (post *Post) update() (err error) {
	stmt := "UPDATE posts set title = ?, body = ?, author = ? WHERE id = ?"
	_, err = Db.Exec(stmt, post.Title, post.Body, post.Author, post.Id)
	return
}

// delete a specified post.
func (post *Post) delete() (err error) {
	stmt := "DELETE FROM posts WHERE id = ?"
	_, err = Db.Exec(stmt, post.Id)
	return
}
