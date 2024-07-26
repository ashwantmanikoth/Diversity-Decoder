package main

import (
	"database/sql"
	"net/http"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

type Submission struct {
	Text string `json:"text"`
}

type Result struct {
	Sentence    string   `json:"sentence"`
	FlaggedWords []string `json:"flagged_words"`
}

func main() {
	r := gin.Default()

	// Enable CORS
	r.Use(cors.Default())

	r.POST("/check", func(c *gin.Context) {
		var submission Submission
		if err := c.ShouldBindJSON(&submission); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		results, err := checkFlaggedWords(submission.Text)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"results": results})
	})

	r.Run(":8080")
}

func checkFlaggedWords(text string) ([]Result, error) {
	db, err := sql.Open("sqlite3", "./flagged_words.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("SELECT word FROM words")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var flaggedWords []string
	for rows.Next() {
		var word string
		err = rows.Scan(&word)
		if err != nil {
			return nil, err
		}
		flaggedWords = append(flaggedWords, word)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	sentences := strings.Split(text, ".")
	var results []Result
	for _, sentence := range sentences {
		var foundWords []string
		for _, word := range flaggedWords {
			if strings.Contains(sentence, word) {
				foundWords = append(foundWords, word)
			}
		}
		if len(foundWords) > 0 {
			results = append(results, Result{Sentence: sentence, FlaggedWords: foundWords})
		}
	}

	return results, nil
}
