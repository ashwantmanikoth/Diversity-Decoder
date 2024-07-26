package main

import (
    "database/sql"
    "log"

    _ "github.com/mattn/go-sqlite3"
)

func main() {
    db, err := sql.Open("sqlite3", "./flagged_words.db")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    sqlStmt := `
  
    INSERT INTO words (word) VALUES
('Aggressive'),
('Ninja'),
('Rockstar'),
('Guru'),
('Dominant'),
('Manpower'),
('He'),
('She'),
('Young'),
('Energetic'),
('Digital Native'),
('Recent Graduate'),
('Cultural Fit'),
('Strong English Skills Required'),
('Work Hard'),
('Play Hard'),
('Competitive'),
('Must Be Able to Lift X Pounds'),
('Linear Career Path'),
('Hack'),
('Superhero'),
('Fast-paced'),
('Ambitious'),
('Fluent English'),
('Expert'),
('Overachiever'),
('Bro'),
('Guys'),
('Hustle'),
('Decisive'),
('Macho'),
('Outspoken'),
('Tireless'),
('Unstoppable'),
('Passionate'),
('Driven'),
('World-class'),
('Top-tier'),
('High-caliber'),
('Hard-hitting'),
('Thick-skinned'),
('Thrive under pressure'),
('Detail-oriented'),
('Leadership qualities'),
('Superior'),
('Superior track record'),
('Commanding presence'),
('Visionary'),
('Market leader');

    `
    _, err = db.Exec(sqlStmt)
    if err != nil {
        log.Fatalf("%q: %s\n", err, sqlStmt)
    }
}
