package main

import (
	"groupie-tracker/handlers"
	"log"
	"net/http"
)


func main() {
	go handlers.SyncData("https://groupietrackers.herokuapp.com/api/artists", &handlers.Artists)
	go handlers.SyncData("https://groupietrackers.herokuapp.com/api/relation", handlers.Relation)
  handlers.Json_modifier()
	http.HandleFunc("/", handlers.IndexHandler)
	http.HandleFunc("/artists", handlers.ArtistIndexHandler)
	http.HandleFunc("/search-bar", handlers.SearchIndexHandler)

	fs := http.FileServer(http.Dir("css"))
	http.Handle("/css/", http.StripPrefix("/css/", fs))

	rd := http.FileServer(http.Dir("JS"))
	http.Handle("/JS/", http.StripPrefix("/JS/", rd))

	tr := http.FileServer(http.Dir("data"))
	http.Handle("/data/", http.StripPrefix("/data/", tr))

	var port = ":8888"
	//log.Fatal(http.ListenAndServe(":"+port, nil))
	log.Println("🖥  Server launched at the adress localhost:8888")
	http.ListenAndServe(port, nil)
}

